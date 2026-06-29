#!/usr/bin/env node
/**
 * parity-report.mjs  (F16 + F18)
 *
 * Cascade-parity: for every spec, checks that each token in `token_contract`
 * (a) exists as a leaf in the component-tier token file and (b) resolves all
 * the way through component → semantic → primitive to a concrete value. The
 * fraction that does is the spec's parity coverage.
 *
 * This is the runnable, no-browser layer of parity — it proves the *contract*
 * is internally honest (every declared token is real and resolvable). The
 * painted-DOM layer (Playwright `getComputedStyle` per interaction_state) is
 * the next step and is documented in fixes/04-p3; this report is the gate that
 * runs in CI today.
 *
 * Writes apps/observatory/parity-report.json and exits 1 (with --strict) if any
 * AI-Ready spec is below the threshold.
 *
 * Usage: node scripts/parity-report.mjs [--strict] [--threshold=80]
 */
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const strict = process.argv.includes('--strict');
const threshold = Number(process.argv.find((a) => a.startsWith('--threshold='))?.split('=')[1] ?? 80);

const primitives = JSON.parse(readFileSync(join(root, 'packages/tokens/src/primitives.json'), 'utf8'));
const semantic = JSON.parse(readFileSync(join(root, 'packages/tokens/src/semantic-light.json'), 'utf8'));
const components = JSON.parse(readFileSync(join(root, 'packages/tokens/src/components.generated.json'), 'utf8'));

const lookup = (tree, path) => path.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), tree);
function resolves(value) {
  const m = /^\{(.+)\}$/.exec(value);
  if (!m) return true; // literal — a concrete value
  const node = lookup(semantic, m[1]) ?? lookup(primitives, m[1]);
  if (!node || typeof node.$value !== 'string') return false;
  return resolves(node.$value);
}

function frontmatter(md) {
  return /^---\n([\s\S]*?)\n---/.exec(md)?.[1] ?? '';
}
function tokenContract(fm) {
  const m = /token_contract:\n([\s\S]*?)\n(?:\w|#)/.exec(fm + '\nEND');
  if (!m) return [];
  return m[1].split('\n').map((l) => l.replace(/^\s*-\s*/, '').trim()).filter((l) => l && !l.startsWith('#'));
}
const field = (fm, k) => new RegExp(`^${k}:\\s*(.+)$`, 'm').exec(fm)?.[1]?.trim();

function findSpecs(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) out.push(...findSpecs(full));
    else if (e === 'index.md') out.push(full);
  }
  return out;
}

const report = { generatedAt: new Date().toISOString(), threshold, specs: [] };
const demote = [];

for (const file of findSpecs(join(root, 'specs'))) {
  const fm = frontmatter(readFileSync(file, 'utf8'));
  const name = field(fm, 'component') ?? file.replace(root + '/', '');
  const status = field(fm, 'status');
  const contract = tokenContract(fm);
  const failed = contract.filter((t) => {
    const node = lookup(components, t);
    const isLeaf = node != null && typeof node === 'object' && '$value' in node;
    return !isLeaf || !resolves(node.$value);
  });
  const total = contract.length;
  const passed = total - failed.length;
  const parity = total === 0 ? 100 : Math.round((passed / total) * 100);
  const entry = { name, status, total, passed, parity, failed };
  report.specs.push(entry);
  if (status === 'AI-Ready' && parity < threshold) demote.push(entry);
}

report.specs.sort((a, b) => a.parity - b.parity);
report.summary = {
  count: report.specs.length,
  averageParity: Math.round(report.specs.reduce((s, x) => s + x.parity, 0) / report.specs.length),
  belowThreshold: report.specs.filter((s) => s.parity < threshold).length,
  demoteCandidates: demote.map((d) => d.name),
};

const outDir = join(root, 'apps/observatory');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'parity-report.json'), JSON.stringify(report, null, 2) + '\n');

console.log(`parity: avg ${report.summary.averageParity}% across ${report.summary.count} specs — ${report.summary.belowThreshold} below ${threshold}%`);
for (const d of demote) console.warn(`  ⚠︎ ${d.name}: ${d.parity}% (AI-Ready) — missing ${d.failed.slice(0, 3).join(', ')}${d.failed.length > 3 ? '…' : ''}`);
console.log(`→ apps/observatory/parity-report.json`);

if (strict && demote.length) process.exit(1);
