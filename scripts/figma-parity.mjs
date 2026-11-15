#!/usr/bin/env node
/**
 * figma-parity.mjs  (F17)
 *
 * Turns the "Figma is 1:1 with code" claim from an assertion into a generated
 * diff. The component-tier token files are the source of truth; this script
 * derives the exact set of Figma variables they imply, then (optionally) diffs
 * against the live Figma file: variable names AND resolved values in
 * "Clementine · Components", plus every Code Connect link in packages/ui must
 * point at a live Figma component. Fails on missing, mismatched or broken;
 * extra Figma variables are reported as warnings.
 *
 *   node scripts/figma-parity.mjs                 # dry-run: print expected variables
 *   FIGMA_ACCESS_TOKEN=… FIGMA_FILE_KEY=… \
 *   node scripts/figma-parity.mjs --remote         # diff against the live file
 *
 * Without a token it stays a dry run — no network, safe in CI as a smoke check.
 * The README's "1:1 with code" claim should link to this script's output.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { checkCodeConnect, diffVariables, parseCodeConnect } from './lib/figma-diff.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const remote = process.argv.includes('--remote');

const primitives = JSON.parse(readFileSync(join(root, 'packages/tokens/src/primitives.json'), 'utf8'));
const semantic = JSON.parse(readFileSync(join(root, 'packages/tokens/src/semantic-light.json'), 'utf8'));
const components = JSON.parse(readFileSync(join(root, 'packages/tokens/src/components.generated.json'), 'utf8'));

const lookup = (tree, path) => path.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), tree);
function resolve(value) {
  const m = /^\{(.+)\}$/.exec(value);
  if (!m) return value;
  const node = lookup(semantic, m[1]) ?? lookup(primitives, m[1]);
  return node && typeof node.$value === 'string' ? resolve(node.$value) : value;
}

// Derive the expected Figma variable set (collection · name · resolved value).
const expected = [];
function walk(tree, path = []) {
  for (const [k, v] of Object.entries(tree)) {
    if (v && typeof v === 'object' && '$value' in v) {
      expected.push({ collection: 'Component', name: [...path, k].join('/'), value: resolve(v.$value) });
    } else if (v && typeof v === 'object') walk(v, [...path, k]);
  }
}
walk(components);

const out = { generatedAt: new Date().toISOString(), expectedCount: expected.length, expected };
writeFileSync(join(root, 'apps/observatory/figma-expected-variables.json'), JSON.stringify(out, null, 2) + '\n');
console.log(`✔︎ derived ${expected.length} expected Figma component variables → apps/observatory/figma-expected-variables.json`);

if (!remote) {
  console.log('dry-run (no --remote): set FIGMA_ACCESS_TOKEN + FIGMA_FILE_KEY and pass --remote to diff the live file.');
  process.exit(0);
}

const token = process.env.FIGMA_ACCESS_TOKEN;
const fileKey = process.env.FIGMA_FILE_KEY;
if (!token || !fileKey) {
  console.error('✗ --remote requires FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY in the environment.');
  process.exit(1);
}

const api = async (path) => {
  const res = await fetch(`https://api.figma.com/v1${path}`, { headers: { 'X-Figma-Token': token } });
  if (!res.ok) {
    console.error(`✗ Figma API ${res.status} on ${path}: ${await res.text()}`);
    process.exit(1);
  }
  return res.json();
};

// 1. Variables: names and values in "Clementine · Components".
const vars = diffVariables(expected, await api(`/files/${fileKey}/variables/local`), 'Clementine · Components');
if (!vars) {
  console.error('✗ Figma file does not contain a "Clementine · Components" variable collection.');
  process.exit(1);
}

// 2. Code Connect: every figma.connect() URL must point at a live component.
const ccFiles = readdirSync(join(root, 'packages/ui/src'), { recursive: true })
  .filter((f) => f.endsWith('.figma.tsx'));
const links = ccFiles.flatMap((f) =>
  parseCodeConnect(readFileSync(join(root, 'packages/ui/src', f), 'utf8'), `packages/ui/src/${f}`));
const brokenLinks = [];
for (const key of new Set(links.map((l) => l.fileKey))) {
  const group = links.filter((l) => l.fileKey === key);
  // shortcut: one request per file; chunk the ids if a file passes ~400 links and the URL gets too long.
  const ids = [...new Set(group.map((l) => l.nodeId))].join(',');
  brokenLinks.push(...checkCodeConnect(group, await api(`/files/${key}/nodes?ids=${encodeURIComponent(ids)}&depth=1`)));
}

const report = { checkedAt: new Date().toISOString(), fileKey, variables: vars, codeConnect: { links: links.length, broken: brokenLinks } };
writeFileSync(join(root, 'apps/observatory/figma-parity-report.json'), JSON.stringify(report, null, 2) + '\n');

const list = (items, sign, fmt = (x) => x) => items.slice(0, 20).forEach((x) => console.log(`    ${sign} ${fmt(x)}`));
console.log(`\nFigma parity (${fileKey})`);
console.log(`  variables missing in Figma:    ${vars.missing.length}`); list(vars.missing, '+');
console.log(`  variable values that differ:   ${vars.mismatched.length}`);
list(vars.mismatched, '≠', (m) => `${m.name}: code ${m.expected} · Figma ${m.figma}`);
console.log(`  extra in Figma (warning only): ${vars.extra.length}`); list(vars.extra, '-');
console.log(`  not comparable (shadows etc.): ${vars.skipped.length}`);
console.log(`  Code Connect links broken:     ${brokenLinks.length} of ${links.length}`);
list(brokenLinks, '✗', (b) => `${b.component} (${b.source}) ${b.nodeId}: ${b.problem}`);
console.log('  full report → apps/observatory/figma-parity-report.json');

const failed = vars.missing.length + vars.mismatched.length + brokenLinks.length;
process.exit(failed ? 1 : 0);
