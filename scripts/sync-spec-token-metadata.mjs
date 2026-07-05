#!/usr/bin/env node
/**
 * Keeps human-readable token resolution metadata aligned with the token source
 * of truth. The contract itself is still the component-tier token path; this
 * refreshes the resolved metadata agents and humans read while reviewing:
 *
 *   - spec token JSON `primitive` and `light` fields
 *   - markdown table rows in specs index docs and docs/readme that show a
 *     single light-mode hex value beside a component or semantic token
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
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

const lookup = (obj, path) => path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
const refPath = (value) => (typeof value === 'string' ? /^\{(.+)}$/.exec(value)?.[1] : undefined);
const indent = (text, spaces) => text.replace(/\n/g, `\n${' '.repeat(spaces)}`);
const isHex = (value) => /^#[0-9a-fA-F]{6}$/.test(value);

function collectFiles(dir, predicate, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) collectFiles(full, predicate, out);
    else if (predicate(entry, full)) out.push(full);
  }
  return out;
}

function resolveSemantic(path) {
  const semanticNode = lookup(semantic, path);
  if (!semanticNode?.$value) return null;

  const primitiveRef = refPath(semanticNode.$value);
  if (!primitiveRef) return { primitive: semanticNode.$value, light: semanticNode.$value };

  const primitiveNode = lookup(primitives, primitiveRef);
  if (!primitiveNode?.$value) return null;
  return { primitive: `{${primitiveRef}}`, light: primitiveNode.$value };
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

function resolveAny(path) {
  return resolveMetadata(path) ?? resolveSemantic(path);
}

const changedTokenFiles = [];
const changedMarkdownFiles = [];
const staleMarkdownRows = [];

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

for (const file of collectFiles(join(root, 'specs'), (entry) => entry === 'tokens.json')) {
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
    changedTokenFiles.push(relative(root, file));
    if (!check) writeFileSync(file, formatTokenFile(data));
  }
}

function candidateTokenPaths(line) {
  const candidates = new Set();
  for (const match of line.matchAll(/\{([a-z0-9][a-z0-9.-]*(?:\.[a-z0-9-]+)+)\}/gi)) {
    candidates.add(match[1]);
  }
  for (const match of line.matchAll(/`([a-z0-9][a-z0-9.-]*(?:\.[a-z0-9-]+)+)`/gi)) {
    candidates.add(match[1]);
  }
  return [...candidates];
}

function syncMarkdownFile(file) {
  const before = readFileSync(file, 'utf8');
  const lines = before.split('\n');
  let touched = false;

  const next = lines.map((line, index) => {
    let updated = line;

    if (updated.includes('clementine-ds@HEAD')) {
      staleMarkdownRows.push({
        file: relative(root, file),
        line: index + 1,
        expected: `clementine-ds@${pkg.version}`,
        actual: 'clementine-ds@HEAD',
      });
      updated = updated.replaceAll('clementine-ds@HEAD', `clementine-ds@${pkg.version}`);
      touched = true;
    }

    if (!updated.includes('|')) return updated;

    const hexes = [...updated.matchAll(/#[0-9a-fA-F]{6}\b/g)].map((match) => match[0].toLowerCase());
    if (hexes.length !== 1) return updated;

    const resolvedHexes = new Set(
      candidateTokenPaths(updated)
        .map((path) => resolveAny(path)?.light)
        .filter((value) => value && isHex(value))
        .map((value) => value.toLowerCase()),
    );

    if (resolvedHexes.size !== 1) return updated;

    const [expected] = resolvedHexes;
    const [actual] = hexes;
    if (actual === expected) return updated;

    staleMarkdownRows.push({
      file: relative(root, file),
      line: index + 1,
      expected,
      actual,
    });
    touched = true;
    return updated.replace(/#[0-9a-fA-F]{6}\b/, expected);
  });

  if (touched) {
    changedMarkdownFiles.push(relative(root, file));
    if (!check) writeFileSync(file, next.join('\n'));
  }
}

for (const file of [
  ...collectFiles(join(root, 'specs'), (entry) => entry === 'index.md'),
  ...collectFiles(join(root, 'docs/readme'), (entry) => entry.endsWith('.md')),
]) {
  syncMarkdownFile(file);
}

const staleCount = changedTokenFiles.length + changedMarkdownFiles.length;
if (staleCount) {
  console.error(`spec-token-metadata: ${staleCount} file(s) ${check ? 'stale' : 'refreshed'}`);
  for (const file of [...changedTokenFiles, ...changedMarkdownFiles].slice(0, 20)) console.error(`  ${file}`);
  if (staleCount > 20) console.error(`  ...and ${staleCount - 20} more`);
  for (const row of staleMarkdownRows.slice(0, 10)) {
    console.error(`  ${row.file}:${row.line} ${row.actual} → ${row.expected}`);
  }
  if (staleMarkdownRows.length > 10) console.error(`  ...and ${staleMarkdownRows.length - 10} more prose row(s)`);
  if (check) process.exit(1);
} else {
  console.log('spec-token-metadata: all token and prose metadata is current');
}
