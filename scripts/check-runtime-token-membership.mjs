#!/usr/bin/env node
/**
 * check-runtime-token-membership.mjs
 *
 * The reverse of contract resolution. `agentic-spec validate` proves every
 * token a spec DECLARES exists; nothing proved every component token the
 * runtime USES is declared. Button's theme painted `--cds-button-fg-on-subtle`
 * for months while its closed contract omitted `button.fg.on-subtle`, and every
 * check passed.
 *
 * For each `--cds-<name>` referenced in packages/ui/src that is a component-tier
 * token (packages/tokens/src/components/*.json), the owning spec's
 * token_contract must list it. Semantic vars (--cds-text-primary …) are not
 * component tokens and are skipped. Exit 1 on any undeclared use.
 * Wire as `pnpm validate:runtime-tokens`.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const componentsDir = join(root, 'packages/tokens/src/components');
const runtimeDir = join(root, 'packages/ui/src');

// var form (button-fg-on-subtle) → { component, name: 'button.fg.on-subtle' }
const byVar = new Map();
function collect(component, node, path) {
  for (const [key, value] of Object.entries(node)) {
    if (value && typeof value === 'object' && '$value' in value) {
      const name = [...path, key].join('.');
      byVar.set(name.replace(/\./g, '-'), { component, name });
    } else if (value && typeof value === 'object') {
      collect(component, value, [...path, key]);
    }
  }
}
for (const f of readdirSync(componentsDir)) {
  if (!f.endsWith('.json') || f === 'components.generated.json') continue;
  const json = JSON.parse(readFileSync(join(componentsDir, f), 'utf8'));
  for (const [component, tree] of Object.entries(json)) collect(component, tree, [component]);
}

const contracts = new Map();
function contractOf(component) {
  if (contracts.has(component)) return contracts.get(component);
  const spec = join(root, 'specs', component, 'index.md');
  let set = null;
  if (existsSync(spec)) {
    const fm = /^---\n([\s\S]*?)\n---/.exec(readFileSync(spec, 'utf8'));
    const block = fm && /token_contract:\n((?:\s+-\s+.+\n?)+)/.exec(fm[1]);
    set = new Set(block ? [...block[1].matchAll(/-\s+([^\s#]+)/g)].map((m) => m[1]) : []);
  }
  contracts.set(component, set);
  return set;
}

function* files(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) {
      if (entry !== '__tests__' && entry !== 'node_modules') yield* files(p);
    } else if (/\.(ts|tsx|css)$/.test(entry) && !/\.(test|spec|stories)\./.test(entry)) yield p;
  }
}

const violations = [];
const noSpec = new Set();
let checked = 0;
for (const file of files(runtimeDir)) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    for (const m of line.matchAll(/--cds-([a-z0-9-]+)/g)) {
      const hit = byVar.get(m[1]);
      if (!hit) continue; // semantic var, or a template like --cds-button-height-${size}
      checked++;
      const contract = contractOf(hit.component);
      if (!contract) { noSpec.add(hit.component); continue; }
      if (!contract.has(hit.name)) {
        violations.push(`${relative(root, file)}:${i + 1}  uses ${hit.name} — not in specs/${hit.component}/index.md token_contract`);
      }
    }
  });
}

if (noSpec.size) console.log(`  note: no spec for ${[...noSpec].sort().join(', ')} (skipped)`);
if (violations.length) {
  console.error(`✗ runtime-token-membership: ${violations.length} undeclared component token use(s)\n`);
  for (const v of [...new Set(violations)]) console.error('  ' + v);
  process.exit(1);
}
console.log(`✔︎ runtime-token-membership: ${checked} component token uses, all declared in their contracts`);
