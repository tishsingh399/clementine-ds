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
 * Scope: the component's root element in its default story, colour properties
 * (background, text, border, outline, shadow) in light + dark, plus phase-1
 * interaction state sampling for hover/focus/active/disabled. Per-state wiring
 * warnings are informational in this phase; parity remains the gate. Writes
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
const stateNames = ['hover', 'focus', 'active', 'disabled'];

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

const colorPattern = /#[0-9a-f]{3,8}\b|rgba?\([^)]+\)/gi;
function colorValues(raw) {
  if (!raw || raw === 'none') return [];
  const text = String(raw);
  const matches = text.match(colorPattern);
  if (matches) return matches;
  return [{ raw: text, unparseable: true }];
}

function tokenStates(component) {
  const found = new Set();
  const ns = components[component];
  if (!ns) return [];
  for (const [path] of leaves(ns)) {
    const segments = path.toLowerCase().split(/[.-]/g);
    for (const state of stateNames) {
      if (segments.includes(state)) found.add(state);
    }
  }
  return [...found];
}

function stateTokenInfo(component, state, mode) {
  const ns = components[component];
  if (!ns) return { tokens: [], expectsChange: false };
  const tokens = [];
  let expectsChange = false;
  for (const [path, node] of leaves(ns)) {
    const parts = path.toLowerCase().split(/[.-]/g);
    if (!parts.includes(state)) continue;
    const value = canon(resolve(node.$value, semantic[mode]));
    const defaultPath = path
      .replace(new RegExp(`(^|[.-])${state}($|[.-])`, 'i'), '$1default$2')
      .replace(new RegExp(`-${state}$`, 'i'), '-default')
      .replace(new RegExp(`\\.${state}$`, 'i'), '.default');
    const defaultNode = lookup(ns, defaultPath);
    const defaultValue = defaultNode?.$value ? canon(resolve(defaultNode.$value, semantic[mode])) : null;
    const changes = value != null && value !== defaultValue;
    tokens.push({ path, value, defaultPath: defaultNode ? defaultPath : null, defaultValue, changes });
    if (changes) expectsChange = true;
  }
  return { tokens, expectsChange };
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

async function gotoStory(page, storyId, mode) {
  await page.goto(`${STORYBOOK_URL}/iframe.html?id=${storyId}&viewMode=story&globals=theme:${mode}`, { waitUntil: 'load' });
  await page.evaluate((m) => {
    document.documentElement.setAttribute('data-mantine-color-scheme', m);
    let style = document.getElementById('cds-parity-disable-motion');
    if (!style) {
      style = document.createElement('style');
      style.id = 'cds-parity-disable-motion';
      style.textContent = '*{transition:none!important;animation:none!important;}';
      document.head.appendChild(style);
    }
  }, mode);
  await page.waitForTimeout(75);
  await page.evaluate((m) => document.documentElement.setAttribute('data-mantine-color-scheme', m), mode);
}

async function findRootHandle(page, name) {
  return page.evaluateHandle(({ Cap }) => {
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
    return el;
  }, { Cap: cap(name) });
}

async function sampleRoot(page, rootHandle) {
  return page.evaluate((el) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const out = { 'background-color': cs.backgroundColor, color: cs.color };
    if (parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none') {
      out['border-color'] = cs.borderTopColor;
    }
    if (parseFloat(cs.outlineWidth) > 0 && cs.outlineStyle !== 'none') {
      out['outline-color'] = cs.outlineColor;
    }
    if (cs.boxShadow && cs.boxShadow !== 'none') {
      out['box-shadow'] = cs.boxShadow;
    }
    return out;
  }, rootHandle);
}

async function driveFocus(page, rootHandle) {
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    const inside = await page.evaluate((el) => el?.contains(document.activeElement), rootHandle);
    if (inside) return true;
  }
  return false;
}

async function driveState(page, rootHandle, state) {
  if (state === 'hover') {
    const box = await rootHandle.boundingBox();
    if (!box) return { status: 'unreachable' };
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    return { status: 'measured' };
  }
  if (state === 'active') {
    const box = await rootHandle.boundingBox();
    if (!box) return { status: 'unreachable' };
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    return { status: 'measured', cleanup: async () => page.mouse.up() };
  }
  if (state === 'focus') {
    const reached = await driveFocus(page, rootHandle);
    return reached ? { status: 'measured' } : { status: 'unreachable' };
  }
  return { status: 'unsupported' };
}

