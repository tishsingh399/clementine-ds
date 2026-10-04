#!/usr/bin/env node
/**
 * check-theme-nested-selectors.mjs
 *
 * Mantine applies theme `styles` as inline styles. An inline style cannot hold
 * a selector, so a nested key such as '&:focus-visible' or '&[data-checked]'
 * is dropped without an error unless @mantine/emotion is installed (it is not).
 * Until this check, 34 such rules sat in the theme doing nothing: a checked
 * Switch kept its "off" track, completed Stepper steps stayed grey, and a
 * success Progress bar stayed blue, while every token check passed.
 *
 * State rules belong in packages/ui/src/theme/states.css. Exit 1 if a nested
 * selector key appears anywhere in the theme file.
 * Wire as `pnpm validate:theme-selectors`.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const file = 'packages/ui/src/theme/clementine-theme.ts';
const lines = readFileSync(join(root, file), 'utf8').split('\n');

const hits = [];
lines.forEach((line, i) => {
  const code = line.replace(/\/\/.*$/, '');
  const m = /(['"`])&.*?\1\s*:/.exec(code);
  if (m) hits.push(`${file}:${i + 1}  ${line.trim()}`);
});

if (hits.length) {
  console.error(`✗ theme-nested-selectors: ${hits.length} nested selector key(s) in theme styles`);
  console.error('  Theme styles are inline and cannot hold selectors; these rules never apply.');
  console.error('  Move them to packages/ui/src/theme/states.css.\n');
  for (const h of hits) console.error('  ' + h);
  process.exit(1);
}
console.log('✔︎ theme-nested-selectors: no nested selectors in theme styles');
