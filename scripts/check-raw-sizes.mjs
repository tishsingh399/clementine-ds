#!/usr/bin/env node
/**
 * check-raw-sizes.mjs
 *
 * The honesty check's no_invented_styles looks for raw hex and raw timings
 * in inline styles, not raw sizes, so `borderRadius: 4` passed every gate
 * even though radius.sm is 4px. An outside linter (CalibrateDS dna) found 22
 * of these in October 2026; they were moved onto tokens, and this check stops
 * new ones arriving.
 *
 * Scans style objects in packages/ui/src (inline or built in a const) for numeric sizes
 * (borderRadius, fontSize, padding*, margin*, gap) written as a number or a
 * px string. 0 and 1px hairlines are allowed. Everything else must come
 * through a token variable (var(--mantine-radius-sm), var(--cds-…)).
 *
 * Ratchet, like governance/parity-dom-state-allowlist.json: the raw sizes that
 * existed when this check landed are recorded in governance/raw-size-baseline.json.
 * A value not in the baseline, or more uses of one than recorded, fails. When
 * a baselined value is fixed the check says so; run with --update to shrink
 * the baseline. --update never grows it.
 *
 * Usage: node scripts/check-raw-sizes.mjs [--update]
 *        node scripts/check-raw-sizes.mjs --init   (once: records today's state; refuses if a baseline exists)
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'packages/ui/src');
const baselineFile = join(root, 'governance/raw-size-baseline.json');
const update = process.argv.includes('--update');
const init = process.argv.includes('--init');

const PROPS = /\b(borderRadius|fontSize|padding(?:Inline|Block|Top|Right|Bottom|Left)?|margin(?:Inline|Block|Top|Right|Bottom|Left)?|gap|rowGap|columnGap)\s*:\s*('[^']*'|"[^"]*"|-?\d+(?:\.\d+)?)/g;

function* files(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) {
      if (entry !== '__tests__') yield* files(p);
    } else if (p.endsWith('.tsx') && !/\.(test|stories)\./.test(entry)) yield p;
  }
}

// Raw sizes in one value: bare numbers, or px lengths inside a string.
// 0 and 1px are allowed (resets and hairlines).
function rawSizes(value) {
  if (/^-?\d/.test(value)) return Number(value) === 0 ? [] : [`${value}`];
  const inner = value.slice(1, -1).replace(/var\([^)]*\)/g, ' ');
  return [...inner.matchAll(/-?\d+(?:\.\d+)?px/g)].map((m) => m[0]).filter((v) => !/^-?[01]px$/.test(v) && !/^-?0(\.0+)?px$/.test(v));
}

const found = new Map(); // "file|prop|value" -> { count, lines }
for (const file of files(srcDir)) {
  const rel = relative(root, file);
  const src = readFileSync(file, 'utf8');
  // Every object literal in the file, not only inline style={{…}}: components
  // also build style objects in a const first (Mention, CitationChip).
  const code = src.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' ')).replace(/\/\/[^\n]*/g, (c) => ' '.repeat(c.length));
  for (const m of code.matchAll(PROPS)) {
    for (const v of rawSizes(m[2])) {
      const key = `${rel}|${m[1]}|${v}`;
      const line = code.slice(0, m.index).split('\n').length;
      const e = found.get(key) ?? { count: 0, lines: [] };
      e.count++;
      e.lines.push(line);
      found.set(key, e);
    }
  }
}

if (init) {
  if (existsSync(baselineFile)) {
    console.error('✗ a baseline already exists; --init only records the first one. Use --update to shrink it.');
    process.exit(1);
  }
  const entries = [...found]
    .map(([key, e]) => { const [file, prop, value] = key.split('|'); return { file, prop, value, count: e.count }; })
    .sort((a, b) => (a.file + a.prop + a.value).localeCompare(b.file + b.prop + b.value));
  writeFileSync(baselineFile, JSON.stringify({
    note: 'Raw sizes in component inline styles that predate check-raw-sizes.mjs. Known debt, not approval: fix them onto tokens and run --update to shrink this list. It never grows.',
    createdAt: new Date().toISOString().slice(0, 10),
    entries,
  }, null, 2) + '\n');
  console.log(`raw-size baseline recorded: ${entries.length} entries, ${entries.reduce((n, e) => n + e.count, 0)} uses`);
  process.exit(0);
}

const baseline = existsSync(baselineFile) ? JSON.parse(readFileSync(baselineFile, 'utf8')) : { entries: [] };
const allowed = new Map(baseline.entries.map((e) => [`${e.file}|${e.prop}|${e.value}`, e.count]));

const failures = [];
for (const [key, e] of found) {
  const limit = allowed.get(key) ?? 0;
  if (e.count > limit) {
    const [file, prop, value] = key.split('|');
    failures.push(`${file}:${e.lines.join(',')}  ${prop}: ${value} — use a token (var(--mantine-radius-*), var(--mantine-spacing-*), var(--mantine-font-size-*))`);
  }
}
const shrinkable = [...allowed].filter(([key, n]) => (found.get(key)?.count ?? 0) < n).length;

if (update) {
  // Only ever shrink: keep the lower of the recorded and current counts.
  const entries = [...allowed]
    .map(([key, n]) => {
      const [file, prop, value] = key.split('|');
      return { file, prop, value, count: Math.min(n, found.get(key)?.count ?? 0) };
    })
    .filter((e) => e.count > 0)
    .sort((a, b) => (a.file + a.prop + a.value).localeCompare(b.file + b.prop + b.value));
  writeFileSync(baselineFile, JSON.stringify({ ...baseline, entries }, null, 2) + '\n');
  console.log(`raw-size baseline updated: ${entries.length} entries (${shrinkable} shrunk or removed)`);
}

const total = [...found.values()].reduce((n, e) => n + e.count, 0);
if (failures.length) {
  console.error(`✗ raw-sizes: ${failures.length} raw size(s) not in the baseline\n`);
  for (const f of failures) console.error('  ' + f);
  process.exit(1);
}
console.log(`✔︎ raw-sizes: no new raw sizes (${total} known, baselined in governance/raw-size-baseline.json)`);
if (shrinkable && !update) console.log(`  ℹ ${shrinkable} baseline entr${shrinkable === 1 ? 'y has' : 'ies have'} been fixed — run with --update to shrink the baseline`);
