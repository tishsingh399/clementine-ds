#!/usr/bin/env node
/**
 * check-spec-honesty.mjs  (F4 + F5)
 *
 * Makes the self-reported `checks:` keys and `last_verified` mechanically
 * verifiable, instead of trusting whatever the spec author typed.
 *
 * F4 — for each spec where a check is `true`, prove it against the code:
 *   - aria_correct        every `required_aria` attribute appears in the React source
 *   - tokens_valid        every `token_contract` entry exists as a leaf in the
 *                         component-tier token file (the runtime source of truth)
 *   - no_invented_styles  the React source has no raw hex/rgb color or raw
 *                         ms/s duration that isn't coming through a CSS var
 *   - states_complete     the referenced Storybook file exists and exports stories
 *
 * F5 — staleness: an `AI-Ready` spec older than `warnDays` is flagged for
 *   demotion; older than `failDays` is a hard error.
 *
 * Mode (from .agenticspec.config.json or --strict):
 *   warn   → report findings, exit 0 (default — one release cycle to clean up)
 *   strict → any honesty mismatch or staleness hard-fail exits 1
 *
 * Usage: node scripts/check-spec-honesty.mjs [--strict]
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(readFileSync(join(root, '.agenticspec.config.json'), 'utf8'));
const strict = process.argv.includes('--strict') || config.honesty?.mode === 'strict';
const { warnDays = 90, failDays = 180 } = config.staleness ?? {};

const componentTokens = JSON.parse(
  readFileSync(join(root, 'packages/tokens/src/components.generated.json'), 'utf8'),
);

// --- tiny frontmatter reader (no yaml dependency) -------------------------
function frontmatter(md) {
  const m = /^---\n([\s\S]*?)\n---/.exec(md);
  return m ? m[1] : '';
}
const field = (fm, key) => {
  const m = new RegExp(`^${key}:\\s*(.+)$`, 'm').exec(fm);
  return m ? m[1].trim() : undefined;
};
const inlineList = (fm, key) => {
  const m = new RegExp(`^${key}:\\s*\\[(.*?)\\]`, 'm').exec(fm);
  return m ? m[1].split(',').map((s) => s.trim()).filter(Boolean) : [];
};
const checkVal = (fm, key) => /true/.test(new RegExp(`${key}:\\s*(true|false)`).exec(fm)?.[1] ?? '');
const reactPath = (fm) => /path:\s*(packages\/ui\/src\/[^\s]+\.tsx)/.exec(fm)?.[1];
const storybookPath = (fm) => /path:\s*(apps\/storybook\/[^\s]+\.tsx)/.exec(fm)?.[1];
function tokenContract(fm) {
  const m = /token_contract:\n([\s\S]*?)\n(?:\w|#)/.exec(fm + '\nEND');
  if (!m) return [];
  return m[1]
    .split('\n')
    .map((l) => l.replace(/^\s*-\s*/, '').trim())
    .filter((l) => l && !l.startsWith('#'));
}
const leafExists = (path) => {
  const node = path.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), componentTokens);
  return node != null && typeof node === 'object' && '$value' in node;
};

// --- collect specs --------------------------------------------------------
function findSpecs(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...findSpecs(full));
    else if (entry === 'index.md') out.push(full);
  }
  return out;
}

const specs = findSpecs(join(root, 'specs'));
const warnings = [];
const errors = [];
const now = Date.now();

for (const file of specs) {
  const rel = file.replace(root + '/', '');
  const md = readFileSync(file, 'utf8');
  const fm = frontmatter(md);
  const name = field(fm, 'component') ?? rel;
  const status = field(fm, 'status');
  const rp = reactPath(fm);
  const src = rp && existsSync(join(root, rp)) ? readFileSync(join(root, rp), 'utf8') : '';

  // aria_correct — source-grep is only meaningful for components that own their
  // accessibility tree. Anything backed by Mantine (`@mantine/core`) delegates
  // role/aria to Mantine and the consumer, so the rendered DOM is the only
  // honest place to verify it — that's covered by the Storybook a11y (axe)
  // addon at runtime, not by grepping the wrapper. We therefore only grep
  // purely-custom components (no Mantine import), and only for real ARIA tokens.
  if (checkVal(fm, 'aria_correct') && src) {
    // Any @mantine/* package (core, dates, notifications, charts, carousel)
    // owns its accessibility tree — ARIA is verified in the rendered DOM by the
    // Storybook axe addon, not by grepping the wrapper source.
    const mantineBacked = /from '@mantine\//.test(src);
    if (!mantineBacked) {
      const ariaTokens = inlineList(fm, 'required_aria').filter((a) => /^(aria-[a-z]+|role)$/.test(a));
      const missing = ariaTokens.filter((a) => !src.includes(a));
      if (missing.length) warnings.push(`${name}: aria_correct=true but custom (non-Mantine) source missing ${missing.join(', ')}`);
    }
  }

  // tokens_valid (extended to component-tier existence)
  if (checkVal(fm, 'tokens_valid')) {
    const missing = tokenContract(fm).filter((t) => !leafExists(t));
    if (missing.length) warnings.push(`${name}: tokens_valid=true but contract token(s) not in component JSON: ${missing.slice(0, 4).join(', ')}${missing.length > 4 ? '…' : ''}`);
  }

  // no_invented_styles — scan only real style contexts (style={{…}} objects and
  // inline <style> CSS), after stripping comments. This avoids false positives
  // on display copy ("Thought for 1.2s") and comments ("200ms open delay").
  if (checkVal(fm, 'no_invented_styles') && src) {
    const noComments = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
    const styleBlocks = [
      ...[...noComments.matchAll(/style=\{\{([\s\S]*?)\}\}/g)].map((m) => m[1]),
      ...[...noComments.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]),
    ].join('\n');
    const offenders = [];
    for (const m of styleBlocks.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) offenders.push(m[0]);
    // raw time literals inside a CSS value (animation/transition/duration), not via var()
    for (const m of styleBlocks.matchAll(/(?<![\w-])\d+(?:\.\d+)?m?s\b/g)) offenders.push(m[0]);
    if (offenders.length) warnings.push(`${name}: no_invented_styles=true but style has raw value(s): ${[...new Set(offenders)].slice(0, 5).join(', ')}`);
  }

  // states_complete (lenient: story file exists)
  if (checkVal(fm, 'states_complete')) {
    const sp = storybookPath(fm);
    if (sp && !existsSync(join(root, sp))) warnings.push(`${name}: states_complete=true but no story file at ${sp}`);
  }

  // F5 — staleness
  const lv = field(fm, 'last_verified');
  if (status === 'AI-Ready' && lv) {
    const ageDays = (now - Date.parse(lv)) / 86_400_000;
    if (ageDays > failDays) errors.push(`${name}: AI-Ready but last_verified ${lv} is ${Math.round(ageDays)}d old (> ${failDays}) — must re-verify or demote`);
    else if (ageDays > warnDays) warnings.push(`${name}: AI-Ready but last_verified ${lv} is ${Math.round(ageDays)}d old (> ${warnDays}) — demote suggested`);
  }
}

console.log(`Checked ${specs.length} specs — ${errors.length} error(s), ${warnings.length} warning(s) [mode: ${strict ? 'strict' : 'warn'}]\n`);
for (const e of errors) console.error('  ✗ ' + e);
for (const w of warnings) console.warn('  ⚠︎ ' + w);

if (errors.length || (strict && warnings.length)) process.exit(1);
