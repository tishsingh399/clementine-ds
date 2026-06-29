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

const files = readdirSync(componentsDir).filter((f) => f.endsWith('.json') && f !== 'components.generated.json');
for (const file of files) {
  const json = JSON.parse(readFileSync(join(componentsDir, file), 'utf8'));
  walk(file, json);
}

if (violations.length) {
  console.error(`✗ cascade-direction: ${violations.length} violation(s) across ${files.length} component token files\n`);
  for (const v of violations) console.error('  ' + v);
  process.exit(1);
}
console.log(`✔︎ cascade-direction: ${files.length} component token files honor component → semantic → primitive`);
