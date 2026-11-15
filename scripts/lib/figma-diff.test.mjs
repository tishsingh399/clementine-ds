// node scripts/lib/figma-diff.test.mjs — fixture checks for the Figma parity layer.
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  checkCodeConnect,
  diffVariables,
  figmaColorToHex,
  normalizeExpected,
  parseCodeConnect,
} from './figma-diff.mjs';

// --- value normalisation ----------------------------------------------------
assert.equal(figmaColorToHex({ r: 1, g: 1, b: 1, a: 1 }), '#ffffff');
assert.equal(figmaColorToHex({ r: 0, g: 0, b: 0, a: 0.4 }), '#00000066');
assert.deepEqual(normalizeExpected('#FAFAF8'), { type: 'color', value: '#fafaf8' });
assert.deepEqual(normalizeExpected('#fff'), { type: 'color', value: '#ffffff' });
assert.deepEqual(normalizeExpected('#ffffffff'), { type: 'color', value: '#ffffff' });
assert.deepEqual(normalizeExpected('rgba(0,0,0,0.4)'), { type: 'color', value: '#00000066' });
assert.deepEqual(normalizeExpected('6px'), { type: 'number', value: 6 });
assert.equal(normalizeExpected('0 1px 3px rgba(0,0,0,0.08)'), null);

// --- variables: a Figma file with one of each problem ------------------------
const live = {
  meta: {
    variableCollections: {
      C: { id: 'C', name: 'Clementine · Components', defaultModeId: 'light' },
      P: { id: 'P', name: 'Clementine · Primitives', defaultModeId: 'p' },
    },
    variables: {
      gray0: { id: 'gray0', name: 'gray/0', variableCollectionId: 'P', valuesByMode: { p: { r: 250 / 255, g: 250 / 255, b: 248 / 255, a: 1 } } },
      ok: { id: 'ok', name: 'accordion/bg', variableCollectionId: 'C', valuesByMode: { light: { type: 'VARIABLE_ALIAS', id: 'gray0' }, dark: { r: 0, g: 0, b: 0, a: 1 } } },
      drift: { id: 'drift', name: 'accordion/border', variableCollectionId: 'C', valuesByMode: { light: { r: 1, g: 0, b: 0, a: 1 } } },
      radius: { id: 'radius', name: 'accordion/radius', variableCollectionId: 'C', valuesByMode: { light: 6 } },
      shadow: { id: 'shadow', name: 'card/shadow', variableCollectionId: 'C', valuesByMode: { light: 'x' } },
      stray: { id: 'stray', name: 'accordion/old-bg', variableCollectionId: 'C', valuesByMode: { light: 1 } },
      cycle: { id: 'cycle', name: 'alert/bg', variableCollectionId: 'C', valuesByMode: { light: { type: 'VARIABLE_ALIAS', id: 'cycle' } } },
    },
  },
};
const expected = [
  { name: 'accordion/bg', value: '#fafaf8' },       // alias into primitives, default mode → match
  { name: 'accordion/border', value: '#e5e5e0' },   // Figma has red → mismatch
  { name: 'accordion/radius', value: '6px' },       // match
  { name: 'card/shadow', value: '0 1px 3px rgba(0,0,0,0.08)' }, // skipped
  { name: 'alert/bg', value: '#ffffff' },           // alias cycle → mismatch, not a hang
  { name: 'button/bg/default', value: '#111111' },  // missing
];
const d = diffVariables(expected, live, 'Clementine · Components');
assert.deepEqual(d.missing, ['button/bg/default']);
assert.deepEqual(d.extra, ['accordion/old-bg']);
assert.deepEqual(d.skipped, ['card/shadow']);
assert.deepEqual(d.mismatched.map((m) => m.name), ['accordion/border', 'alert/bg']);
assert.deepEqual(d.mismatched[0], { name: 'accordion/border', expected: '#e5e5e0', figma: '#ff0000' });
assert.equal(diffVariables(expected, live, 'Nope'), null);

// --- Code Connect -------------------------------------------------------------
const src = `figma.connect(Card, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=6-612', {})
figma.connect(Ui.Badge, "https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?t=x&node-id=7-1")`;
const links = parseCodeConnect(src, 'Card.figma.tsx');
assert.deepEqual(links.map((l) => [l.component, l.fileKey, l.nodeId]), [
  ['Card', 'w4JB0MOEIzOtSKx5Y3YSQR', '6:612'],
  ['Ui.Badge', 'w4JB0MOEIzOtSKx5Y3YSQR', '7:1'],
]);
const broken = checkCodeConnect(
  [...links, { component: 'Gone', nodeId: '9:9' }],
  { nodes: { '6:612': { document: { type: 'COMPONENT_SET' } }, '7:1': { document: { type: 'FRAME' } }, '9:9': null } },
);
assert.deepEqual(broken.map((b) => [b.component, b.problem]), [
  ['Ui.Badge', 'node is a FRAME, not a component'],
  ['Gone', 'node not found in Figma'],
]);

// Every real Code Connect file must parse to at least one link, or the check silently skips it.
const uiSrc = join(dirname(fileURLToPath(import.meta.url)), '../../packages/ui/src');
const ccFiles = readdirSync(uiSrc, { recursive: true }).filter((f) => f.endsWith('.figma.tsx'));
const unparsed = ccFiles.filter((f) => parseCodeConnect(readFileSync(join(uiSrc, f), 'utf8'), f).length === 0);
assert.deepEqual(unparsed, [], `Code Connect files with no parsable figma.connect URL: ${unparsed.join(', ')}`);

console.log(`✔︎ figma-diff checks passed (${ccFiles.length} Code Connect files parse)`);
