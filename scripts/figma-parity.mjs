#!/usr/bin/env node
/**
 * figma-parity.mjs  (F17)
 *
 * Turns the "Figma is 1:1 with code" claim from an assertion into a generated
 * diff. The component-tier token files are the source of truth; this script
 * derives the exact set of Figma variables they imply, then (optionally) diffs
 * against the live Figma file.
 *
 *   node scripts/figma-parity.mjs                 # dry-run: print expected variables
 *   FIGMA_ACCESS_TOKEN=… FIGMA_FILE_KEY=… \
 *   node scripts/figma-parity.mjs --remote         # diff against the live file
 *
 * Without a token it stays a dry run — no network, safe in CI as a smoke check.
 * The README's "1:1 with code" claim should link to this script's output.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

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

const res = await fetch(`https://api.figma.com/v1/files/${fileKey}/variables/local`, {
  headers: { 'X-Figma-Token': token },
});
if (!res.ok) {
  console.error(`✗ Figma API ${res.status}: ${await res.text()}`);
  process.exit(1);
}
const live = await res.json();
const liveVariables = Object.values(live.meta?.variables ?? {});
const liveCollections = Object.values(live.meta?.variableCollections ?? {});
const componentCollection = liveCollections.find((collection) => collection.name === 'Clementine · Components');
if (!componentCollection) {
  console.error('✗ Figma file does not contain a "Clementine · Components" variable collection.');
  process.exit(1);
}

const liveComponentVariables = liveVariables.filter(
  (variable) => variable.variableCollectionId === componentCollection.id,
);
const liveNames = new Set(liveComponentVariables.map((v) => v.name));
const expectedNames = new Set(expected.map((e) => e.name));

const missingInFigma = [...expectedNames].filter((n) => !liveNames.has(n));
const extraInFigma = [...liveNames].filter((n) => !expectedNames.has(n));

console.log(`\nFigma parity: ${expectedNames.size} expected · ${liveNames.size} live in Clementine · Components`);
console.log(`  missing in Figma (code has, Figma lacks): ${missingInFigma.length}`);
console.log(`  extra in Figma   (Figma has, code lacks): ${extraInFigma.length}`);
for (const n of missingInFigma.slice(0, 20)) console.log(`    + ${n}`);
for (const n of extraInFigma.slice(0, 20)) console.log(`    - ${n}`);

process.exit(missingInFigma.length ? 1 : 0);
