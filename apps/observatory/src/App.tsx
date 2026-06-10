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
  sources: Record<string, unknown>;
  patterns_used_in: string[];
  trust_level: number;
  health_score: number;
  tokens_count: number;
}

type Snap = typeof snapshot & { specs: Spec[]; patterns: Spec[] };
const data = snapshot as unknown as Snap;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: 'numeric',
  });
}

function StatusPill({ status }: { status: string }) {
  const cls = status === 'AI-Ready' ? 'ai-ready' : status === 'In progress' ? 'in-progress' : 'draft';
  return <span className={`status-pill ${cls}`}>{status}</span>;
}

function TrustPips({ level }: { level: number }) {
  return (
    <div className="trust" title={`Trust level ${level}/5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className={`pip ${i < level ? 'on' : ''}`} />
      ))}
    </div>
  );
}

function HealthBar({ score }: { score: number }) {
  const cls = score >= 80 ? '' : score >= 50 ? 'med' : 'low';
  return (
    <div className="health-bar">
      <div className="track"><div className={`fill ${cls}`} style={{ width: `${score}%` }} /></div>
      <span className="score">{score}</span>
    </div>
  );
}

export function App() {
  const tokenTotal = data.totals.tokens.primitives + data.totals.tokens.semantic
    + Object.values(data.totals.tokens.components).reduce((s, n) => s + n, 0);
  const componentTokensSum = Object.values(data.totals.tokens.components).reduce((s, n) => s + n, 0);

  return (
    <div className="app">
      <header className="hero">
        <div className="eyebrow">Clementine · Observatory 🍊</div>
        <h1 className="hed">A live look at <em>system health</em>.</h1>
        <p className="deck">
          Spec status, token coverage, trust levels — generated at build time from the same files an
          AI agent reads. Drift is mechanical to detect when every component publishes a closed contract.
        </p>
        <div className="surfaces">
          <a href={data.surfaces.github}>📦 GitHub</a>
          <a href={data.surfaces.storybook}>🚀 Storybook</a>
          <a href={data.surfaces.mintlify}>📘 Mintlify</a>
          <a href={data.surfaces.notion}>📓 Notion</a>
          <a href={data.surfaces.figma}>📐 Figma</a>
          <a href={data.surfaces.cli}>🛠 CLI</a>
        </div>
      </header>

      <section className="section">
        <div className="section-header">
          <h2>System health</h2>
          <span className="meta">Generated {formatDate(data.generated_at)}</span>
        </div>
        <div className="stats">
          <div className="stat accent">
            <div className="label">Avg health</div>
            <div className="value">{data.totals.avg_health}</div>
            <div className="detail">across {data.totals.specs} specs · 100 max</div>
          </div>
          <div className="stat">
            <div className="label">AI-Ready specs</div>
            <div className="value">{data.totals.ai_ready}/{data.totals.specs}</div>
            <div className="detail">{Math.round(data.totals.ai_ready / data.totals.specs * 100)}% promoted from Draft</div>
          </div>
          <div className="stat">
            <div className="label">Tokens</div>
            <div className="value">{tokenTotal}</div>
            <div className="detail">{data.totals.tokens.primitives} primitive · {data.totals.tokens.semantic} semantic · {componentTokensSum} component</div>
          </div>
          <div className="stat">
            <div className="label">Patterns</div>
            <div className="value">{data.totals.patterns}</div>
            <div className="detail">compositions of components with their own specs</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Components</h2>
          <span className="meta">sorted by health · trust 0–5</span>
        </div>
        <div className="table">
          <div className="row head">
            <span className="col"></span>
            <span className="col">Component</span>
            <span className="col">Status</span>
            <span className="col">Trust</span>
            <span className="col">Health</span>
            <span className="col" style={{ textAlign: 'right' }}>Tokens</span>
            <span className="col" style={{ textAlign: 'right' }}>States</span>
            <span className="col" style={{ textAlign: 'right' }}>ARIA</span>
            <span className="col" style={{ textAlign: 'right' }}>Verified</span>
          </div>
          {data.specs.map((s) => (
            <div className="row" key={s.name}>
              <span style={{ fontSize: 18 }}>{s.status === 'AI-Ready' ? '✅' : s.status === 'In progress' ? '🟡' : '⚪'}</span>
              <span className="name"><code>{s.component}</code></span>
              <span><StatusPill status={s.status} /></span>
              <span><TrustPips level={s.trust_level} /></span>
              <span><HealthBar score={s.health_score} /></span>
              <span className="num">{s.token_contract.length}</span>
              <span className="num">{s.interaction_states.length}</span>
              <span className="num">{s.required_aria.length}</span>
              <span className="num mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{String(s.last_verified).slice(0, 10)}</span>
            </div>
          ))}
        </div>
      </section>

      {data.patterns.length > 0 && (
        <section className="section">
          <div className="section-header">
            <h2>Patterns</h2>
            <span className="meta">compositions of components</span>
          </div>
          <div className="table">
            <div className="row head">
              <span className="col"></span>
              <span className="col">Pattern</span>
              <span className="col">Status</span>
              <span className="col">Trust</span>
              <span className="col">Health</span>
              <span className="col" style={{ textAlign: 'right' }}>Tokens</span>
              <span className="col" style={{ textAlign: 'right' }}>States</span>
              <span className="col" style={{ textAlign: 'right' }}>ARIA</span>
              <span className="col" style={{ textAlign: 'right' }}>Verified</span>
            </div>
            {data.patterns.map((p) => (
              <div className="row" key={p.name}>
                <span style={{ fontSize: 18 }}>{p.status === 'AI-Ready' ? '✅' : '🟡'}</span>
                <span className="name"><code>{p.component}</code></span>
                <span><StatusPill status={p.status} /></span>
                <span><TrustPips level={p.trust_level} /></span>
                <span><HealthBar score={p.health_score} /></span>
                <span className="num">{p.token_contract.length}</span>
                <span className="num">{p.interaction_states.length}</span>
                <span className="num">{p.required_aria.length}</span>
                <span className="num mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{String(p.last_verified).slice(0, 10)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="section-header">
          <h2>Token cascade</h2>
          <span className="meta">primitive → semantic → component</span>
        </div>
        <div className="token-grid">
          <div className="token-card">
            <div className="tier">tier 1 — primitives</div>
            <div className="big">{data.totals.tokens.primitives}</div>
            <div className="label">raw scales</div>
            <div className="desc">Color scales, radius, spacing, shadow, typography. References nothing.</div>
          </div>
          <div className="token-card">
            <div className="tier">tier 2 — semantic</div>
            <div className="big">{data.totals.tokens.semantic}</div>
            <div className="label">intent tokens</div>
            <div className="desc">action.primary, surface.elevated, focus.ring. Two modes (Light + Dark) share the vocabulary.</div>
          </div>
          <div className="token-card">
            <div className="tier">tier 3 — component</div>
            <div className="big">{componentTokensSum}</div>
            <div className="label">per-component bindings</div>
            <div className="desc">button.bg.default, badge.bg.success. Cascades through semantic, never references primitives directly.</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Knowledge graph</h2>
          <span className="meta">cascade dependencies, one-way</span>
        </div>
        <div className="graph">
          <div className="tier-row">
            <span className="tier-label">primitives</span>
            <div className="nodes">
              <span className="node">color</span>
              <span className="node">radius</span>
              <span className="node">spacing</span>
              <span className="node">shadow</span>
              <span className="node">typography</span>
            </div>
          </div>
          <div className="cascade-arrow">↑ references</div>
          <div className="tier-row">
            <span className="tier-label">semantic</span>
            <div className="nodes">
              <span className="node info">action</span>
              <span className="node info">surface</span>
              <span className="node info">text</span>
              <span className="node info">border</span>
              <span className="node info">focus</span>
              <span className="node info">feedback</span>
              <span className="node info">risk</span>
            </div>
          </div>
          <div className="cascade-arrow">↑ references</div>
          <div className="tier-row">
            <span className="tier-label">components</span>
            <div className="nodes">
              {data.specs.map((s) => (
                <span key={s.name} className="node accent">{s.component}</span>
              ))}
            </div>
          </div>
          <div className="cascade-arrow">↑ composes</div>
          <div className="tier-row">
            <span className="tier-label">patterns</span>
            <div className="nodes">
              {data.patterns.map((p) => (
                <span key={p.name} className="node success">{p.component}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="foot">
        <span>Built from <a href={data.surfaces.github}>{data.repo}</a></span>
        <span>Snapshot regenerated on every build</span>
      </footer>
    </div>
  );
}
