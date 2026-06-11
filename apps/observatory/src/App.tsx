import snapshot from './data/snapshot.json';

interface Spec {
  name: string;
  component: string;
  status: string;
  last_verified: string;
  category: string;
  required_aria: string[];
  semantic_parts: Record<string, string>;
  token_contract: string[];
  interaction_states: string[];
  checks: Record<string, boolean>;
  patterns_used_in: string[];
  trust_level: number;
  health_score: number;
  tokens_count: number;
}

interface Connector {
  name: string;
  icon: string;
  url: string;
  status: string;
  sub: string;
}

interface Validator {
  name: string;
  category: string;
  intent: string;
}

interface RecentEvent {
  hash: string;
  when: string;
  subject: string;
}

type Snap = typeof snapshot & {
  specs: Spec[];
  patterns: Spec[];
  connectors: Connector[];
  validators: Validator[];
  recent_changes: RecentEvent[];
  recent_scans: RecentEvent[];
  scoreboard: { quality: number; drift: number; coverage: number };
  composer: { patterns: number; needs_input: number };
  evaluator: { rules_passing: number; rules_total: number; checks_passing: number; checks_total: number };
};
const data = snapshot as unknown as Snap;

const NAV = [
  { name: 'Overview',     icon: '01', href: '#overview',     active: true  },
  { name: 'Connectors',   icon: '02', href: '#connectors',   active: false },
  { name: 'Agents',       icon: '03', href: '#agents',       active: false },
  { name: 'Components',   icon: '04', href: '#components',   active: false },
  { name: 'Patterns',     icon: '05', href: '#patterns',     active: false },
  { name: 'Tokens',       icon: '06', href: '#tokens',       active: false },
  { name: 'Activity',     icon: '07', href: '#activity',     active: false },
  { name: 'Architecture', icon: '08', href: '#architecture', active: false },
];

function dateOnly(s: string) { return String(s).slice(0, 10); }

function StatusPill({ status }: { status: string }) {
  const cls = status === 'AI-Ready' ? 'ready' : status === 'In progress' ? 'progress' : 'draft';
  const text = status === 'AI-Ready' ? 'AI-Ready' : status === 'In progress' ? 'In progress' : 'Draft';
  return <span className={`status ${cls}`}>{text}</span>;
}

