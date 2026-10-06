#!/usr/bin/env node
/**
 * verify-specs.mjs
 *
 * `last_verified` used to be a date someone typed. Nothing re-checked it, so
 * by October every spec was over 90 days old and the strict honesty gate
 * failed, which in turn stopped the nightly loop from posting its report.
 * Bumping the dates would have hidden the problem. This script re-verifies
 * instead: a spec's date moves only when the evidence passes for it, on the
 * commit being checked, and the spec records what was checked.
 *
 * A spec is re-verified when ALL of these hold for it:
 *   contract        agentic-spec validate passes for the spec
 *   honesty         check-spec-honesty finds nothing but staleness for it
 *   token-parity    every contract token resolves (parity-report, 100%)
 *   runtime-tokens  every component token the code uses is in its contract
 *   painted-dom     the nightly painted-DOM run on THIS commit matched 100%
 *                   and raised no state warning outside the allowlist
 *
 * painted-dom needs a browser, so it comes from the nightly DOM-parity run's
 * report (--dom <file> --dom-commit <sha>). If that report is missing or was
 * made on another commit, components it measures are NOT re-verified: no
 * evidence, no new date. The few components that run has no default story
 * for are verified on the static evidence alone, and say so.
 *
 * Allowlisted state warnings are known, documented gaps, not passes. They do
 * not block re-verification (the allowlist is where a human accepted them),
 * but the spec records how many as `verified_gaps`, so a clean date never
 * reads as "every state proven".
 *
 * Written into the frontmatter of each re-verified spec:
 *   last_verified:   YYYY-MM-DD
 *   verified_commit: <short sha>
 *   verified_by:     [contract, honesty, token-parity, runtime-tokens, painted-dom]
 *   verified_gaps:   N            (only when N > 0)
 * and the date inside `ds_version: … (YYYY-MM-DD verified)`.
 *
 * Every spec is checked on every run, but a passing spec's date only moves
 * once it is --refresh-days old (default 30). Without that, the nightly loop
 * would re-stamp all specs every night, because each merged loop PR is a new
 * commit. A failing spec is reported every run whatever its date.
 *
 * This is machine verification of the code against its contract. It is not a
 * design review against Figma; that stays a human job.
 *
 * Usage:
 *   node scripts/verify-specs.mjs [--dom <report.json> --dom-commit <sha>]
 *                                 [--refresh-days 30] [--dry-run]
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const dryRun = args.includes('--dry-run');
const refreshDays = Number(opt('--refresh-days') ?? 30);
const today = new Date().toISOString().slice(0, 10);
const head = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
const short = head.slice(0, 8);

const run = (cmd, cmdArgs) =>
  spawnSync(cmd, cmdArgs, { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

// ── specs ───────────────────────────────────────────────────────────────────
function findSpecs(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...findSpecs(full));
    else if (entry === 'index.md') out.push(full);
  }
  return out;
}
const specFiles = findSpecs(join(root, 'specs'));
const nameOf = (md) => /^component:\s*(.+)$/m.exec(md)?.[1].trim();
const specs = specFiles.map((file) => {
  const md = readFileSync(file, 'utf8');
  return { file, md, name: nameOf(md) ?? dirname(file).split('/').pop() };
});

// ── evidence: contract (agentic-spec) ───────────────────────────────────────
const contractOut = run('npx', ['-y', 'github:tishsingh399/agentic-spec', 'validate', ...specs.map((s) => dirname(s.file))]);
const contractPass = new Set(
  [...`${contractOut.stdout}\n${contractOut.stderr}`.matchAll(/^PASS (\S+)/gm)].map((m) => m[1]),
);

// ── evidence: honesty (everything except staleness) ─────────────────────────
const honestyOut = run('node', ['scripts/check-spec-honesty.mjs']);
const honestyFail = new Set();
for (const line of `${honestyOut.stdout}\n${honestyOut.stderr}`.split('\n')) {
  const m = /^\s*(?:⚠︎|✗)\s+([^:]+):\s*(.*)$/.exec(line);
  if (m && !/last_verified/.test(m[2])) honestyFail.add(m[1].trim());
}

// ── evidence: token parity ──────────────────────────────────────────────────
run('node', ['scripts/parity-report.mjs']);
const parityFile = join(root, 'apps/observatory/parity-report.json');
const tokenParity = new Map(
  existsSync(parityFile)
    ? JSON.parse(readFileSync(parityFile, 'utf8')).specs.map((s) => [s.name, s.parity])
    : [],
);

// ── evidence: runtime tokens ────────────────────────────────────────────────
const runtimeOut = run('node', ['scripts/check-runtime-token-membership.mjs']);
const runtimeFail = new Set(
  [...`${runtimeOut.stdout}\n${runtimeOut.stderr}`.matchAll(/not in specs\/([^/]+)\/index\.md/g)].map((m) => m[1]),
);

// ── evidence: painted DOM (nightly run on this commit only) ────────────────
const domPath = opt('--dom');
const domCommit = opt('--dom-commit');
let dom = null;
let domNote;
if (!domPath || !existsSync(domPath)) domNote = 'no painted-DOM report given';
else if (!domCommit || !(head.startsWith(domCommit) || domCommit.startsWith(short))) domNote = `painted-DOM report is from ${domCommit ?? 'an unknown commit'}, not ${short}`;
else dom = JSON.parse(readFileSync(domPath, 'utf8'));

// Same keys as parity-dom.mjs, so "allowed" means exactly what that gate means.
const allowlistFile = join(root, 'governance/parity-dom-state-allowlist.json');
const allowlist = existsSync(allowlistFile)
  ? JSON.parse(readFileSync(allowlistFile, 'utf8'))
  : { unwiredStates: [], disabledNoStory: [] };
const unwiredKey = (e) =>
  [e.component, e.mode, e.state, e.reason, [...(e.tokens ?? [])].sort().join(',')].join('|');
const allowedUnwired = new Set(allowlist.unwiredStates.map(unwiredKey));
const allowedNoStory = new Set(allowlist.disabledNoStory.map((e) => e.component));
const domByComponent = new Map((dom?.components ?? []).map((c) => [c.component, c]));
const noDisabledStory = new Set(dom?.summary?.disabledNoStory ?? []);

function domVerdict(name) {
  if (!dom) return { ok: false, why: domNote };
  const c = domByComponent.get(name);
  if (!c) return { ok: true, evidence: false };
  if (c.checked !== c.matched) return { ok: false, why: `painted DOM ${c.matched}/${c.checked}` };
  const unwired = (c.unwiredStates ?? []).map((u) => ({ ...u, component: name }));
  const outside = unwired.filter((u) => !allowedUnwired.has(unwiredKey(u)));
  if (noDisabledStory.has(name) && !allowedNoStory.has(name)) outside.push({ state: 'disabled' });
  if (outside.length) return { ok: false, why: 'state warning(s) outside the allowlist' };
  return { ok: true, evidence: true, gaps: unwired.length + (noDisabledStory.has(name) ? 1 : 0) };
}

// ── verdicts ────────────────────────────────────────────────────────────────
const verified = [];
const notVerified = [];
for (const s of specs) {
  const reasons = [];
  const by = [];
  if (contractPass.has(s.name)) by.push('contract');
  else reasons.push('contract check did not pass');
  if (!honestyFail.has(s.name)) by.push('honesty');
  else reasons.push('honesty check has findings');
  if (tokenParity.get(s.name) === 100) by.push('token-parity');
  else reasons.push(`token parity ${tokenParity.get(s.name) ?? 'missing'}`);
  if (!runtimeFail.has(s.name)) by.push('runtime-tokens');
  else reasons.push('code uses tokens outside the contract');
  const d = domVerdict(s.name);
  let gaps = 0;
  if (d.ok && d.evidence) {
    by.push('painted-dom');
    gaps = d.gaps;
  } else if (!d.ok) reasons.push(d.why);
  (reasons.length ? notVerified : verified).push({ ...s, by, gaps, reasons });
}

// ── write ───────────────────────────────────────────────────────────────────
function stamp(md, by, gaps) {
  const [, fm, rest] = /^---\n([\s\S]*?)\n---([\s\S]*)$/.exec(md);
  let out = fm
    .replace(/^last_verified:.*$/m, `last_verified: ${today}`)
    .replace(/^(ds_version:.*\()\d{4}-\d{2}-\d{2}( verified\))/m, `$1${today}$2`)
    .replace(/^verified_(commit|by|gaps):.*\n?/gm, '');
  const lines = [`verified_commit: ${short}`, `verified_by: [${by.join(', ')}]`];
  if (gaps > 0) lines.push(`verified_gaps: ${gaps}`);
  out = out.replace(/^(last_verified:.*)$/m, `$1\n${lines.join('\n')}`);
  return `---\n${out}\n---${rest}`;
}

const ageDays = (md) => {
  const lv = /^last_verified:\s*(\S+)/m.exec(md)?.[1];
  return lv ? (Date.parse(today) - Date.parse(lv)) / 86_400_000 : Infinity;
};
const due = verified.filter((v) => !/^verified_commit:/m.test(v.md) || ageDays(v.md) >= refreshDays);
if (!dryRun) for (const v of due) writeFileSync(v.file, stamp(v.md, v.by, v.gaps));

const staticOnly = verified.filter((v) => !v.by.includes('painted-dom'));
console.log(
  `verify-specs @ ${short}: ${verified.length} pass, ${notVerified.length} not re-verified, ${due.length} date(s) moved` +
    (dom ? ` (painted-DOM evidence for ${domByComponent.size})` : ` (${domNote})`) +
    (dryRun ? ' [dry run, nothing written]' : ''),
);
if (staticOnly.length) console.log(`  static evidence only (no painted-DOM story): ${staticOnly.map((v) => v.name).join(', ')}`);
const withGaps = verified.filter((v) => v.gaps > 0);
if (withGaps.length) console.log(`  re-verified with tracked gaps: ${withGaps.length} spec(s), ${withGaps.reduce((n, v) => n + v.gaps, 0)} allowlisted state gap(s)`);
const byReason = new Map();
for (const v of notVerified) for (const r of v.reasons) byReason.set(r, [...(byReason.get(r) ?? []), v.name]);
for (const [r, names] of byReason) console.log(`  not re-verified — ${r}: ${names.slice(0, 8).join(', ')}${names.length > 8 ? ` (+${names.length - 8})` : ''}`);
