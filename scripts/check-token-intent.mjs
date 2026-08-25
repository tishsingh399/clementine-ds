#!/usr/bin/env node
/**
 * check-token-intent.mjs
 *
 * A token name tells a model nothing. `color.danger.500` looks like a colour to
 * an agent; only a human knows it means "irreversible action". This gate makes
 * that meaning explicit and keeps it honest.
 *
 * Intent is declared once, on the semantic tier, under
 * `$extensions.clementine.intent`. Component tokens inherit it by aliasing —
 * intent is never inferred from a token's name, because names lie:
 * `composer.stop-bg` and `diff-view.removed-bg` carry destructive and error
 * meaning without saying so, while plenty of tokens named "error" are just
 * borders.
 *
 * Three checks:
 *   1. Completeness — if any token in a group declares intent, every token in
 *      that group must. A group that starts carrying meaning cannot go halfway.
 *   2. Agreement — light and dark must declare the same intent for a token.
 *   3. Ratchet — every component token that inherits an intent is recorded in
 *      governance/token-intent-baseline.json. A new one fails until a human
 *      confirms it and reruns with --update.
 *
 * The baseline is a record of what inherits meaning today, not a claim that all
 * of it is correct. It stops new drift while the existing rows get reviewed.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const baselinePath = join(root, 'governance/token-intent-baseline.json');
const update = process.argv.includes('--update');
const errors = [];

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), 'utf8'));
}

const light = readJson('packages/tokens/src/semantic-light.json');
const dark = readJson('packages/tokens/src/semantic-dark.json');
const components = readJson('packages/tokens/src/components.generated.json');

function intentOf(token) {
  return token?.$extensions?.clementine?.intent;
}

/** Every `group.name` in a semantic tree, with its declared intent (or undefined). */
function semanticIntents(tree) {
  const out = new Map();
  for (const [group, entries] of Object.entries(tree)) {
    for (const [name, token] of Object.entries(entries)) {
      out.set(`${group}.${name}`, intentOf(token));
    }
  }
  return out;
}

const lightIntents = semanticIntents(light);
const darkIntents = semanticIntents(dark);

// --- 1. completeness: a group that carries meaning must carry it everywhere ---
const groupsWithIntent = new Set();
for (const [path, intent] of lightIntents) if (intent) groupsWithIntent.add(path.split('.')[0]);

for (const [path, intent] of lightIntents) {
  const group = path.split('.')[0];
  if (!groupsWithIntent.has(group) || intent) continue;
  errors.push(
    `${path} has no intent, but other tokens in "${group}" declare one. ` +
      `Add $extensions.clementine.intent, or move the token out of the group.`,
  );
}

// --- 2. agreement: light and dark must mean the same thing ----------------
for (const [path, intent] of lightIntents) {
  if (!darkIntents.has(path)) {
    errors.push(`${path} exists in semantic-light but not semantic-dark.`);
    continue;
  }
  const darkIntent = darkIntents.get(path);
  if (intent !== darkIntent) {
    errors.push(
      `${path} declares intent "${intent ?? 'none'}" in light but ` +
        `"${darkIntent ?? 'none'}" in dark. A token means one thing in both modes.`,
    );
  }
}
for (const path of darkIntents.keys()) {
  if (!lightIntents.has(path)) errors.push(`${path} exists in semantic-dark but not semantic-light.`);
}

// --- 3. propagation: which component tokens inherit meaning? --------------
function componentLeaves(node, prefix = []) {
  const out = [];
  for (const [key, value] of Object.entries(node ?? {})) {
    if (value && typeof value === 'object' && '$value' in value) {
      out.push([prefix.concat(key).join('.'), value.$value]);
    } else if (value && typeof value === 'object') {
      out.push(...componentLeaves(value, prefix.concat(key)));
    }
  }
  return out;
}

const inherited = [];
for (const [component, tree] of Object.entries(components)) {
  for (const [path, value] of componentLeaves(tree)) {
    if (typeof value !== 'string') continue;
    const alias = /^\{([^}]+)\}$/.exec(value.trim());
    if (!alias) continue;
    const intent = lightIntents.get(alias[1]);
    if (!intent) continue;
    inherited.push({
      token: `${component}.${path}`,
      inheritsFrom: alias[1],
      intent,
    });
  }
}
inherited.sort((a, b) => a.token.localeCompare(b.token));

if (update) {
  mkdirSync(dirname(baselinePath), { recursive: true });
  writeFileSync(
    baselinePath,
    `${JSON.stringify({ generatedAt: new Date().toISOString(), inherited }, null, 2)}\n`,
  );
  console.log(
    `token intent: wrote ${inherited.length} inherited-intent token(s) → ${relative(root, baselinePath)}`,
  );
  process.exit(0);
}

if (!existsSync(baselinePath)) {
  console.error(
    `token intent: missing baseline (${relative(root, baselinePath)}). ` +
      `Run node scripts/check-token-intent.mjs --update intentionally.`,
  );
  process.exit(1);
}

const baseline = JSON.parse(readFileSync(baselinePath, 'utf8'));
const baselineRows = new Map(
  (baseline.inherited ?? []).map((row) => [row.token, `${row.inheritsFrom}|${row.intent}`]),
);
const currentRows = new Map(inherited.map((row) => [row.token, `${row.inheritsFrom}|${row.intent}`]));

const added = inherited.filter((row) => !baselineRows.has(row.token));
const changed = inherited.filter(
  (row) => baselineRows.has(row.token) && baselineRows.get(row.token) !== currentRows.get(row.token),
);
const removed = [...baselineRows.keys()].filter((token) => !currentRows.has(token));

for (const row of added) {
  errors.push(
    `${row.token} newly inherits "${row.intent}" intent from ${row.inheritsFrom}. ` +
      `Confirm that is deliberate — ${row.intent === 'destructive' ? 'this paint is reserved for irreversible actions' : 'this paint carries a specific meaning'} — then rerun with --update.`,
  );
}
for (const row of changed) {
  errors.push(
    `${row.token} changed meaning: baseline had ${baselineRows.get(row.token).replace('|', ' → ')}, ` +
      `now ${row.inheritsFrom} → ${row.intent}. Confirm, then rerun with --update.`,
  );
}
for (const token of removed) {
  errors.push(`${token} no longer inherits intent — baseline is stale. Rerun with --update.`);
}

if (errors.length) {
  for (const error of errors) console.error(`  ✖ ${error}`);
  console.error(
    `\ntoken intent: ${errors.length} error(s) — ${added.length} new, ${changed.length} changed, ${removed.length} stale`,
  );
  process.exit(1);
}

const byIntent = inherited.reduce((acc, row) => {
  acc[row.intent] = (acc[row.intent] ?? 0) + 1;
  return acc;
}, {});
const summary = Object.entries(byIntent)
  .sort((a, b) => b[1] - a[1])
  .map(([intent, count]) => `${intent} ${count}`)
  .join(', ');

console.log(
  `✔︎ token intent: ${groupsWithIntent.size} semantic group(s) declare intent; ` +
    `${inherited.length} component token(s) inherit it (${summary})`,
);
