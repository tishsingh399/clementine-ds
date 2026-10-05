import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import plugin from '../src/index.js';
import { findRawStyleValues } from '../src/style-values.js';
import {
  createComponentTokenIndex,
  findComponentTokenViolations,
} from '../src/token-inventory.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '../../..');
const index = createComponentTokenIndex({ root });

assert.equal(plugin.meta.name, '@clementine-ds/eslint-plugin');
assert.ok(plugin.rules['no-raw-style-values']);
assert.ok(plugin.rules['no-unknown-component-token']);

assert.deepEqual(findRawStyleValues('color: "#fff"; transition: "200ms";'), ['#fff', '200ms']);
assert.deepEqual(findRawStyleValues('color: "var(--cds-button-bg-default)"; // #fff'), []);

assert.ok(index.paths.has('button.bg.default'));
assert.ok(index.cssVariables.has('--cds-button-bg-default'));
// The index must hold every component token in the source files. Counted from
// the source rather than hard-coded, so adding a token doesn't break the build.
const countLeaves = (node) =>
  Object.values(node).reduce(
    (n, v) => n + (v && typeof v === 'object' ? ('$value' in v ? 1 : countLeaves(v)) : 0),
    0,
  );
const componentsDir = join(root, 'packages/tokens/src/components');
const sourceCount = readdirSync(componentsDir)
  .filter((f) => f.endsWith('.json'))
  .reduce((n, f) => n + countLeaves(JSON.parse(readFileSync(join(componentsDir, f), 'utf8'))), 0);
assert.ok(sourceCount > 600, `expected the full component token set, counted ${sourceCount}`);
assert.equal(index.paths.size, sourceCount);

assert.deepEqual(findComponentTokenViolations('"button.bg.default"', index), []);
assert.deepEqual(findComponentTokenViolations('"surface.default"', index), []);
assert.deepEqual(findComponentTokenViolations('"button.bg.never"', index), [
  { kind: 'token-path', value: 'button.bg.never', namespace: 'button' },
]);
assert.deepEqual(findComponentTokenViolations('var(--cds-button-bg-never)', index), [
  { kind: 'css-var', value: '--cds-button-bg-never', namespace: 'button' },
]);

console.log('✔︎ Clementine ESLint plugin checks passed');
