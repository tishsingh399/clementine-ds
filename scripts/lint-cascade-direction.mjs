#!/usr/bin/env node
/**
 * lint-cascade-direction.mjs  (F2)
 *
 * Enforces the one-way 3-tier cascade in the component-tier token files that
 * the runtime theme actually consumes (packages/tokens/src/components/*.json):
 *
 *   - component → semantic → primitive, never component → primitive (for colors)
 *   - dimensional/motion tokens (radius, spacing, shadow, motion, typography)
 *     MAY reference primitives directly — they have no semantic layer
 *   - every reference must resolve to a real token (no dangling refs)
 *   - text-role tokens resolve through `text.*`, never feedback/risk/action,
 *     and never text.tertiary on a surface.subtle background (4.28:1)
 *
 * `bad-token-tier` only checks the tier enum; this checks the *direction*.
 * Exit 1 on any violation. Wire as `pnpm validate:cascade`.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokensDir = join(root, 'packages/tokens/src');
const componentsDir = join(tokensDir, 'components');

const primitives = JSON.parse(readFileSync(join(tokensDir, 'primitives.json'), 'utf8'));
const semantic = JSON.parse(readFileSync(join(tokensDir, 'semantic-light.json'), 'utf8'));

// Primitive groups that have no semantic layer — direct reference is allowed.
const DIMENSIONAL_GROUPS = new Set(['radius', 'spacing', 'shadow', 'motion', 'typography']);

const has = (tree, path) =>
  path.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), tree) != null;

const violations = [];

function walk(file, node, type, path = []) {
  for (const [key, value] of Object.entries(node)) {
    if (value && typeof value === 'object' && '$value' in value) {
      checkLeaf(file, [...path, key].join('.'), value);
    } else if (value && typeof value === 'object') {
      walk(file, value, type, [...path, key]);
    }
  }
}

function checkLeaf(file, name, leaf) {
  const raw = leaf.$value;
  const isColor = leaf.$type === 'color';
  const match = /^\{(.+)\}$/.exec(raw);

  if (!match) {
    // Literal value. Colors must not be hardcoded at the component tier.
    if (isColor && /^#|^rgb/i.test(String(raw))) {
      violations.push(`${file}: ${name} is a hardcoded color literal "${raw}" — bind through a semantic token`);
    }
    return;
  }

  const refPath = match[1];
  const refGroup = refPath.split('.')[0];
  const inSemantic = has(semantic, refPath);
  const inPrimitive = has(primitives, refPath);

  if (!inSemantic && !inPrimitive) {
    violations.push(`${file}: ${name} → {${refPath}} is a dangling reference (resolves to nothing)`);
    return;
  }

  if (isColor && !inSemantic) {
    // A color that points straight at a primitive (e.g. {color.blue.6}) skips the semantic tier.
    violations.push(`${file}: ${name} → {${refPath}} binds a color directly to a primitive — must go through a semantic token`);
    return;
  }

  if (!isColor && !inSemantic && !DIMENSIONAL_GROUPS.has(refGroup)) {
    violations.push(`${file}: ${name} → {${refPath}} references a primitive group "${refGroup}" with no semantic layer and not in the dimensional allowlist`);
  }
}

// Text-role intent. A token that colors text must resolve through `text.*`:
// `feedback.*` / `risk.*` / `action.*` are tuned for fills, borders and icons
// (3:1), not text (4.5:1) — feedback.success is 3.3:1 on white. Roles come
// from the names specs give text parts (fg, label, title, count, delta-up…).
const TEXT_SEGMENT = /^(fg|label|title|body|value|count|empty|duration|delta-up|delta-down|caption|description|meta|placeholder|helper|name|text)$|^fg-|-fg$|-label$|-title$/;
// Text parts whose names don't say so (checked against the component source).
const TEXT_NAMED_OTHERWISE = new Set(['character-counter.over', 'field-label.required']);
const NON_TEXT_GROUP = /^\{(feedback|risk|action)\./;

const isTextRole = (path) =>
  TEXT_NAMED_OTHERWISE.has(path.join('.')) || path.slice(1).some((seg) => TEXT_SEGMENT.test(seg));

// The background a text token sits on, when the file names it: the same part's
// bg (fg-pending ↔ bg-pending, fg.x ↔ bg.x) or the component container's bg.
// shortcut: name pairing only — a text part on a differently named subtle area
// (e.g. a meta line inside an unread row) is not caught; upgrade with a paints-on field in the spec.
function backgroundsOf(path, colors) {
  const [comp, ...rest] = path;
  const swapped = rest.map((s) => s.replace(/^fg(?=-|$)/, 'bg').replace(/-fg$/, '-bg'));
  const candidates = [[comp, ...swapped].join('.'), `${comp}.bg`, `${comp}.bg.default`];
  return candidates.filter((c) => c !== path.join('.') && colors.has(c)).map((c) => [c, colors.get(c)]);
}

function checkTextRoles(file, json) {
  const colors = new Map();
  (function collect(node, path) {
    for (const [key, value] of Object.entries(node)) {
      if (value && typeof value === 'object' && '$value' in value) {
        if (value.$type === 'color') colors.set([...path, key].join('.'), value.$value);
      } else if (value && typeof value === 'object') collect(value, [...path, key]);
    }
  })(json, []);

  for (const [name, ref] of colors) {
    const path = name.split('.');
    if (!isTextRole(path)) continue;
    if (NON_TEXT_GROUP.test(ref)) {
      violations.push(`${file}: ${name} → ${ref} colors text with a non-text semantic — use a text.* token (text.error, text.success, text.warning, text.link…)`);
    }
    // Disabled text is WCAG-exempt (1.4.3), so disabled tertiary-on-subtle is allowed.
    if (ref === '{text.tertiary}' && !path.includes('disabled') && !path.some((s) => s.endsWith('-disabled'))) {
      for (const [bg, bgRef] of backgroundsOf(path, colors)) {
        if (bgRef === '{surface.subtle}') {
          violations.push(`${file}: ${name} → {text.tertiary} paints on ${bg} → {surface.subtle} (4.28:1, below AA) — use text.secondary`);
        }
      }
    }
  }
}

const files = readdirSync(componentsDir).filter((f) => f.endsWith('.json') && f !== 'components.generated.json');
for (const file of files) {
  const json = JSON.parse(readFileSync(join(componentsDir, file), 'utf8'));
  walk(file, json);
  checkTextRoles(file, json);
}

if (violations.length) {
  console.error(`✗ cascade-direction: ${violations.length} violation(s) across ${files.length} component token files\n`);
  for (const v of violations) console.error('  ' + v);
  process.exit(1);
}
console.log(`✔︎ cascade-direction: ${files.length} component token files honor component → semantic → primitive`);
