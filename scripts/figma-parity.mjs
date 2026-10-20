#!/usr/bin/env node
/**
 * figma-parity.mjs  (F17)
 *
 * Turns the "Figma is 1:1 with code" claim from an assertion into a generated
 * diff. The component-tier token files are the source of truth; this script
 * derives the Figma variables they imply, with their resolved light AND dark
 * values, then (optionally) diffs them against Figma.
 *
 *   node scripts/figma-parity.mjs                    # dry run: write the expected set
 *   FIGMA_ACCESS_TOKEN=… FIGMA_FILE_KEY=… \
 *   node scripts/figma-parity.mjs --remote            # diff the live file (REST)
 *   node scripts/figma-parity.mjs --from vars.json    # diff an export instead
 *   node scripts/figma-parity.mjs --selftest          # prove the diff catches drift
 *
 * --from takes the same shape as Figma's GET /v1/files/:key/variables/local
 * response ({ meta: { variables, variableCollections } }). That endpoint needs
 * a Figma Enterprise seat; on other plans, export the variables with a plugin
 * into that shape and pass the file.
 *
 * Until October 2026 the diff compared NAMES only, so a variable whose value
 * changed in Figma (same name, new colour) passed. It now resolves every alias
 * in Figma to its final value and compares it, per mode, with the value the
 * repo resolves to. A wrong value, a missing variable or a missing mode fails;
 * variables Figma has and code does not are reported, not failed (Figma can
 * run ahead of implementation; see the review's CL-5).
 *
 * Without --remote / --from it stays a dry run: no network, safe in CI.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

const COLLECTION = 'Clementine · Components';
const MODES = ['light', 'dark'];

// ── expected: every component token, resolved per mode ─────────────────────
export function deriveExpected({ primitives, semantic, components }) {
  const lookup = (tree, path) => path.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), tree);
  const resolve = (value, sem, depth = 0) => {
    const m = /^\{(.+)\}$/.exec(value);
    if (!m || depth > 20) return value;
    const node = lookup(sem, m[1]) ?? lookup(primitives, m[1]);
    return node && typeof node.$value === 'string' ? resolve(node.$value, {}, depth + 1) : value;
  };
  const expected = [];
  const walk = (tree, path = []) => {
    for (const [k, v] of Object.entries(tree)) {
      if (v && typeof v === 'object' && '$value' in v) {
        expected.push({
          collection: 'Component',
          name: [...path, k].join('/'),
          type: v.$type,
          value: Object.fromEntries(MODES.map((mode) => [mode, resolve(v.$value, semantic[mode])])),
        });
      } else if (v && typeof v === 'object') walk(v, [...path, k]);
    }
  };
  walk(components);
  return expected;
}

// ── normalising both sides to one comparable string ────────────────────────
const hex2 = (n) => Math.round(Math.max(0, Math.min(1, n)) * 255).toString(16).padStart(2, '0');
export function normalizeCode(v) {
  const s = String(v).trim().toLowerCase();
  let m = /^#([0-9a-f]{3})$/.exec(s);
  if (m) return '#' + m[1].split('').map((c) => c + c).join('');
  if (/^#[0-9a-f]{6}$/.test(s)) return s;
  if (/^#[0-9a-f]{8}$/.test(s)) return s.endsWith('ff') ? s.slice(0, 7) : s;
  m = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/.exec(s);
  if (m) {
    const [r, g, b] = m.slice(1, 4).map((x) => Math.round(+x).toString(16).padStart(2, '0'));
    const a = m[4] === undefined ? 1 : +m[4];
    return '#' + r + g + b + (a >= 1 ? '' : hex2(a));
  }
  m = /^(-?[\d.]+)px$/.exec(s);
  if (m) return String(+m[1]);
  if (/^-?[\d.]+$/.test(s)) return String(+s);
  return s;
}
export function normalizeFigma(v) {
  if (v && typeof v === 'object' && 'r' in v) {
    const a = v.a ?? 1;
    return '#' + hex2(v.r) + hex2(v.g) + hex2(v.b) + (a >= 0.999 ? '' : hex2(a));
  }
  if (typeof v === 'number') return String(Math.round(v * 1000) / 1000);
  return String(v).trim().toLowerCase();
}

// ── the diff ───────────────────────────────────────────────────────────────
export function diff(expected, live) {
  const variables = live.meta?.variables ?? {};
  const collections = Object.values(live.meta?.variableCollections ?? {});
  const collection = collections.find((c) => c.name === COLLECTION);
  if (!collection) return { error: `Figma has no "${COLLECTION}" variable collection` };
  const modeId = Object.fromEntries(
    MODES.map((mode) => [mode, collection.modes?.find((m) => m.name.toLowerCase() === mode)?.modeId]),
  );

  // Follow aliases across collections to a final value. A referenced
  // collection may name its modes the same way (Light/Dark) or have one mode.
  const byId = new Map(Object.entries(variables).map(([id, v]) => [v.id ?? id, v]));
  const modeName = new Map(collections.flatMap((c) => (c.modes ?? []).map((m) => [m.modeId, m.name.toLowerCase()])));
  const collOf = new Map(collections.map((c) => [c.id, c]));
  const finalValue = (variable, mode, depth = 0) => {
    const coll = collOf.get(variable.variableCollectionId);
    const mId = coll?.modes?.find((m) => m.name.toLowerCase() === mode)?.modeId ?? coll?.defaultModeId ?? Object.keys(variable.valuesByMode ?? {})[0];
    const raw = variable.valuesByMode?.[mId];
    if (raw && raw.type === 'VARIABLE_ALIAS') {
      const target = byId.get(raw.id);
      return target && depth < 20 ? finalValue(target, mode, depth + 1) : { unresolved: raw.id };
    }
    return raw;
  };

  const liveComponents = Object.values(variables).filter((v) => v.variableCollectionId === collection.id);
  const liveByName = new Map(liveComponents.map((v) => [v.name, v]));
  const expectedNames = new Set(expected.map((e) => e.name));

  const missing = [];
  const mismatched = [];
  const missingModes = MODES.filter((m) => !modeId[m]);
  for (const e of expected) {
    const v = liveByName.get(e.name);
    if (!v) { missing.push(e.name); continue; }
    for (const mode of MODES) {
      if (!modeId[mode]) continue;
      const got = finalValue(v, mode);
      if (got && got.unresolved) { mismatched.push({ name: e.name, mode, want: normalizeCode(e.value[mode]), got: `alias to missing variable ${got.unresolved}` }); continue; }
      const want = normalizeCode(e.value[mode]);
      const have = normalizeFigma(got);
      if (want !== have) mismatched.push({ name: e.name, mode, want, got: have });
    }
  }
  const extra = [...liveByName.keys()].filter((n) => !expectedNames.has(n));
  return { missing, mismatched, extra, missingModes, live: liveByName.size, unusedModeNames: [...modeName.values()] };
}

function report(expected, result) {
  if (result.error) { console.error(`✗ ${result.error}.`); return 1; }
  const { missing, mismatched, extra, missingModes } = result;
  console.log(`\nFigma parity: ${expected.length} expected · ${result.live} live in ${COLLECTION}`);
  console.log(`  missing in Figma (code has, Figma lacks): ${missing.length}`);
  console.log(`  value differs    (same name, other value): ${mismatched.length}`);
  console.log(`  extra in Figma   (Figma has, code lacks): ${extra.length}  — reported, not failed`);
  if (missingModes.length) console.log(`  ✗ the collection has no ${missingModes.join(' / ')} mode`);
  for (const n of missing.slice(0, 20)) console.log(`    + ${n}`);
  for (const m of mismatched.slice(0, 30)) console.log(`    ≠ ${m.name} [${m.mode}]  code ${m.want} · Figma ${m.got}`);
  for (const n of extra.slice(0, 20)) console.log(`    - ${n}`);
  return missing.length || mismatched.length || missingModes.length ? 1 : 0;
}

// ── self-test: synthetic Figma data with planted drift ─────────────────────
function selftest() {
  const primitives = { color: { blue: { 6: { $value: '#2563eb' } }, gray: { 9: { $value: '#1a1a18' } }, white: { $value: '#ffffff' } } };
  const semantic = {
    light: { action: { primary: { $value: '{color.blue.6}' } }, text: { primary: { $value: '{color.gray.9}' } } },
    dark: { action: { primary: { $value: '#60a5fa' } }, text: { primary: { $value: '{color.white}' } } },
  };
  const components = { btn: {
    bg: { $value: '{action.primary}', $type: 'color' },
    fg: { $value: '{text.primary}', $type: 'color' },
    radius: { $value: '6px', $type: 'dimension' },
    gone: { $value: '{text.primary}', $type: 'color' },
  } };
  const expected = deriveExpected({ primitives, semantic, components });
  const rgb = (h) => ({ r: parseInt(h.slice(1, 3), 16) / 255, g: parseInt(h.slice(3, 5), 16) / 255, b: parseInt(h.slice(5, 7), 16) / 255, a: 1 });
  const live = (overrides = {}) => {
    const v = {
      'S:blue': { id: 'S:blue', name: 'action/primary', variableCollectionId: 'sem', valuesByMode: { sL: rgb('#2563eb'), sD: rgb('#60a5fa') } },
      'S:text': { id: 'S:text', name: 'text/primary', variableCollectionId: 'sem', valuesByMode: { sL: rgb('#1a1a18'), sD: rgb('#ffffff') } },
      'C:bg': { id: 'C:bg', name: 'btn/bg', variableCollectionId: 'cmp', valuesByMode: { cL: { type: 'VARIABLE_ALIAS', id: 'S:blue' }, cD: { type: 'VARIABLE_ALIAS', id: 'S:blue' } } },
      'C:fg': { id: 'C:fg', name: 'btn/fg', variableCollectionId: 'cmp', valuesByMode: { cL: { type: 'VARIABLE_ALIAS', id: 'S:text' }, cD: { type: 'VARIABLE_ALIAS', id: 'S:text' } } },
      'C:radius': { id: 'C:radius', name: 'btn/radius', variableCollectionId: 'cmp', valuesByMode: { cL: 6, cD: 6 } },
      'C:gone': { id: 'C:gone', name: 'btn/gone', variableCollectionId: 'cmp', valuesByMode: { cL: { type: 'VARIABLE_ALIAS', id: 'S:text' }, cD: { type: 'VARIABLE_ALIAS', id: 'S:text' } } },
      ...overrides,
    };
    for (const k of Object.keys(v)) if (v[k] === null) delete v[k];
    return { meta: { variables: v, variableCollections: {
      sem: { id: 'sem', name: 'Clementine · Semantic', modes: [{ modeId: 'sL', name: 'Light' }, { modeId: 'sD', name: 'Dark' }] },
      cmp: { id: 'cmp', name: COLLECTION, modes: [{ modeId: 'cL', name: 'Light' }, { modeId: 'cD', name: 'Dark' }] },
    } } };
  };
  const C = live();
  const cases = [
    ['identical, through aliases', live(), (r) => !r.missing.length && !r.mismatched.length && !r.extra.length],
    ['same name, value changed (the old blind spot)', live({ 'C:radius': { ...C.meta.variables['C:radius'], valuesByMode: { cL: 8, cD: 8 } } }), (r) => r.mismatched.length === 2],
    ['alias pointing at the wrong token', live({ 'C:fg': { ...C.meta.variables['C:fg'], valuesByMode: { cL: { type: 'VARIABLE_ALIAS', id: 'S:blue' }, cD: { type: 'VARIABLE_ALIAS', id: 'S:text' } } } }), (r) => r.mismatched.length === 1 && r.mismatched[0].mode === 'light'],
    ['dark mode only drifted', live({ 'S:blue': { ...C.meta.variables['S:blue'], valuesByMode: { sL: rgb('#2563eb'), sD: rgb('#3b82f6') } } }), (r) => r.mismatched.length === 1 && r.mismatched[0].mode === 'dark'],
    ['variable missing in Figma', live({ 'C:gone': null }), (r) => r.missing.length === 1],
    ['extra in Figma is reported, not a mismatch', live({ 'C:new': { id: 'C:new', name: 'btn/new', variableCollectionId: 'cmp', valuesByMode: { cL: 1, cD: 1 } } }), (r) => r.extra.length === 1 && !r.mismatched.length && !r.missing.length],
    ['alias to a deleted variable', live({ 'S:text': null }), (r) => r.mismatched.some((m) => /missing variable/.test(m.got))],
  ];
  let ok = 0;
  console.log('\n=== figma-parity --selftest ===\n');
  for (const [label, data, pass] of cases) {
    const r = diff(expected, data);
    const good = !r.error && pass(r);
    if (good) ok++;
    console.log(`  ${good ? '✓' : '✗'} ${label}`);
  }
  console.log(`\n  ${ok === cases.length ? 'GATE PASS' : 'GATE FAIL'} — ${ok}/${cases.length}\n`);
  process.exit(ok === cases.length ? 0 : 1);
}

// ── main ───────────────────────────────────────────────────────────────────
if (args.includes('--selftest')) selftest();

const expected = deriveExpected({
  primitives: read('packages/tokens/src/primitives.json'),
  semantic: { light: read('packages/tokens/src/semantic-light.json'), dark: read('packages/tokens/src/semantic-dark.json') },
  components: read('packages/tokens/src/components.generated.json'),
});
writeFileSync(
  join(root, 'apps/observatory/figma-expected-variables.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), expectedCount: expected.length, modes: MODES, expected }, null, 2) + '\n',
);
console.log(`✔︎ derived ${expected.length} expected Figma component variables (light + dark) → apps/observatory/figma-expected-variables.json`);

const from = opt('--from');
let live;
if (from) {
  live = JSON.parse(readFileSync(from, 'utf8'));
} else if (args.includes('--remote')) {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  const fileKey = process.env.FIGMA_FILE_KEY;
  if (!token || !fileKey) {
    console.error('✗ --remote requires FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY in the environment.');
    process.exit(1);
  }
  const res = await fetch(`https://api.figma.com/v1/files/${fileKey}/variables/local`, { headers: { 'X-Figma-Token': token } });
  if (!res.ok) {
    console.error(`✗ Figma API ${res.status}: ${await res.text()}`);
    if (res.status === 403) console.error('  The variables endpoint needs a Figma Enterprise seat. Export the variables and use --from <file> instead.');
    process.exit(1);
  }
  live = await res.json();
} else {
  console.log('dry run: pass --remote (with FIGMA_ACCESS_TOKEN + FIGMA_FILE_KEY) or --from <export.json> to diff against Figma.');
  process.exit(0);
}
process.exit(report(expected, diff(expected, live)));