export function App() {
  const componentTokens = Object.values(data.totals.tokens.components).reduce((s, n) => s + n, 0);
  const totalTokens = data.totals.tokens.primitives + data.totals.tokens.semantic + componentTokens;
  const aiReadyPct = Math.round((data.totals.ai_ready / data.totals.specs) * 100);

  return (
    <div className="app-shell">
      <aside className="side-rail">
        <div className="brand-lockup">
          <span className="brand-mark">🍊</span>
          <div>
            <strong>Clementine</strong>
            <small>Observatory</small>
          </div>
        </div>

        <button className="workspace-switch" type="button">
          <span className="workspace-dot" />
          <div>
            <strong>tishsingh399</strong>
            <small>clementine-ds · main</small>
          </div>
          <span className="chevron">⌄</span>
        </button>

        <nav className="nav-list" aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.name} href={n.href} className={n.active ? 'active' : ''}>
              <span className="shell-icon">{n.icon}</span>
              <span>{n.name}</span>
            </a>
          ))}
        </nav>

        <div className="rail-footer">
          <span className="trust-chip">Trust · L3 Mid</span>
          <div className="rail-stat"><span>Specs</span><strong>{data.totals.specs}</strong></div>
          <div className="rail-stat"><span>AI-Ready</span><strong>{data.totals.ai_ready}/{data.totals.specs}</strong></div>
          <div className="rail-stat"><span>Patterns</span><strong>{data.totals.patterns}</strong></div>
          <div className="rail-stat"><span>Tokens</span><strong>{totalTokens}</strong></div>
        </div>
      </aside>

      <main className="main-stage">
        <header className="topbar">
          <div>
            <p className="section-kicker">Self-Healing Scoreboard · {new Date(data.generated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            <h1>Clementine, in one glance.</h1>
          </div>
          <div className="top-actions">
            <a href={data.surfaces.storybook}>🚀 Storybook</a>
            <a href={data.surfaces.mintlify}>📘 Mintlify</a>
            <a href={data.surfaces.notion}>📓 Notion</a>
            <a href={data.surfaces.figma}>📐 Figma</a>
            <a href={data.surfaces.github} className="primary-action">⌘ Repo</a>
          </div>
        </header>

        <section id="overview" className="scoreboard-panel">
          <div className="scoreboard-copy">
            <p className="panel-label">Scoreboard</p>
            <h2>Health, drift, coverage — calculated from the same files an AI agent reads.</h2>
            <p>Every metric below is computed at build time from the contract layer in <code>specs/</code>, <code>patterns/</code>, and <code>packages/tokens/</code>. No hand-tuned numbers.</p>
          </div>
          <div className="score-grid">
            <article>
              <span>Quality</span>
              <strong>{data.scoreboard.quality}</strong>
              <small>avg health · 100 max</small>
            </article>
            <article>
              <span>Validator</span>
              <strong>{data.scoreboard.drift}%</strong>
              <small>specs passing all rules</small>
            </article>
            <article>
              <span>Coverage</span>
              <strong>{data.scoreboard.coverage}%</strong>
              <small>components with Tier-3 tokens</small>
            </article>
            <article>
              <span>AI-Ready</span>
              <strong>{data.totals.ai_ready}/{data.totals.specs}</strong>
              <small>{aiReadyPct}% promoted from Draft</small>
            </article>
          </div>
        </section>

        <section id="architecture" className="architecture-board">
          <article className="loop-card" aria-label="Self-healing loop">
            <p className="loop-title">The self-healing loop</p>
            <div className="loop-visual">
              <span className="loop-step execute">Execute</span>
              <span className="loop-step monitor">Monitor</span>
              <span className="loop-step plan">Plan</span>
              <span className="loop-step analyze">Analyze</span>
              <span className="loop-step learn">Learn</span>
              <div className="knowledge-core">
                <div className="folder-tab" />
                <strong>Knowledge graph</strong>
                <small>Token taxonomy</small>
                <small>Governance rules</small>
                <small>Learning history</small>
              </div>
              <div className="signal-beam" />
              <span className="signal-pill">Signals</span>
            </div>
          </article>

          <article className="stack-card" aria-label="Agentic design system stack">
            <p className="stack-title">Agentic stack</p>
            <div className="layer-stack">
              <div className="layer top">Agentic DS</div>
              <div className="layer">Agentic orchestration</div>
              <div className="layer">Platform</div>
              <div className="layer">Locale · Personalization</div>
              <div className="layer">Intent</div>
            </div>
            <div className="foundation-tags">
              <span>Components</span>
              <span>Design tokens</span>
              <span>Brands · Themes</span>
              <span>Patterns</span>
            </div>
          </article>
        </section>

        <section id="connectors" className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-label">Active connectors</p>
              <h2>What's wired into the system</h2>
            </div>
            <a href={data.surfaces.github}>View all</a>
          </div>
          <div className="connector-grid">
            {data.connectors.map((c) => (
              <a key={c.name} className="connector-card" href={c.url}>
                <span style={{ fontSize: 22 }}>{c.icon}</span>
                <strong>{c.name}</strong>
                <span className={c.status === 'connected' ? 'online' : 'idle'}>{c.sub}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="content-grid">
          <div className="left-column">
            <section id="agents" className="panel">
              <div className="panel-header">
                <div>
                  <p className="panel-label">Active agents · {data.validators.length}</p>
                  <h2>Validator rules from <code>agentic-spec</code></h2>
                </div>
                <a href={data.surfaces.cli}>CLI ↗</a>
              </div>
              <div className="agent-list">
                {data.validators.map((v) => (
                  <article key={v.name} className="agent-row">
                    <div>
                      <strong><span className="agent-status" />{v.name}</strong>
                      <small>{v.intent}</small>
                    </div>
                    <div className="agent-meter">
                      <div className="meter"><span style={{ width: '100%' }} /></div>
                      <span>{v.category}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="components" className="panel">
              <div className="panel-header">
                <div>
                  <p className="panel-label">Components · sorted by health</p>
                  <h2>{data.specs.length} specs · {data.totals.ai_ready} AI-Ready</h2>
                </div>
                <a href={`${data.surfaces.github}/tree/main/specs`}>specs/ ↗</a>
              </div>
              <div className="component-table">
                {data.specs.map((s) => (
                  <article key={s.name} className="component-row">
                    <div>
                      <code>{s.component}</code>
                      <small style={{ color: 'var(--ink-muted)' }}>{dateOnly(s.last_verified)}</small>
                    </div>
                    <div className="row-health">
                      <div className="meter"><span style={{ width: `${s.health_score}%` }} /></div>
                      <span>{s.health_score}</span>
                    </div>
                    <StatusPill status={s.status} />
                    <span className="token-count">{s.token_contract.length} tok</span>
                  </article>
                ))}
              </div>
            </section>

            <section id="patterns" className="panel">
              <div className="panel-header">
                <div>
                  <p className="panel-label">Patterns · {data.patterns.length}</p>
                  <h2>Compositions of components</h2>
                </div>
                <a href={`${data.surfaces.github}/tree/main/patterns`}>patterns/ ↗</a>
              </div>
              <div className="component-table">
                {data.patterns.map((p) => (
                  <article key={p.name} className="component-row">
                    <div>
                      <code>{p.component}</code>
                      <small style={{ color: 'var(--ink-muted)' }}>{dateOnly(p.last_verified)}</small>
                    </div>
                    <div className="row-health">
                      <div className="meter"><span style={{ width: `${p.health_score}%` }} /></div>
                      <span>{p.health_score}</span>
                    </div>
                    <StatusPill status={p.status} />
                    <span className="token-count">{p.token_contract.length} tok</span>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="right-column">
            <section id="activity" className="panel compact">
              <div className="panel-header">
                <div>
                  <p className="panel-label">Recent changes</p>
                  <h2>Spec / token / pattern edits</h2>
                </div>
                <a href={`${data.surfaces.github}/commits/main`}>Git log ↗</a>
              </div>
              <div className="event-list">
                {data.recent_changes.slice(0, 8).map((e) => (
                  <article key={e.hash}>
                    <strong>{e.subject}</strong>
                    <span>{e.when}</span>
                  </article>
                ))}
              </div>
            </section>

            <section className="panel compact">
              <div className="panel-header">
                <div>
                  <p className="panel-label">Recent scans</p>
                  <h2>CI workflow runs</h2>
                </div>
                <a href={`${data.surfaces.github}/actions`}>Actions ↗</a>
              </div>
              <div className="event-list">
                <article><strong>CI · validate + build + type-check + size + a11y</strong><span>auto</span></article>
                <article><strong>CodeQL · security-and-quality</strong><span>weekly</span></article>
                <article><strong>Dependabot · npm + actions</strong><span>weekly</span></article>
                {data.recent_scans.slice(0, 3).map((e) => (
                  <article key={e.hash}><strong>{e.subject}</strong><span>{e.when}</span></article>
                ))}
              </div>
            </section>

            <section id="tokens" className="panel compact">
              <div className="panel-header">
                <div>
                  <p className="panel-label">Token cascade</p>
                  <h2>{totalTokens} total · 3 tiers</h2>
                </div>
                <a href={`${data.surfaces.github}/tree/main/packages/tokens`}>tokens/ ↗</a>
              </div>
              <div className="token-cascade">
                <article>
                  <div>
                    <strong>{data.totals.tokens.primitives}</strong>
                  </div>
                  <div>
                    <span>Tier 1 — Primitives</span>
                    <small>raw scales · references nothing</small>
                  </div>
                </article>
                <article>
                  <div>
                    <strong>{data.totals.tokens.semantic}</strong>
                  </div>
                  <div>
                    <span>Tier 2 — Semantic</span>
                    <small>intent · Light + Dark modes</small>
                  </div>
                </article>
                <article>
                  <div>
                    <strong>{componentTokens}</strong>
                  </div>
                  <div>
                    <span>Tier 3 — Component</span>
                    <small>per-component · cascades from semantic</small>
                  </div>
                </article>
              </div>
            </section>
          </div>
        </section>

        <footer className="app-footer">
          <span>{data.repo} · generated {new Date(data.generated_at).toLocaleString('en-US')}</span>
          <span>Built with the same contract an AI agent reads.</span>
        </footer>
      </main>
    </div>
  );
}
