import assert from 'node:assert/strict';
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
assert.equal(index.paths.size, 628);

assert.deepEqual(findComponentTokenViolations('"button.bg.default"', index), []);
assert.deepEqual(findComponentTokenViolations('"surface.default"', index), []);
assert.deepEqual(findComponentTokenViolations('"button.bg.never"', index), [
  { kind: 'token-path', value: 'button.bg.never', namespace: 'button' },
]);
assert.deepEqual(findComponentTokenViolations('var(--cds-button-bg-never)', index), [
  { kind: 'css-var', value: '--cds-button-bg-never', namespace: 'button' },
]);

console.log('✔︎ Clementine ESLint plugin checks passed');
