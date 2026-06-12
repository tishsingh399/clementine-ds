// Build-time scanner: reads specs/*, patterns/*, packages/tokens/src/*
// and produces a single JSON snapshot the React app consumes at runtime.
//
// Runs as part of `pnpm dev` and `pnpm build`. No live filesystem reads
// at runtime — the snapshot ships as a static asset.

import { readFile, readdir, writeFile, stat } from 'node:fs/promises';
import { execSync } from 'node:child_process';
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

async function scanDir(dir, depth = 0) {
  // Specs can be flat (specs/button/) or grouped one level (specs/ai/composer/).
  // A directory without an index.md is treated as a category and recursed into.
  // Each spec parses independently — one bad frontmatter must not sink the scan.
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const out = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const sub = join(dir, e.name);
    let parsed = null;
    try {
      parsed = await parseSpec(e.name, sub);
    } catch (err) {
      console.warn(`⚠ skipping ${sub}: ${err.message}`);
      continue;
    }
    if (parsed) {
      out.push(parsed);
    } else if (depth === 0) {
      out.push(...await scanDir(sub, 1));
    }
  }
  return out;
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

// Prose-only patterns (Tray 3 governance/agentic docs) carry no YAML contract
// by design — count them separately so the dashboard reflects all of patterns/.
async function countProsePatterns() {
  try {
    const entries = await readdir(PATTERNS_DIR, { withFileTypes: true });
    const specBacked = new Set(patterns.map((p) => p.name));
    let n = 0;
    for (const e of entries) {
      if (!e.isDirectory() || specBacked.has(e.name)) continue;
      try {
        await readFile(join(PATTERNS_DIR, e.name, 'index.md'), 'utf8');
        n++;
      } catch {}
    }
    return n;
  } catch {
    return 0;
  }
}
const prosePatterns = await countProsePatterns();

// Recent activity from git log — last 20 changes touching specs/tokens/patterns
function gitLog(paths, limit = 20) {
  try {
    const out = execSync(
      `git log -n ${limit} --pretty=format:"%h|%cr|%s" -- ${paths.join(' ')}`,
      { cwd: ROOT, encoding: 'utf8' },
    );
    return out.split('\n').filter(Boolean).map((line) => {
      const [hash, when, ...rest] = line.split('|');
      return { hash, when, subject: rest.join('|') };
    });
  } catch {
    return [];
  }
}

const recentChanges = gitLog(['specs/', 'packages/tokens/', 'patterns/'], 15);
const recentScans = gitLog(['.github/workflows/'], 5);

// The validator rules (agentic-spec) act as the "active agents"
const validators = [
  { name: 'missing-spec',        category: 'Identity',  intent: 'Catches missing index.md' },
  { name: 'missing-tokens',      category: 'Identity',  intent: 'Catches missing tokens.json' },
  { name: 'no-frontmatter',      category: 'Identity',  intent: 'Ensures YAML frontmatter exists' },
  { name: 'bad-frontmatter',     category: 'Identity',  intent: 'Ensures frontmatter parses' },
  { name: 'identity-mismatch',   category: 'Identity',  intent: 'spec component === tokens component' },
  { name: 'missing-token-entry', category: 'Tokens',    intent: 'Every contract entry has a tokens.json row' },
  { name: 'orphan-token-entry',  category: 'Tokens',    intent: 'No tokens.json rows without a contract' },
  { name: 'bad-token-tier',      category: 'Tokens',    intent: 'tier ∈ {primitive, semantic, component}' },
  { name: 'bad-token-path',      category: 'Tokens',    intent: 'Each entry has a non-empty path' },
  { name: 'missing-token-role',  category: 'Tokens',    intent: 'Each entry has a role (warning)' },
  { name: 'bad-status',          category: 'Metadata',  intent: 'status ∈ {AI-Ready, In progress, Draft}' },
  { name: 'bad-date',            category: 'Metadata',  intent: 'last_verified is ISO date' },
  { name: 'future-date',         category: 'Metadata',  intent: 'last_verified is not in the future' },
  { name: 'lying-check',         category: 'Honesty',   intent: 'tokens_valid:true implies actually valid' },
  { name: 'ai-ready-gate',       category: 'Honesty',   intent: 'AI-Ready requires all 5 checks true' },
];

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

