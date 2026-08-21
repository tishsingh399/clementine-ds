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

const flags = (text) => findComponentTokenViolations(text, index).length > 0;

assert.equal(plugin.meta.name, '@clementine-ds/eslint-plugin');
assert.ok(plugin.rules['no-raw-style-values']);
assert.ok(plugin.rules['no-unknown-component-token']);

assert.deepEqual(findRawStyleValues('color: "#fff"; transition: "200ms";'), ['#fff', '200ms']);
assert.deepEqual(findRawStyleValues('color: "var(--cds-button-bg-default)"; // #fff'), []);

// --- inventory covers all three tiers -------------------------------------
assert.equal(index.componentPaths.size, 628);
assert.equal(index.semanticPaths.size, 41);
assert.equal(index.primitivePaths.size, 89);
assert.equal(index.paths.size, 758);

assert.ok(index.paths.has('button.bg.default'));
assert.ok(index.paths.has('surface.default'));
assert.ok(index.paths.has('color.blue.6'));
assert.ok(index.cssVariables.has('--cds-button-bg-default'));
assert.ok(index.cssVariables.has('--cds-action-primary'));
assert.ok(index.tdsVariables.has('--tds-surface-default'));

// Primitives are JS imports, never CSS variables.
assert.ok(!index.cssVariables.has('--cds-color-blue-6'));

// --- real tokens resolve ---------------------------------------------------
assert.equal(flags('"button.bg.default"'), false);
assert.equal(flags('"surface.default"'), false);
assert.equal(flags('"action.primary"'), false);
assert.equal(flags('"color.blue.6"'), false);
assert.equal(flags('var(--cds-button-bg-hover)'), false);
assert.equal(flags('var(--cds-text-input-bg-default)'), false);
assert.equal(flags('var(--tds-surface-default)'), false);

// --- a miss is a hard stop, in every tier ----------------------------------
// Regression: an invented token outside a component namespace used to pass
// silently, because the lint only checked paths inside the 121 component
// namespaces. "use the primary colour" -> color.primary is the canonical case.
assert.deepEqual(findComponentTokenViolations('"color.primary"', index), [
  { kind: 'token-path', value: 'color.primary', namespace: 'color', tier: 'primitive' },
]);
assert.deepEqual(findComponentTokenViolations('var(--cds-color-primary)', index), [
  { kind: 'css-var', value: '--cds-color-primary', namespace: 'color', tier: 'primitive' },
]);
assert.equal(flags('"surface.primary"'), true);
assert.equal(flags('"button.bg.never"'), true);
assert.equal(flags('var(--cds-button-bg-never)'), true);
assert.equal(flags('var(--tds-surface-nope)'), true);
// Primitives never reach CSS, so referencing one as a variable is dead paint.
assert.equal(flags('var(--cds-color-blue-6)'), true);

// --- dynamic variable names ------------------------------------------------
// `var(--cds-alert-bg-${intent})` reaches the rule as a trailing-dash fragment.
assert.equal(flags('--cds-alert-bg-'), false);
assert.equal(flags('--cds-alert-border-'), false);
assert.equal(flags('--cds-alrt-bg-'), true);
assert.equal(flags('--cds-alert-nope-'), true);

// --- things that merely look like token paths ------------------------------
assert.equal(flags('"motion.json"'), false);
assert.equal(flags('"styles.css"'), false);
assert.equal(flags('"tokens.ts"'), false);
assert.equal(flags('console.log'), false);
assert.equal(flags('props.value'), false);

console.log('✔︎ Clementine ESLint plugin checks passed');
