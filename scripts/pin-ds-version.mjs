#!/usr/bin/env node
/**
 * pin-ds-version.mjs  (F6)
 *
 * Replaces the meaningless `clementine-ds@HEAD` pin in every spec with the real
 * workspace version from the root package.json (e.g. clementine-ds@0.1.0), so
 * `ds_version` is an actual cache key for agents. Run after any version bump:
 *   `pnpm version:pin`
 *
 * Touches spec frontmatter (`ds_version:`) and tokens.json (`"version":`).
 * Idempotent — re-running with the same version is a no-op.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { version } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const pin = `clementine-ds@${version}`;

const files = execSync('grep -rl "clementine-ds@HEAD" specs', { cwd: root })
  .toString()
  .trim()
  .split('\n')
  .filter(Boolean);

let count = 0;
for (const rel of files) {
  const file = join(root, rel);
  const src = readFileSync(file, 'utf8');
  const out = src.replaceAll('clementine-ds@HEAD', pin);
  if (out !== src) {
    writeFileSync(file, out);
    count++;
  }
}

console.log(`✔︎ pinned ds_version → ${pin} across ${count} spec file(s)`);