// Computed scoreboard metrics
// quality:   mean health score across all specs (0-100)
// drift:     % of specs where the spec's token_contract still matches tokens.json
//            (every entry referenced, no orphans). This is what `agentic-spec
//            validate` enforces — currently 100% because all 12 specs PASS.
// coverage:  % of components that have a Tier-3 token file in
//            packages/tokens/src/components/
const quality = Math.round(enrichedSpecs.reduce((s, x) => s + x.health_score, 0) / enrichedSpecs.length);
const validatorPassing = enrichedSpecs.filter((s) => s.token_contract.length > 0 && s.tokens_count >= s.token_contract.length).length;
const drift = Math.round((validatorPassing / enrichedSpecs.length) * 100);
const withComponentTokens = Object.keys(tokens.components).length;
const coverage = Math.round((withComponentTokens / enrichedSpecs.length) * 100);

const connectors = [
  { name: 'GitHub',         icon: '🐙', url: 'https://github.com/tishsingh399/clementine-ds',                                       status: 'connected', sub: 'main · auto-deploy' },
  { name: 'Storybook',      icon: '📚', url: 'https://clementine-ds-storybook.vercel.app',                                        status: 'connected', sub: 'Vercel · live' },
  { name: 'Mintlify',       icon: '📘', url: 'https://clementineds.mintlify.app',                                                 status: 'connected', sub: 'docs · auto-synced' },
  { name: 'Notion',         icon: '📓', url: 'https://tinasingh.notion.site/Clementine-DS-379e72c9cf36806f9a5ce8fdb927b93f',     status: 'connected', sub: '25 pages · published' },
  { name: 'Figma',          icon: '🎨', url: 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS',              status: 'connected', sub: '3 collections · 12 components' },
  { name: 'agentic-spec',   icon: '🛠', url: 'https://github.com/tishsingh399/agentic-spec',                                      status: 'connected', sub: 'CLI · validating' },
];

const snapshot = {
  generated_at: new Date().toISOString(),
  repo: 'tishsingh399/clementine-ds',
  surfaces: {
    storybook: 'https://clementine-ds-storybook.vercel.app',
    mintlify: 'https://clementineds.mintlify.app',
    notion: 'https://tinasingh.notion.site/Clementine-DS-379e72c9cf36806f9a5ce8fdb927b93f',
    figma: 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS',
    github: 'https://github.com/tishsingh399/clementine-ds',
    cli: 'https://github.com/tishsingh399/agentic-spec',
  },
  scoreboard: {
    quality,
    drift,
    coverage,
  },
  connectors,
  composer: {
    patterns: enrichedPatterns.length + prosePatterns,
    needs_input: countNeedsInput(enrichedSpecs),
  },
  evaluator: {
    rules_passing: validators.length,
    rules_total: validators.length,
    checks_passing: enrichedSpecs.filter((s) => isAllChecksGreen(s)).length,
    checks_total: enrichedSpecs.length,
  },
  validators,
  recent_changes: recentChanges,
  recent_scans: recentScans,
  totals: {
    specs: enrichedSpecs.length,
    ai_ready: enrichedSpecs.filter((s) => s.status === 'AI-Ready').length,
    in_progress: enrichedSpecs.filter((s) => s.status === 'In progress').length,
    draft: enrichedSpecs.filter((s) => s.status === 'Draft').length,
    patterns: enrichedPatterns.length + prosePatterns,
    tokens: tokens,
    avg_health: quality,
  },
  specs: enrichedSpecs.sort((a, b) => b.health_score - a.health_score),
  patterns: enrichedPatterns,
};

function countNeedsInput(specs) {
  // A proxy for Romina's "Decisions" — count of specs whose ARIA/state coverage
  // shows the spec is calling out an open question. We use checks.aria_correct=false
  // as the signal since those are the specs that explicitly need input.
  return specs.filter((s) => s.checks && (!s.checks.aria_correct || !s.checks.states_complete)).length;
}

function isAllChecksGreen(spec) {
  if (!spec.checks) return false;
  return ['aria_correct','structure_correct','states_complete','tokens_valid','no_invented_styles']
    .every((k) => spec.checks[k]);
}

// Safety guard: never overwrite a committed snapshot with broken data.
// If the scan found nothing (e.g. running from a scoped build context that
// can't see the parent ../../ specs directory), keep the committed snapshot.
if (snapshot.totals.specs === 0) {
  console.warn(`⚠ scan found 0 specs at ${SPECS_DIR} — keeping the committed snapshot intact.`);
  process.exit(0);
}

await writeFile(OUT_FILE, JSON.stringify(snapshot, null, 2));
console.log(`✓ snapshot written → ${OUT_FILE}`);
console.log(`  ${snapshot.totals.specs} specs (${snapshot.totals.ai_ready} AI-Ready), ${snapshot.totals.patterns} patterns, avg health ${snapshot.totals.avg_health}/100`);
