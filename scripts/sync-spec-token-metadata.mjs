#!/usr/bin/env node
/**
 * Keeps the human-readable `primitive` and `light` fields in spec token files
 * aligned with the token source of truth. The contract itself is still the
 * component-tier token path; this only refreshes the resolved metadata agents
 * and humans read while reviewing.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');
const format = process.argv.includes('--format');
const primitives = JSON.parse(readFileSync(join(root, 'packages/tokens/src/primitives.json'), 'utf8'));
const semantic = JSON.parse(readFileSync(join(root, 'packages/tokens/src/semantic-light.json'), 'utf8'));
const components = JSON.parse(readFileSync(join(root, 'packages/tokens/src/components.generated.json'), 'utf8'));

const lookup = (obj, path) => path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
const refPath = (value) => (typeof value === 'string' ? /^\{(.+)}$/.exec(value)?.[1] : undefined);
const indent = (text, spaces) => text.replace(/\n/g, `\n${' '.repeat(spaces)}`);

function collectTokenFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) collectTokenFiles(full, out);
    else if (entry === 'tokens.json') out.push(full);
  }
  return out;
}

function resolveMetadata(path) {
  const componentNode = lookup(components, path);
  if (!componentNode?.$value) return null;

  const firstRef = refPath(componentNode.$value);
  if (!firstRef) {
    return { primitive: componentNode.$value, light: componentNode.$value };
  }

  const semanticNode = lookup(semantic, firstRef);
  if (semanticNode?.$value) {
    const secondRef = refPath(semanticNode.$value);
    if (!secondRef) return { primitive: semanticNode.$value, light: semanticNode.$value };

    const primitiveNode = lookup(primitives, secondRef);
    if (!primitiveNode?.$value) return null;
    return { primitive: `{${secondRef}}`, light: primitiveNode.$value };
  }

  const primitiveNode = lookup(primitives, firstRef);
  if (!primitiveNode?.$value) return null;
  return { primitive: primitiveNode.$value, light: primitiveNode.$value };
}

const changed = [];

function formatTokenRow(token) {
  return `{ ${Object.entries(token)
    .map(([key, value]) => `${JSON.stringify(key)}: ${JSON.stringify(value)}`)
    .join(', ')} }`;
}

function formatTokenFile(data) {
  const entries = Object.entries(data);
  const lines = ['{'];

  entries.forEach(([key, value], index) => {
    const comma = index === entries.length - 1 ? '' : ',';
    if (key === 'tokens' && Array.isArray(value)) {
      lines.push('  "tokens": [');
      value.forEach((token, tokenIndex) => {
        const tokenComma = tokenIndex === value.length - 1 ? '' : ',';
        lines.push(`    ${formatTokenRow(token)}${tokenComma}`);
      });
      lines.push(`  ]${comma}`);
    } else {
      lines.push(`  ${JSON.stringify(key)}: ${indent(JSON.stringify(value, null, 2), 2)}${comma}`);
    }
  });

  lines.push('}');
  return `${lines.join('\n')}\n`;
}

for (const file of collectTokenFiles(join(root, 'specs'))) {
  const before = readFileSync(file, 'utf8');
  const data = JSON.parse(before);
  let touched = false;

  for (const token of data.tokens ?? []) {
    if (!token.path) continue;
    const resolved = resolveMetadata(token.path);
    if (!resolved) continue;

    if (token.primitive !== resolved.primitive || token.light !== resolved.light) {
      token.primitive = resolved.primitive;
      token.light = resolved.light;
      touched = true;
    }
  }

  if (touched || format) {
    changed.push(relative(root, file));
    if (!check) writeFileSync(file, formatTokenFile(data));
  }
}

if (changed.length) {
  console.error(`spec-token-metadata: ${changed.length} file(s) ${check ? 'stale' : 'refreshed'}`);
  for (const file of changed.slice(0, 20)) console.error(`  ${file}`);
  if (changed.length > 20) console.error(`  ...and ${changed.length - 20} more`);
  if (check) process.exit(1);
} else {
  console.log('spec-token-metadata: all token metadata is current');
}
