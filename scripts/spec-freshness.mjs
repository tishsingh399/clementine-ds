#!/usr/bin/env node
/**
 * spec-freshness.mjs
 *
 * `last_verified` is the date a spec was last reconciled with its code. It only
 * means something if it moves when the code moves. "The code" for a spec is its
 * React source, Storybook file, component-tier token file and specs/<name>/tokens.json.
 *
 *   (default)  Review queue: for each AI-Ready spec, the commits that touched
 *              its code after last_verified, plus the commits that touched the
 *              most specs (review those once, not per spec).
 *   --check    Fail when this branch changes an AI-Ready spec's code without
 *              changing its last_verified. Diffs the working tree against the
 *              merge-base with $SPEC_BASE_REF (default origin/main).
 *
 * Usage: node scripts/spec-freshness.mjs [--check]
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
// js-yaml is an observatory dependency, not a root one (same as build-agentic-indexes.mjs)
const yaml = createRequire(join(root, 'apps', 'observatory', 'package.json'))('js-yaml');
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
// CORE_SCHEMA keeps last_verified a string instead of a Date
const meta = (md) => yaml.load(md.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '', { schema: yaml.CORE_SCHEMA }) ?? {};

const specs = [];
for (const name of readdirSync(join(root, 'specs')).sort()) {
  const file = `specs/${name}/index.md`;
  let m;
  try { m = meta(readFileSync(join(root, file), 'utf8')); } catch { continue; }
  if (m.status !== 'AI-Ready') continue;
  const s = m.sources ?? {};
  const paths = [s.react?.path, s.code?.path, s.storybook?.path, s.tokens?.component, `specs/${name}/tokens.json`].filter(Boolean);
  specs.push({ name, file, lastVerified: String(m.last_verified), paths });
}

if (process.argv.includes('--check')) {
  const base = process.env.SPEC_BASE_REF ?? 'origin/main';
  let mergeBase;
  try {
    mergeBase = git('merge-base', base, 'HEAD');
  } catch {
    console.error(`✗ spec freshness: no merge-base with ${base} — fetch it (CI checkout needs fetch-depth: 0) or set SPEC_BASE_REF`);
    process.exit(1);
  }
  const changed = [
    ...git('diff', '--name-only', mergeBase).split('\n'),
    ...git('ls-files', '--others', '--exclude-standard').split('\n'),
  ].filter(Boolean);
  const touches = (p) => changed.filter((f) => f === p || f.startsWith(`${p}/`));

  const errors = [];
  for (const spec of specs) {
    const touched = spec.paths.flatMap(touches);
    if (!touched.length) continue;
    let before;
    try { before = String(meta(git('show', `${mergeBase}:${spec.file}`)).last_verified); } catch { continue; } // new spec
    if (before === spec.lastVerified) {
      errors.push(`${spec.name}: ${touched.join(', ')} changed but last_verified is still ${before} — re-verify the spec and bump it`);
    }
  }
  if (errors.length) {
    console.error(`✗ spec freshness: ${errors.length} spec(s) changed without a last_verified bump\n  ${errors.join('\n  ')}`);
    process.exit(1);
  }
  console.log(`✔︎ spec freshness: every AI-Ready spec whose code changed since ${base} has a new last_verified`);
  process.exit(0);
}

// ── review queue ──────────────────────────────────────────────────────────
const queue = [];
const clean = [];
const byCommit = new Map();
for (const spec of specs) {
  const log = git('log', `--after=${spec.lastVerified}T23:59:59`, '--format=%h %ad %s', '--date=short', '--', ...spec.paths);
  const commits = log ? log.split('\n') : [];
  if (!commits.length) { clean.push(spec.name); continue; }
  queue.push({ ...spec, commits });
  for (const c of commits) byCommit.set(c, [...(byCommit.get(c) ?? []), spec.name]);
}

console.log(`Spec review queue — ${queue.length} of ${specs.length} AI-Ready spec(s) have code changes after last_verified\n`);
console.log('Commits touching the most specs (review once, then re-date every spec it lists):');
for (const [commit, names] of [...byCommit].sort((a, b) => b[1].length - a[1].length).slice(0, 15)) {
  console.log(`  ${String(names.length).padStart(3)} specs  ${commit}`);
}
console.log('\nPer spec:');
for (const spec of queue.sort((a, b) => b.commits.length - a.commits.length)) {
  console.log(`  ${spec.name} (last_verified ${spec.lastVerified}, ${spec.commits.length} commit(s))`);
  for (const c of spec.commits) console.log(`      ${c}`);
}
if (clean.length) {
  console.log(`\nNo code changes since last_verified (re-date once the gates pass): ${clean.join(', ')}`);
}
