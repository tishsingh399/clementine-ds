// WCAG 2.1 contrast audit for the Clementine token system.
//
// Contrast is a property of token *pairs*, not individual nodes — so we resolve
// every semantic token to hex (light + dark) and check the foreground-on-
// background pairs the components actually use. Fixing a failing pair at the
// token tier propagates to every component that binds it.
//
//   node scripts/contrast-audit.mjs            # report all pairs, both modes
//   node scripts/contrast-audit.mjs --fail     # only failures (exit 1 if any)
//
// Thresholds (WCAG 2.1 AA):
//   normal text  ≥ 4.5:1
//   large text   ≥ 3.0:1   (≥18.66px bold or ≥24px)
//   UI / graphic ≥ 3.0:1   (borders, focus rings, icons — 1.4.11)

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..', 'packages', 'tokens', 'src');
const prims = JSON.parse(readFileSync(join(SRC, 'primitives.json'), 'utf8'));
const semL = JSON.parse(readFileSync(join(SRC, 'semantic-light.json'), 'utf8'));
const semD = JSON.parse(readFileSync(join(SRC, 'semantic-dark.json'), 'utf8'));

function primHex(path) {
  const parts = path.replace(/^\{|\}$/g, '').split('.');
  let n = prims;
  for (const p of parts) n = n?.[p];
  return n?.$value ?? null;
}
function resolve(sem, dotted) {
  const parts = dotted.split('.');
  let n = sem;
  for (const p of parts) n = n?.[p];
  if (!n || !('$value' in n)) return null;
  const v = n.$value;
  if (typeof v === 'string' && v.startsWith('{')) return primHex(v);
  return v;
}

// sRGB relative luminance + contrast ratio
function lum(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return null;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16) / 255);
  const f = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function ratio(fg, bg) {
  // flatten rgba overlays onto a neutral so they still compute
  const fix = (h) => (h && h.startsWith('rgba') ? '#000000' : h);
  const L1 = lum(fix(fg)), L2 = lum(fix(bg));
  if (L1 == null || L2 == null) return null;
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}

// The pairs the system actually renders live in packages/tokens/contrast-pairs.json,
// shared with the Observatory brand remix. kind: 'text' (4.5), 'large' (3.0), 'ui' (3.0).
// `exempt` pairs are reported but excluded from the must-pass gate, with the reason.
const contrast = JSON.parse(readFileSync(join(SRC, '..', 'contrast-pairs.json'), 'utf8'));
const PAIRS = contrast.pairs.map(({ fg, bg, kind }) => [fg, bg, kind]);
const THRESH = contrast.thresholds;
const EXEMPT = contrast.exempt;

function run(sem, label) {
  const rows = [];
  for (const [fg, bg, kind] of PAIRS) {
    const fh = resolve(sem, fg), bh = resolve(sem, bg);
    const r = ratio(fh, bh);
    const need = THRESH[kind];
    const exempt = EXEMPT[`${fg}|${bg}`];
    const pass = r != null && r >= need;
    rows.push({ mode: label, fg, bg, kind, fh, bh, ratio: r, need, pass, exempt: !pass && exempt ? exempt : null });
  }
  return rows;
}

const all = [...run(semL, 'light'), ...run(semD, 'dark')];
const failOnly = process.argv.includes('--fail');
const shown = failOnly ? all.filter((r) => !r.pass) : all;

for (const r of shown) {
  const tag = r.pass ? 'PASS' : r.exempt ? 'EXEMPT' : 'FAIL';
  const ratioS = r.ratio == null ? ' n/a ' : r.ratio.toFixed(2).padStart(5);
  const why = r.exempt ? `  ← ${r.exempt}` : '';
  console.log(`${tag.padEnd(6)} ${r.mode.padEnd(5)} ${ratioS}:1 (need ${r.need}) ${r.kind.padEnd(5)} ${r.fg} (${r.fh}) on ${r.bg} (${r.bh})${why}`);
}
const realFails = all.filter((r) => !r.pass && !r.exempt);
const exempts = all.filter((r) => !r.pass && r.exempt);
console.log(`\n${all.filter((r) => r.pass).length}/${all.length} pass · ${exempts.length} exempt (documented) · ${realFails.length} real failures`);
if (realFails.length) process.exit(1);
