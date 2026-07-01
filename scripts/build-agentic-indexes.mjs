#!/usr/bin/env node
/**
 * Builds Clementine-native agentic indexes from specs/.
 *
 * These files are reasoning aids for agents and reviewers. They do not replace
 * specs; they summarize the spec graph so an agent can quickly answer:
 * - what is this component for?
 * - what tokens/parts/states does it depend on?
 * - what else is affected if this changes?
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(root, 'apps', 'observatory', 'package.json'));
const yaml = require('js-yaml');
const specsDir = join(root, 'specs');
const outDir = join(root, 'governance', 'agentic-indexes');

function walkSpecDirs(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (!statSync(full).isDirectory()) continue;
    const index = join(full, 'index.md');
    if (existsSync(index)) out.push(full);
    else out.push(...walkSpecDirs(full));
  }
  return out;
}

function parseSpec(dir) {
  const indexPath = join(dir, 'index.md');
  const raw = readFileSync(indexPath, 'utf8');
  const frontmatter = raw.match(/^---\n([\s\S]*?)\n---/)?.[1];
  if (!frontmatter) return null;
  const meta = yaml.load(frontmatter);
  const prose = raw.replace(/^---\n[\s\S]*?\n---/, '').trim();
  const name = meta.component ?? meta.pattern ?? dir.split('/').at(-1);
  return {
    id: name,
    spec_path: relative(root, indexPath),
    meta,
    prose,
  };
}

function firstParagraph(prose) {
  const stripped = prose
    .replace(/^#.*$/gm, '')
    .replace(/^>.*$/gm, '')
    .replace(/\|.*\|/g, '')
    .trim();
  return stripped.split(/\n\s*\n/).find((p) => p.trim() && !p.trim().startsWith('**'))?.replace(/\s+/g, ' ').trim() ?? '';
}

function extractLine(prose, label) {
  const match = prose.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*([^\\n]+)`, 'i'));
  return match?.[1]?.trim() ?? '';
}

function normalizeChecks(checks = {}) {
  const keys = ['aria_correct', 'structure_correct', 'states_complete', 'tokens_valid', 'no_invented_styles'];
  return Object.fromEntries(keys.map((key) => [key, Boolean(checks[key])]));
}

function health(meta) {
  const checks = normalizeChecks(meta.checks);
  const checkScore = Object.values(checks).filter(Boolean).length / 5;
  const tokenScore = Math.min((meta.token_contract?.length ?? 0) / 10, 1);
  const stateScore = Math.min((meta.interaction_states?.length ?? 0) / 5, 1);
  const partsScore = Math.min(Object.keys(meta.semantic_parts ?? {}).length / 4, 1);
  const statusScore = meta.status === 'AI-Ready' ? 1 : meta.status === 'In progress' ? 0.5 : 0.25;
  return Math.round((checkScore * 0.4 + tokenScore * 0.2 + stateScore * 0.15 + partsScore * 0.1 + statusScore * 0.15) * 100);
}

function inferReviewNeeds(meta) {
  const needs = [];
  const checks = normalizeChecks(meta.checks);
  if (!checks.aria_correct || (meta.required_aria ?? []).length > 0) needs.push('a11y');
  if (!checks.states_complete || (meta.interaction_states ?? []).length > 3) needs.push('edge-states');
  if (!checks.no_invented_styles || !checks.tokens_valid) needs.push('token-drift');
  if ((meta.category ?? '').toLowerCase().includes('ai') || String(meta.sources?.react?.path ?? '').includes('/ai/')) needs.push('trust-copy');
  return [...new Set(needs)];
}

const specs = walkSpecDirs(specsDir).map(parseSpec).filter(Boolean).sort((a, b) => a.id.localeCompare(b.id));
const latestVerified = specs
  .map(({ meta }) => meta.last_verified)
  .filter(Boolean)
  .sort()
  .at(-1) ?? null;

const componentIntentMap = {
  generated_from_last_verified: latestVerified,
  source: 'specs/**/index.md',
  purpose: 'Clementine-native component intent map for agents. Generated from specs; do not hand-edit.',
  components: Object.fromEntries(specs.map(({ id, spec_path, meta, prose }) => [
    id,
    {
      status: meta.status ?? 'Unknown',
      category: meta.category ?? 'Component',
      intent: firstParagraph(prose),
      use_when: extractLine(prose, 'Do') || 'Use when the component spec and token contract match the product need.',
      dont_use_when: extractLine(prose, "Don.?t") || 'Do not use when another Clementine component has a more specific contract.',
      semantic_parts: Object.keys(meta.semantic_parts ?? {}),
      required_aria: meta.required_aria ?? [],
      interaction_states: meta.interaction_states ?? [],
      token_contract: meta.token_contract ?? [],
      patterns_used_in: meta.patterns_used_in ?? [],
      pages_used_in: meta.pages_used_in ?? [],
      sources: meta.sources ?? {},
      spec_path,
    },
  ])),
};

const tokenToComponents = {};
const patternToComponents = {};
const sourceToComponents = {};

for (const { id, meta } of specs) {
  for (const token of meta.token_contract ?? []) {
    tokenToComponents[token] ??= [];
    tokenToComponents[token].push(id);
  }
  for (const pattern of meta.patterns_used_in ?? []) {
    patternToComponents[pattern] ??= [];
    patternToComponents[pattern].push(id);
  }
  for (const source of Object.values(meta.sources ?? {})) {
    if (!source?.path) continue;
    sourceToComponents[source.path] ??= [];
    sourceToComponents[source.path].push(id);
  }
}

const knowledgeGraph = {
  generated_from_last_verified: componentIntentMap.generated_from_last_verified,
  source: 'specs/**/index.md',
  purpose: 'Impact graph for agent planning. Generated from Clementine spec frontmatter.',
  totals: {
    components: specs.length,
    ai_ready: specs.filter((spec) => spec.meta.status === 'AI-Ready').length,
    draft: specs.filter((spec) => spec.meta.status === 'Draft').length,
  },
  nodes: Object.fromEntries(specs.map(({ id, spec_path, meta }) => [
    id,
    {
      type: meta.category ?? 'Component',
      status: meta.status ?? 'Unknown',
      trust_health: health(meta),
      spec_path,
      code_path: meta.sources?.react?.path ?? null,
      story_path: meta.sources?.storybook?.path ?? null,
      token_file: meta.sources?.tokens?.component ?? null,
      tokens: meta.token_contract ?? [],
      parts: Object.keys(meta.semantic_parts ?? {}),
      states: meta.interaction_states ?? [],
      patterns: meta.patterns_used_in ?? [],
      pages: meta.pages_used_in ?? [],
      review_lenses: inferReviewNeeds(meta),
    },
  ])),
  edges: {
    token_to_components: tokenToComponents,
    pattern_to_components: patternToComponents,
    source_to_components: sourceToComponents,
  },
};

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'component-intent-map.json'), JSON.stringify(componentIntentMap, null, 2) + '\n');
writeFileSync(join(outDir, 'knowledge-graph.json'), JSON.stringify(knowledgeGraph, null, 2) + '\n');

console.log(`✔︎ agentic indexes: ${specs.length} specs → governance/agentic-indexes/`);