function recordPaint(result, allowed, mode, state, painted, beforePainted = null) {
  let sampled = 0;
  let changed = false;
  for (const [prop, raw] of Object.entries(painted ?? {})) {
    const beforeRaw = beforePainted?.[prop];
    if (beforeRaw !== undefined && String(beforeRaw) !== String(raw)) changed = true;
    for (const color of colorValues(raw)) {
      if (color?.unparseable) {
        result.unparseable = result.unparseable ?? [];
        result.unparseable.push({ mode, state, prop, value: color.raw });
        continue;
      }
      const v = canon(color);
      if (v == null) continue;
      sampled++;
      result.checked++;
      if (allowed.has(v)) result.matched++;
      else result.misses.push({ mode, state, prop, value: raw });
    }
  }
  return { sampled, changed };
}

const report = { generatedAt: new Date().toISOString(), storybook: STORYBOOK_URL, modes: ['light', 'dark'], components: [] };

const browser = await chromium.launch();
const page = await browser.newPage();
page.setDefaultTimeout(3000);
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

  const declaredStates = tokenStates(name);
  const disabledStoryId = declaredStates.includes('disabled')
    ? Object.keys(stories).find((id) => new RegExp(`${name.replace(/-/g, '')}--disabled$`).test(id))
    : null;
  const result = {
    component: name,
    story: storyId,
    checked: 0,
    matched: 0,
    misses: [],
    states: {},
    unwiredStates: [],
  };
  for (const mode of ['light', 'dark']) {
    const allowed = allowedFor(name, mode);
    try {
      await gotoStory(page, storyId, mode);
      const rootHandle = await findRootHandle(page, name);
      const painted = await sampleRoot(page, rootHandle);
      if (!painted) {
        result.skippedModes = (result.skippedModes ?? 0) + 1;
        continue;
      }
      const defaultResult = recordPaint(result, allowed, mode, 'default', painted);
      result.states.default = result.states.default ?? {};
      result.states.default[mode] = { status: 'measured', sampled: defaultResult.sampled };

      for (const state of declaredStates.filter((s) => s !== 'disabled')) {
        result.states[state] = result.states[state] ?? {};
        try {
          await gotoStory(page, storyId, mode);
          const stateRoot = await findRootHandle(page, name);
          const before = await sampleRoot(page, stateRoot);
          if (!before) {
            result.states[state][mode] = { status: 'no-root' };
            continue;
          }
          const driven = await driveState(page, stateRoot, state);
          if (driven.status !== 'measured') {
            result.states[state][mode] = { status: state === 'focus' ? 'unreachable' : driven.status };
            continue;
          }
          const statePainted = await sampleRoot(page, stateRoot);
          const sampled = recordPaint(result, allowed, mode, state, statePainted, before);
          result.states[state][mode] = { status: 'measured', sampled: sampled.sampled, changed: sampled.changed };
          const info = stateTokenInfo(name, state, mode);
          if (info.expectsChange && !sampled.changed) {
            result.unwiredStates.push({ mode, state, reason: 'declared-state-token-did-not-change-painted-root', tokens: info.tokens.filter((t) => t.changes).map((t) => t.path) });
          }
          await driven.cleanup?.();
        } catch (e) {
          result.states[state] = result.states[state] ?? {};
          result.states[state][mode] = { status: 'error', error: String(e).slice(0, 120) };
        }
      }

      if (declaredStates.includes('disabled')) {
        result.states.disabled = result.states.disabled ?? {};
        if (!disabledStoryId) {
          result.states.disabled[mode] = { status: 'no-story' };
        } else {
          await gotoStory(page, disabledStoryId, mode);
          const disabledRoot = await findRootHandle(page, name);
          const disabledPainted = await sampleRoot(page, disabledRoot);
          if (!disabledPainted) result.states.disabled[mode] = { status: 'no-root', story: disabledStoryId };
          else {
            const sampled = recordPaint(result, allowed, mode, 'disabled', disabledPainted, painted);
            result.states.disabled[mode] = { status: 'measured', story: disabledStoryId, sampled: sampled.sampled, changed: sampled.changed };
            const info = stateTokenInfo(name, 'disabled', mode);
            if (info.expectsChange && !sampled.changed) {
              result.unwiredStates.push({ mode, state: 'disabled', reason: 'declared-state-token-did-not-change-painted-root', tokens: info.tokens.filter((t) => t.changes).map((t) => t.path) });
            }
          }
        }
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
  unwiredStates: report.components.reduce((sum, c) => sum + (c.unwiredStates?.length ?? 0), 0),
  disabledNoStory: report.components.filter((c) => c.states?.disabled && Object.values(c.states.disabled).some((s) => s.status === 'no-story')).map((c) => c.component),
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
