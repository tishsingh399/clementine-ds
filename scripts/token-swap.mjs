#!/usr/bin/env node
/**
 * token-swap.mjs — "swap the token, everything must follow".
 *
 * parity-dom.mjs checks that every painted colour is *a value* some contract
 * token resolves to. That misses a component painting a library default that
 * happens to equal the token's value (Slider painted Mantine's primary blue,
 * which equalled action.primary = blue.6, so it passed).
 *
 * This swaps action.primary (light) to a sentinel colour in memory, re-resolves
 * the cascade, and overrides every --cds-/--tds- var whose value changed on the
 * rendered page. Each component whose contract aliases action.primary is
 * rendered before and after: any property that painted the old colour and still
 * paints it after the swap is not wired to its token, and fails by name.
 *
 *   STORYBOOK_URL=http://localhost:6006 node scripts/token-swap.mjs
 *
 * Known misses live in governance/token-swap-allowlist.json. A new miss fails;
 * so does an allowlisted component that now follows (remove its entry).
 *
 * The token file on disk is never touched — the theme resolves tokens into CSS
 * vars at runtime, so overriding the vars is the same swap without a rebuild.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const STORYBOOK_URL = process.env.STORYBOOK_URL ?? 'http://localhost:6006';
const SWAP = 'action.primary';
const SENTINEL = '{color.orange.6}';

const tokensDir = join(root, 'packages/tokens/src');
const read = (f) => JSON.parse(readFileSync(join(tokensDir, f), 'utf8'));
const primitives = read('primitives.json');
const semantic = read('semantic-light.json');
const components = read('components.generated.json');
const allowlist = new Map(
  JSON.parse(readFileSync(join(root, 'governance/token-swap-allowlist.json'), 'utf8')).notFollowing.map((e) => [e.component, e.reason]),
);
const swapped = structuredClone(semantic);
swapped.action.primary.$value = SENTINEL;

const lookup = (tree, path) => path.split('.').reduce((a, k) => (a == null ? a : a[k]), tree);
// returns [value, chain of refs walked]
function resolve(value, sem, chain = []) {
  const m = /^\{(.+)\}$/.exec(value);
  if (!m) return [value, chain];
  const node = lookup(sem, m[1]) ?? lookup(primitives, m[1]);
  return node && typeof node.$value === 'string' ? resolve(node.$value, sem, [...chain, m[1]]) : [value, chain];
}
const rgb = (hex) => {
  const h = hex.replace('#', '');
  return `rgb(${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)})`;
};
function leaves(obj, path = [], out = []) {
  for (const [k, v] of Object.entries(obj)) {
    if (v && typeof v === 'object' && '$value' in v) out.push([[...path, k], v]);
    else if (v && typeof v === 'object') leaves(v, [...path, k], out);
  }
  return out;
}

const oldColor = rgb(resolve(`{${SWAP}}`, semantic)[0]);
const newColor = rgb(resolve(SENTINEL, semantic)[0]);

// Every CSS var the theme emits (clementine-theme.ts cssVariablesResolver) whose value the swap changes.
const overrides = {};
for (const [path, node] of leaves(semantic)) {
  const after = resolve(lookup(swapped, path.join('.')).$value, swapped)[0];
  if (after !== resolve(node.$value, semantic)[0]) for (const p of ['--cds', '--tds']) overrides[`${p}-${path.join('-')}`] = after;
}
for (const [path, node] of leaves(components)) {
  const after = resolve(node.$value, swapped)[0];
  if (after !== resolve(node.$value, semantic)[0]) overrides[`--cds-${path.join('-')}`] = after;
}
const overrideCss = `:root:root:root{${Object.entries(overrides).map(([k, v]) => `${k}:${v} !important`).join(';')}}`;

// Components whose contract aliases the swapped token, and whether another contract token legitimately paints the same colour.
const targets = Object.entries(components)
  .map(([name, ns]) => {
    const resolved = leaves(ns).map(([, node]) => resolve(node.$value, semantic));
    return {
      name,
      aliases: resolved.some(([, chain]) => chain.includes(SWAP)),
      ambiguous: resolved.some(([v, chain]) => !chain.includes(SWAP) && rgb(v) === oldColor),
    };
  })
  .filter((t) => t.aliases);

function findSpecs(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const f = join(dir, e);
    if (statSync(f).isDirectory()) out.push(...findSpecs(f));
    else if (e === 'index.md') out.push(f);
  }
  return out;
}
const specNames = new Set(
  findSpecs(join(root, 'specs')).map((f) => /^component:\s*(.+)$/m.exec(readFileSync(f, 'utf8'))?.[1]?.trim()),
);

const require = createRequire(join(root, 'apps/storybook/package.json'));
const { chromium } = require('playwright');
const index = await (await fetch(`${STORYBOOK_URL}/index.json`)).json();
const stories = index.entries ?? index.stories ?? {};
// same default-story pick as parity-dom.mjs
const storyFor = (name) => {
  const flat = name.replace(/-/g, '');
  return Object.keys(stories).find((id) => stories[id].title?.toLowerCase().endsWith('/' + flat) || id === `components-${flat}--default`)
    ?? Object.keys(stories).find((id) => new RegExp(`${flat}--`).test(id));
};

async function sample(page, storyId, css) {
  await page.goto(`${STORYBOOK_URL}/iframe.html?id=${storyId}&viewMode=story&globals=theme:light`, { waitUntil: 'load' });
  await page.waitForSelector('#storybook-root > *', { state: 'attached', timeout: 10000 }).catch(() => {});
  await page.addStyleTag({ content: `*{transition:none!important;animation:none!important}${css}` });
  await page.waitForTimeout(150);
  return page.evaluate(() => {
    const root = document.querySelector('#storybook-root');
    const out = {};
    if (!root) return out;
    [...root.querySelectorAll('*')].forEach((n, i) => {
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden') return;
      const key = `${i}:${n.tagName.toLowerCase()}${typeof n.className === 'string' ? '.' + n.className.split(/\s+/)[0] : ''}`;
      for (const p of ['background-color', 'color', 'border-top-color', 'border-left-color', 'outline-color', 'box-shadow', 'fill', 'stroke']) {
        out[`${key}:${p}`] = cs.getPropertyValue(p);
      }
    });
    return out;
  });
}

const browser = await chromium.launch();
const page = await browser.newPage();
const failures = [];
const notExercised = [];
let checked = 0;
for (const t of targets) {
  if (!specNames.has(t.name)) continue;
  const storyId = storyFor(t.name);
  if (!storyId) { notExercised.push(`${t.name} (no story)`); continue; }
  const before = await sample(page, storyId, '');
  const after = await sample(page, storyId, overrideCss);
  const hits = Object.keys(before).filter((k) => before[k].includes(oldColor));
  if (!hits.length) { notExercised.push(`${t.name} (default story paints no ${SWAP})`); continue; }
  checked++;
  const stuck = hits.filter((k) => after[k]?.includes(oldColor) && !after[k].includes(newColor));
  if (stuck.length && !t.ambiguous) failures.push({ name: t.name, storyId, stuck });
  else if (stuck.length) notExercised.push(`${t.name} (another contract token also resolves to ${oldColor})`);
}
await browser.close();

const failed = new Set(failures.map((f) => f.name));
const fresh = failures.filter((f) => !allowlist.has(f.name));
const stale = [...allowlist.keys()].filter((name) => !failed.has(name));

console.log(`token-swap: ${SWAP} ${oldColor} → ${newColor}; ${checked} components checked, ${failures.length} did not follow (${failures.length - fresh.length} allowlisted)`);
for (const n of notExercised) console.log(`  · skipped ${n}`);
for (const f of failures) {
  const line = `${f.name} (${f.storyId}) still paints ${oldColor}: ${f.stuck.slice(0, 3).join(', ')}`;
  if (allowlist.has(f.name)) console.log(`  ~ allowlisted ${line}`);
  else console.error(`  ✗ ${line}`);
}
for (const name of stale) console.error(`  ✗ ${name} is allowlisted but now follows the swap (or was not checked) — remove it from governance/token-swap-allowlist.json`);
if (fresh.length || stale.length) process.exit(1);
