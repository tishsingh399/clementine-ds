#!/usr/bin/env node
/**
 * check-state-coverage.mjs
 *
 * Audits whether each spec-declared interaction state has visible evidence.
 * Evidence can be an explicit Storybook story/export or phase-1 painted-DOM
 * sampling for browser pseudo-states. Existing gaps are kept in a baseline so
 * they are explicit and new gaps cannot slip in silently.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const baselinePath = join(root, 'governance/state-coverage-baseline.json');
const update = process.argv.includes('--update');
const sampledPseudoStates = new Set(['hover', 'focus', 'active']);

function findSpecFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...findSpecFiles(full));
    else if (entry === 'index.md') out.push(full);
  }
  return out.sort();
}

function frontmatter(markdown, file) {
  const match = /^---\n([\s\S]*?)\n---/.exec(markdown);
  if (!match) throw new Error(`${relative(root, file)}: missing YAML frontmatter`);
  return match[1];
}

function readScalar(yaml, key) {
  return new RegExp(`^${key}:\\s*(.+)$`, 'm').exec(yaml)?.[1]?.trim();
}

function readInlineList(yaml, key) {
  const raw = readScalar(yaml, key);
  const match = raw?.match(/^\[(.*)\]$/);
  if (!match) return [];
  return match[1].split(',').map((item) => item.trim()).filter(Boolean);
}

function readStorybookPath(yaml) {
  return /^  storybook:\n(?:    .+\n)*?    path:\s*(.+)$/m.exec(yaml)?.[1]?.trim();
}

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function storyEvidence(storySource, state) {
  const wanted = normalize(state);
  const exports = [...storySource.matchAll(/\bexport\s+const\s+([A-Za-z0-9_]+)/g)].map((match) => normalize(match[1]));
  if (exports.some((name) => name === wanted || name.includes(wanted))) return 'storybook-export';

  const statePattern = new RegExp(`\\b${state.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
  if (statePattern.test(storySource)) return 'storybook-source';

  return null;
}

function stateCoverage(component, state, storyFile, storySource) {
  if (state === 'default') return { component, state, status: 'covered', evidence: 'default-story' };
  if (sampledPseudoStates.has(state)) return { component, state, status: 'covered', evidence: 'painted-dom-sampler' };
  const evidence = storyEvidence(storySource, state);
  if (evidence) return { component, state, status: 'covered', evidence };
  return {
    component,
    state,
    status: 'gap',
    story: relative(root, storyFile),
    reason: state === 'visited'
      ? 'visited cannot be reliably simulated in automated browser CSS checks; needs an explicit story or manual evidence'
      : 'no explicit Storybook evidence for declared state',
  };
}

const rows = [];
const errors = [];

for (const specFile of findSpecFiles(join(root, 'specs'))) {
  const markdown = readFileSync(specFile, 'utf8');
  const yaml = frontmatter(markdown, specFile);
  const component = readScalar(yaml, 'component');
  const states = readInlineList(yaml, 'interaction_states');
  const storyPath = readStorybookPath(yaml);

  if (!component) {
    errors.push(`${relative(root, specFile)}: missing component`);
    continue;
  }
  if (states.length === 0) {
    errors.push(`${relative(root, specFile)}: missing interaction_states`);
    continue;
  }
  if (!storyPath) {
    errors.push(`${relative(root, specFile)}: missing sources.storybook.path`);
    continue;
  }

  const storyFile = join(root, storyPath);
  if (!existsSync(storyFile)) {
    errors.push(`${relative(root, specFile)}: story file does not exist (${storyPath})`);
    continue;
  }

  const storySource = readFileSync(storyFile, 'utf8');
  for (const state of states) rows.push(stateCoverage(component, state, storyFile, storySource));
}

const gaps = rows.filter((row) => row.status === 'gap').sort((a, b) => `${a.component}:${a.state}`.localeCompare(`${b.component}:${b.state}`));

if (update) {
  mkdirSync(dirname(baselinePath), { recursive: true });
  writeFileSync(baselinePath, `${JSON.stringify({ generatedAt: new Date().toISOString(), gaps }, null, 2)}\n`);
  console.log(`state coverage: wrote ${gaps.length} known gap(s) → ${relative(root, baselinePath)}`);
  process.exit(errors.length ? 1 : 0);
}

if (!existsSync(baselinePath)) {
  console.error(`state coverage: missing baseline (${relative(root, baselinePath)}). Run node scripts/check-state-coverage.mjs --update intentionally.`);
  process.exit(1);
}

const baseline = JSON.parse(readFileSync(baselinePath, 'utf8'));
const baselineKeys = new Set((baseline.gaps ?? []).map((row) => `${row.component}:${row.state}`));
const currentKeys = new Set(gaps.map((row) => `${row.component}:${row.state}`));
const newGaps = gaps.filter((row) => !baselineKeys.has(`${row.component}:${row.state}`));
const staleBaseline = (baseline.gaps ?? []).filter((row) => !currentKeys.has(`${row.component}:${row.state}`));

if (errors.length || newGaps.length || staleBaseline.length) {
  console.error(`state coverage: ${errors.length} error(s), ${newGaps.length} new gap(s), ${staleBaseline.length} stale baseline row(s)`);
  for (const error of errors) console.error(`  - ${error}`);
  for (const gap of newGaps) console.error(`  - new gap: ${gap.component}.${gap.state} (${gap.reason})`);
  for (const row of staleBaseline) console.error(`  - stale baseline: ${row.component}.${row.state}`);
  process.exit(1);
}

const covered = rows.length - gaps.length;
console.log(`✔︎ state coverage: ${covered}/${rows.length} state declarations covered; ${gaps.length} known gap(s) tracked in baseline`);
