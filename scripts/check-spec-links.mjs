#!/usr/bin/env node
/**
 * check-spec-links.mjs
 *
 * Validates that every relative markdown link inside specs/ resolves to a real
 * file on disk. This is the safety net for the flat spec layout (F13): dead
 * links don't fail a build, so this gate catches them explicitly.
 *
 *   node scripts/check-spec-links.mjs        # exit 1 if any spec link is broken
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function findMd(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) out.push(...findMd(full));
    else if (e.endsWith('.md')) out.push(full);
  }
  return out;
}

const broken = [];
let checked = 0;

for (const file of findMd(join(root, 'specs'))) {
  const md = readFileSync(file, 'utf8');
  for (const m of md.matchAll(/\]\(([^)]+)\)/g)) {
    let target = m[1].trim();
    if (/^(https?:|mailto:|#|\/)/.test(target)) continue; // external / absolute / anchor
    target = target.split('#')[0].split('?')[0]; // strip anchor/query
    if (!target) continue;
    checked++;
    const abs = resolve(dirname(file), target);
    if (!existsSync(abs)) broken.push(`${file.replace(root + '/', '')} → ${m[1]}`);
  }
}

if (broken.length) {
  console.error(`✗ ${broken.length} broken relative link(s) in specs (of ${checked} checked):\n`);
  for (const b of broken) console.error('  ' + b);
  process.exit(1);
}
console.log(`✔︎ spec links: ${checked} relative links across specs all resolve`);
