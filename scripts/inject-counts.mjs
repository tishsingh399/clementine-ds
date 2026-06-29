#!/usr/bin/env node
/**
 * inject-counts.mjs  (F9 + F10)
 *
 * Single source of truth for the counts quoted in the docs. Computes them from
 * the filesystem and writes them into `<!-- COUNTS:key -->N<!-- /COUNTS -->`
 * markers so README / HANDOFF / AI-READY can never drift apart again.
 *
 *   node scripts/inject-counts.mjs           # rewrite markers in place
 *   node scripts/inject-counts.mjs --check    # CI: exit 1 if any marker is stale
 *
 * Keys: components, primitives, semantic, component-tokens
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');

const countLeaves = (o) => {
  let n = 0;
  for (const v of Object.values(o)) {
    if (v && typeof v === 'object') n += '$value' in v ? 1 : countLeaves(v);
  }
  return n;
};
const readJson = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

function findSpecs(dir) {
  let n = 0;
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) n += findSpecs(full);
    else if (e === 'index.md') n++;
  }
  return n;
}

const counts = {
  components: String(findSpecs(join(root, 'specs'))),
  primitives: String(countLeaves(readJson('packages/tokens/src/primitives.json'))),
  semantic: String(countLeaves(readJson('packages/tokens/src/semantic-light.json'))),
  'component-tokens': String(countLeaves(readJson('packages/tokens/src/components.generated.json'))),
};

const docs = ['README.md', 'HANDOFF.md', 'AI-READY-ARCHITECTURE.md'];
let stale = 0;
let rewritten = 0;

for (const doc of docs) {
  const file = join(root, doc);
  const src = readFileSync(file, 'utf8');
  const out = src.replace(
    /<!-- COUNTS:([\w-]+) -->(.*?)<!-- \/COUNTS -->/gs,
    (whole, key, current) => {
      const value = counts[key];
      if (value === undefined) {
        console.warn(`⚠︎ ${doc}: unknown COUNTS key "${key}"`);
        return whole;
      }
      if (current !== value) {
        stale++;
        if (check) console.error(`✗ ${doc}: COUNTS:${key} is "${current}", expected "${value}"`);
      }
      return `<!-- COUNTS:${key} -->${value}<!-- /COUNTS -->`;
    },
  );
  if (!check && out !== src) {
    writeFileSync(file, out);
    rewritten++;
  }
}

console.log('counts:', counts);
if (check) {
  if (stale) {
    console.error(`\n✗ ${stale} stale count marker(s). Run \`pnpm counts\` to fix.`);
    process.exit(1);
  }
  console.log('✔︎ all count markers current');
} else {
  console.log(`✔︎ injected counts into ${rewritten} doc(s)`);
}
