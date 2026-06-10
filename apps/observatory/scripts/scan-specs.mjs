// Build-time scanner: reads specs/*, patterns/*, packages/tokens/src/*
// and produces a single JSON snapshot the React app consumes at runtime.
//
// Runs as part of `pnpm dev` and `pnpm build`. No live filesystem reads
// at runtime — the snapshot ships as a static asset.

import { readFile, readdir, writeFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const SPECS_DIR = join(ROOT, 'specs');
const PATTERNS_DIR = join(ROOT, 'patterns');
const TOKENS_DIR = join(ROOT, 'packages', 'tokens', 'src');
const OUT_FILE = join(__dirname, '..', 'src', 'data', 'snapshot.json');

async function parseSpec(name, dir) {
  const indexPath = join(dir, 'index.md');
  const tokensPath = join(dir, 'tokens.json');
  let raw;
  try { raw = await readFile(indexPath, 'utf8'); }
  catch { return null; }

  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const frontmatter = yaml.load(m[1]);

  let tokens = null;
  try { tokens = JSON.parse(await readFile(tokensPath, 'utf8')); }
  catch {}

  return {
    name,
    component: frontmatter.component ?? frontmatter.pattern,
    status: frontmatter.status,
    last_verified: frontmatter.last_verified,
    category: frontmatter.category,
    required_aria: frontmatter.required_aria || [],
    semantic_parts: frontmatter.semantic_parts || {},
    token_contract: frontmatter.token_contract || [],
    interaction_states: frontmatter.interaction_states || [],
    checks: frontmatter.checks || {},
    sources: frontmatter.sources || {},
    patterns_used_in: frontmatter.patterns_used_in || [],
    pages_used_in: frontmatter.pages_used_in || [],
    tokens_count: tokens?.tokens?.length ?? 0,
    components_used: frontmatter.components_used || [],
  };
}

async function scanDir(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    const out = [];
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const sub = join(dir, e.name);
      const parsed = await parseSpec(e.name, sub);
      if (parsed) out.push(parsed);
    }
    return out;
  } catch {
    return [];
  }
}

async function scanTokens() {
  const out = { primitives: 0, semantic: 0, components: {} };
  try {
    const prims = JSON.parse(await readFile(join(TOKENS_DIR, 'primitives.json'), 'utf8'));
    out.primitives = countLeaves(prims);
  } catch {}
  try {
    const sem = JSON.parse(await readFile(join(TOKENS_DIR, 'semantic-light.json'), 'utf8'));
    out.semantic = countLeaves(sem);
  } catch {}
  try {
    const compDir = join(TOKENS_DIR, 'components');
    const files = await readdir(compDir);
    for (const f of files) {
      if (!f.endsWith('.json')) continue;
      const name = f.replace(/\.json$/, '');
      const data = JSON.parse(await readFile(join(compDir, f), 'utf8'));
      out.components[name] = countLeaves(data);
    }
  } catch {}
  return out;
}

function countLeaves(obj) {
  if (!obj || typeof obj !== 'object') return 0;
  if ('$value' in obj) return 1;
  let n = 0;
  for (const v of Object.values(obj)) n += countLeaves(v);
  return n;
}

function trustLevelFor(spec) {
  // Map a spec's status + checks to a trust level (0-5).
  // Mirrors TRUST-LEVELS.md.
  if (!spec.checks) return 0;
  const c = spec.checks;
  const allGreen = c.aria_correct && c.structure_correct && c.states_complete && c.tokens_valid && c.no_invented_styles;
  if (spec.status === 'AI-Ready' && allGreen) return 4;
  if (spec.status === 'AI-Ready') return 3;
  if (spec.status === 'In progress') return 2;
  if (spec.status === 'Draft' && spec.tokens_count > 0) return 1;
  return 0;
}

function healthScore(spec) {
  // 0-100. Weighted by gate completeness + token coverage + state coverage.
  if (!spec.checks) return 0;
  const checkScore = ['aria_correct', 'structure_correct', 'states_complete', 'tokens_valid', 'no_invented_styles']
    .reduce((s, k) => s + (spec.checks[k] ? 1 : 0), 0) / 5;
  const tokenScore = Math.min(spec.token_contract.length / 10, 1);
  const stateScore = Math.min(spec.interaction_states.length / 5, 1);
  const partsScore = Math.min(Object.keys(spec.semantic_parts).length / 4, 1);
  const status = spec.status === 'AI-Ready' ? 1 : spec.status === 'In progress' ? 0.5 : 0.25;
  const composite = (checkScore * 0.40 + tokenScore * 0.20 + stateScore * 0.15 + partsScore * 0.10 + status * 0.15);
  return Math.round(composite * 100);
}

const specs = await scanDir(SPECS_DIR);
const patterns = await scanDir(PATTERNS_DIR);
const tokens = await scanTokens();

const enrichedSpecs = specs.map((s) => ({
  ...s,
  trust_level: trustLevelFor(s),
  health_score: healthScore(s),
}));
const enrichedPatterns = patterns.map((p) => ({
  ...p,
  trust_level: trustLevelFor(p),
  health_score: healthScore(p),
}));

const snapshot = {
  generated_at: new Date().toISOString(),
  repo: 'tishsingh399/clementine-ds',
  surfaces: {
    storybook: 'https://clementine-ds-storybook.vercel.app',
    mintlify: 'https://clementineds.mintlify.app',
    notion: 'https://tinasingh.notion.site/Clementine-DS-379e72c9cf36806f9a5ce8fdb927b93f',
    figma: 'https://www.figma.com/design/MBr4guR2Xtfa92JJXS6472/Tina-DS-file-ANT',
    github: 'https://github.com/tishsingh399/clementine-ds',
    cli: 'https://github.com/tishsingh399/agentic-spec',
  },
  totals: {
    specs: enrichedSpecs.length,
    ai_ready: enrichedSpecs.filter((s) => s.status === 'AI-Ready').length,
    in_progress: enrichedSpecs.filter((s) => s.status === 'In progress').length,
    draft: enrichedSpecs.filter((s) => s.status === 'Draft').length,
    patterns: enrichedPatterns.length,
    tokens: tokens,
    avg_health: Math.round(enrichedSpecs.reduce((s, x) => s + x.health_score, 0) / enrichedSpecs.length),
  },
  specs: enrichedSpecs.sort((a, b) => b.health_score - a.health_score),
  patterns: enrichedPatterns,
};

await writeFile(OUT_FILE, JSON.stringify(snapshot, null, 2));
console.log(`✓ snapshot written → ${OUT_FILE}`);
console.log(`  ${snapshot.totals.specs} specs (${snapshot.totals.ai_ready} AI-Ready), ${snapshot.totals.patterns} patterns, avg health ${snapshot.totals.avg_health}/100`);
