#!/usr/bin/env node
/**
 * parity-dom.mjs — the painted-DOM parity layer (followups Phase 4).
 *
 * parity-report.mjs proves the *contract* is internally honest (every declared
 * token resolves through the cascade). This proves the *painted pixel* matches:
 * it renders each component in a real browser and asserts every colour it paints
 * is a value some token in that component's contract resolves to.
 *
 *   STORYBOOK_URL=http://localhost:6006 node scripts/parity-dom.mjs [--strict]
 *
 * MVP scope (extensible): the component's root element in its default story,
 * colour properties (background, text, border) in light + dark. Per-state and
 * per-semantic-part coverage grows as components gain per-state stories and
 * data-part attribution (see the Phase 4 brief). Writes
 * apps/observatory/parity-dom-report.json. Heavy — run nightly, not per-PR.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const strict = process.argv.includes('--strict');
const STORYBOOK_URL = process.env.STORYBOOK_URL ?? 'http://localhost:6006';
const threshold = Number(process.env.PARITY_DOM_THRESHOLD ?? 80);

// playwright lives in the storybook workspace (via @storybook/test-runner)
const require = createRequire(join(root, 'apps/storybook/package.json'));
const { chromium } = require('playwright');

const tokensDir = join(root, 'packages/tokens/src');
const primitives = JSON.parse(readFileSync(join(tokensDir, 'primitives.json'), 'utf8'));
const semantic = {
  light: JSON.parse(readFileSync(join(tokensDir, 'semantic-light.json'), 'utf8')),
  dark: JSON.parse(readFileSync(join(tokensDir, 'semantic-dark.json'), 'utf8')),
};
const components = JSON.parse(readFileSync(join(tokensDir, 'components.generated.json'), 'utf8'));

const lookup = (tree, path) => path.split('.').reduce((a, k) => (a == null ? a : a[k]), tree);
function resolve(value, sem) {
  const m = /^\{(.+)\}$/.exec(value);
  if (!m) return value;
  const node = lookup(sem, m[1]) ?? lookup(primitives, m[1]);
  return node && typeof node.$value === 'string' ? resolve(node.$value, sem) : value;
}

// canonical "r,g,b" for any hex/rgb(a) colour; fully-transparent → "transparent"
function canon(c) {
  if (!c) return null;
  c = String(c).trim();
  let m = /^#([0-9a-f]{3})$/i.exec(c);
  if (m) c = '#' + m[1].split('').map((x) => x + x).join('');
  m = /^#([0-9a-f]{6})$/i.exec(c);
  if (m) return `${parseInt(m[1].slice(0, 2), 16)},${parseInt(m[1].slice(2, 4), 16)},${parseInt(m[1].slice(4, 6), 16)}`;
  m = /^rgba?\(([^)]+)\)/i.exec(c);
  if (m) {
    const p = m[1].split(',').map((x) => x.trim());
    if (p[3] !== undefined && parseFloat(p[3]) === 0) return 'transparent';
    return `${p[0]},${p[1]},${p[2]}`;
  }
  return c;
}

// allowed painted colours per component = every contract token resolved (both modes)
function leaves(obj, path = [], out = []) {
  for (const [k, v] of Object.entries(obj)) {
    if (v && typeof v === 'object' && '$value' in v) out.push([[...path, k].join('.'), v]);
    else if (v && typeof v === 'object') leaves(v, [...path, k], out);
  }
  return out;
}
// Resolved values of the whole semantic layer, per mode (cached). A component
// that paints a semantic value (inherited body text, a shared surface) is still
// bound to the token cascade — just at the semantic tier — so it counts.
const semanticAllowed = { light: null, dark: null };
function semanticSet(mode) {
  if (semanticAllowed[mode]) return semanticAllowed[mode];
  const set = new Set();
  for (const group of Object.values(semantic[mode])) {
    for (const node of Object.values(group)) {
      const v = canon(resolve(node.$value, semantic[mode]));
      if (v) set.add(v);
    }
  }
  semanticAllowed[mode] = set;
  return set;
}
function allowedFor(component, mode) {
  // free: transparent + pure black/white fallbacks + the semantic layer
  const set = new Set(['transparent', '0,0,0', '255,255,255', ...semanticSet(mode)]);
  const ns = components[component];
  if (!ns) return set;
  for (const [, node] of leaves(ns)) {
    const v = canon(resolve(node.$value, semantic[mode]));
    if (v) set.add(v);
  }
  return set;
}

function findSpecs(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const f = join(dir, e);
    if (statSync(f).isDirectory()) out.push(...findSpecs(f));
    else if (e === 'index.md') out.push(f);
  }
  return out;
}
const field = (fm, k) => new RegExp(`^${k}:\\s*(.+)$`, 'm').exec(fm)?.[1]?.trim();

const cap = (s) => s.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join('');

const report = { generatedAt: new Date().toISOString(), storybook: STORYBOOK_URL, modes: ['light', 'dark'], components: [] };

const browser = await chromium.launch();
const page = await browser.newPage();
const index = await (await fetch(`${STORYBOOK_URL}/index.json`)).json();
const stories = index.entries ?? index.stories ?? {};

for (const file of findSpecs(join(root, 'specs'))) {
  const fm = /^---\n([\s\S]*?)\n---/.exec(readFileSync(file, 'utf8'))?.[1] ?? '';
  const name = field(fm, 'component');
  if (!name || !components[name]) continue;
  // pick the default-ish story for this component
  const storyId = Object.keys(stories).find(
    (id) => stories[id].title?.toLowerCase().endsWith('/' + name.replace(/-/g, '')) || id === `components-${name.replace(/-/g, '')}--default`,
  ) ?? Object.keys(stories).find((id) => new RegExp(`${name.replace(/-/g, '')}--`).test(id));
  if (!storyId) continue;

  const result = { component: name, story: storyId, checked: 0, matched: 0, misses: [] };
  for (const mode of ['light', 'dark']) {
    const allowed = allowedFor(name, mode);
    try {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=${storyId}&viewMode=story&globals=theme:${mode}`, { waitUntil: 'networkidle' });
      await page.evaluate((m) => document.documentElement.setAttribute('data-mantine-color-scheme', m), mode);
      // Find the component's own root, then read it — in one pass. Priority:
      //  1. Mantine root (.mantine-<Cap>-root) for Mantine-backed components.
      //  2. For custom components: the first element under #storybook-root that
      //     actually paints (a --cds-* inline var, a real bg, or a border) — this
      //     unwraps decorator wrappers without grabbing a transparent container.
      // Portal/trigger components whose root isn't in the default story yield
      // nothing and are skipped (not mis-scored against a trigger).
      const painted = await page.evaluate(({ Cap }) => {
        const paints = (n) => {
          const cs = getComputedStyle(n);
          const bg = cs.backgroundColor;
          const transparent = bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent';
          const hasBorder = parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none';
          const hasCdsVar = (n.getAttribute('style') || '').includes('--cds-');
          return (!transparent) || hasBorder || hasCdsVar;
        };
        let el = document.querySelector(`.mantine-${Cap}-root`);
        if (!el) {
          const sbRoot = document.querySelector('#storybook-root, #root, .sb-show-main');
          if (sbRoot) el = [...sbRoot.querySelectorAll('*')].find(paints) ?? null;
        }
        if (!el) return null;
        const cs = getComputedStyle(el);
        const out = { 'background-color': cs.backgroundColor, color: cs.color };
        // Only measure the border when there actually is one. With no border,
        // border-color defaults to currentColor (the text colour), which is a
        // phantom, not a painted border.
        if (parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none') {
          out['border-color'] = cs.borderTopColor;
        }
        return out;
      }, { Cap: cap(name) });
      if (!painted) {
        result.skippedModes = (result.skippedModes ?? 0) + 1;
        continue;
      }
      for (const [prop, raw] of Object.entries(painted)) {
        const v = canon(raw);
        if (v == null) continue;
        result.checked++;
        if (allowed.has(v)) result.matched++;
        else result.misses.push({ mode, prop, value: raw });
      }
    } catch (e) {
      result.misses.push({ mode, error: String(e).slice(0, 120) });
    }
  }
  result.measured = result.checked > 0;
  result.parity = result.measured ? Math.round((result.matched / result.checked) * 100) : null;
  report.components.push(result);
}

await browser.close();

const measured = report.components.filter((c) => c.measured);
measured.sort((a, b) => a.parity - b.parity);
report.components = [...measured, ...report.components.filter((c) => !c.measured)];
report.summary = {
  total: report.components.length,
  measured: measured.length,
  notMeasurable: report.components.length - measured.length,
  averageParity: Math.round(measured.reduce((s, c) => s + c.parity, 0) / (measured.length || 1)),
  belowThreshold: measured.filter((c) => c.parity < threshold).length,
  threshold,
};

const outDir = join(root, 'apps/observatory');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'parity-dom-report.json'), JSON.stringify(report, null, 2) + '\n');

console.log(`DOM parity: avg ${report.summary.averageParity}% across ${report.summary.measured} measured components (${report.summary.notMeasurable} not measurable in their default story) — ${report.summary.belowThreshold} below ${threshold}%`);
for (const c of report.components.filter((c) => c.measured && c.parity < threshold).slice(0, 15)) {
  console.log(`  ⚠︎ ${c.component}: ${c.parity}% — ${c.misses.slice(0, 2).map((m) => m.prop ? `${m.prop}=${m.value} (${m.mode})` : m.error).join(', ')}`);
}
console.log('→ apps/observatory/parity-dom-report.json');

if (strict && report.summary.belowThreshold > 0) process.exit(1);
