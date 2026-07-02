import { useMemo, useState, type ReactNode } from 'react';
import {
  Alert,
  Badge,
  Button,
  ConfidenceMeter,
  Message,
  Switch,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  TextInput,
  ToolCallCard,
} from '@clementine-ds/ui';
import snapshot from './data/snapshot.json';
import diagramTokenPath from '../../../docs/article/diagram-1-token-path.png';
import diagramMirrorVsTest from '../../../docs/article/diagram-2-mirror-vs-test.png';
import diagramPitfalls from '../../../docs/article/diagram-3-pitfalls.png';
import diagramGovernanceLoop from '../../../docs/article/governance-loop.png';

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

type Snap = typeof snapshot & {
  specs: Spec[];
  patterns: Spec[];
  connectors: Connector[];
  validators: Validator[];
  scoreboard: { quality: number; drift: number; coverage: number };
  surfaces: Record<string, string>;
  totals: {
    specs: number;
    ai_ready: number;
    patterns: number;
    tokens: { primitives: number; semantic: number; components: Record<string, number> };
  };
};

type PlaygroundId =
  | 'button'
  | 'text-input'
  | 'badge'
  | 'switch'
  | 'alert'
  | 'tabs'
  | 'message'
  | 'tool-call-card'
  | 'confidence-meter';

type PlaygroundItem = {
  id: PlaygroundId;
  label: string;
  tray: string;
  proof: string;
  variants: string[];
  render: (variant: string) => ReactNode;
};

type StoryPanel = {
  id: string;
  label: string;
  headline: string;
  image: string;
  caption: string;
  placement: string;
  proof: string;
};

const data = snapshot as unknown as Snap;

const COMPONENT_PROOF = [
  'Spec frontmatter declares parts, states, ARIA, and source files.',
  'tokens.json closes the allowed component-token list.',
  'Theme resolves component -> semantic -> primitive at runtime.',
  'Validator catches drift before a broken component ships.',
];

const TOKEN_SWATCHES = {
  primitives: [
    ['ORANGE-400', 'color.orange.4', '#FB923C'],
    ['ORANGE-500', 'color.orange.5', '#F97316'],
    ['ORANGE-600', 'color.orange.6', '#EA580C'],
    ['ORANGE-700', 'color.orange.7', '#C2410C'],
    ['ORANGE-800', 'color.orange.8', '#9A3412'],
  ],
  atmosphere: [
    ['BLUE-500', 'color.blue.5', '#3B82F6'],
    ['BLUE-700', 'color.blue.7', '#1D4ED8'],
  ],
  accent: [
    ['RED-500', 'color.red.5', '#EF4444'],
    ['RED-600', 'color.red.6', '#DC2626'],
  ],
};

const GOVERNANCE_SIGNALS = [
  {
    label: 'Watch',
    value: 'drift + a11y + stale specs',
    detail: 'CI reads the same contracts the playground shows, so drift becomes a visible event instead of folklore.',
  },
  {
    label: 'Diagnose',
    value: 'real issue or noise',
    detail: 'Rules warn first when confidence is lower, which keeps the system strict without teaching teams to ignore it.',
  },
  {
    label: 'Fix',
    value: 'back as a PR',
    detail: 'The repair path is explicit: update component token, spec contract, runtime theme, and Storybook together.',
  },
  {
    label: 'Learn',
    value: 'new rule, less next time',
    detail: 'Repeated misses graduate into validator rules, so the design system gets harder to break over time.',
  },
];

const STORY_PANELS: StoryPanel[] = [
  {
    id: 'pitfalls',
    label: 'Failure modes',
    headline: 'The failures are quiet before they are expensive.',
    image: diagramPitfalls,
    caption: 'Five failure modes that pass shallow automation: invented tokens, missing states, stale specs, ARIA drift, and false confidence.',
    placement: 'Use after the article opening, where the problem is named.',
    proof: 'Clementine catches these with closed token contracts, state requirements, spec freshness checks, and independent validation.',
  },
  {
    id: 'token-path',
    label: 'Token path',
    headline: 'A token should travel through a contract, not through a guess.',
    image: diagramTokenPath,
    caption: 'Component paint resolves through component tokens, semantic intent, and primitive values before it reaches the browser.',
    placement: 'Use when explaining the 3-tier token cascade.',
    proof: 'The playground exposes the same packet: spec, tokens, source file, states, and validator route.',
  },
  {
    id: 'mirror-test',
    label: 'Honesty check',
    headline: 'A checker that grades itself is a mirror, not proof.',
    image: diagramMirrorVsTest,
    caption: 'Self-reported checks become useful only when an external verifier compares the claim against code and runtime output.',
    placement: 'Use in the section about spec honesty and false positives.',
    proof: 'agentic-spec separates the agent claim from the validator verdict, so the model cannot approve its own work.',
  },
  {
    id: 'governance',
    label: 'Governance loop',
    headline: 'The system watches, diagnoses, fixes, and learns.',
    image: diagramGovernanceLoop,
    caption: 'Signals feed a governance loop around the design system: watch drift, diagnose noise, fix through PR, and learn a new rule.',
    placement: 'Use as the closing update: this is what changed after Clementine matured.',
    proof: 'The nightly painted-DOM check now verifies the contract automatically, so the public claim has a running proof behind it.',
  },
];

const playground: PlaygroundItem[] = [
  {
    id: 'button',
    label: 'Button',
    tray: 'Tray 2 / Actions',
    proof: 'A simple action still carries hover, active, disabled, loading, focus, and destructive contracts.',
    variants: ['filled', 'outline', 'subtle', 'loading', 'destructive'],
    render: (variant) => (
      <div className="preview-row">
        <Button color={variant === 'destructive' ? 'red' : 'blue'} variant={variant === 'loading' ? 'filled' : variant}>
          {variant === 'destructive' ? 'Delete token' : 'Validate contract'}
        </Button>
        <Button variant="outline" disabled={variant === 'loading'}>
          Secondary
        </Button>
        <Button loading={variant === 'loading'}>Sync</Button>
      </div>
    ),
  },
  {
    id: 'text-input',
    label: 'TextInput',
    tray: 'Tray 2 / Inputs',
    proof: 'Inputs prove the named-part model: root, label, input, helper, error, and focus all stay token-bound.',
    variants: ['default', 'with error', 'disabled'],
    render: (variant) => (
      <TextInput
        label="Component token"
        placeholder="button.bg.default"
        description={variant === 'default' ? 'Closed contracts prevent invented token names.' : undefined}
        error={variant === 'with error' ? 'Token must exist in packages/tokens/src/components/button.json' : undefined}
        disabled={variant === 'disabled'}
      />
    ),
  },
  {
    id: 'badge',
    label: 'Badge',
    tray: 'Tray 7 / Trust',
    proof: 'Risk language is standardized, so agentic surfaces can communicate status without improvising.',
    variants: ['low', 'medium', 'high', 'critical'],
    render: (variant) => (
      <div className="preview-row">
        <Badge risk={variant as 'low' | 'medium' | 'high' | 'critical'}>{variant} risk</Badge>
        <Badge color="green" variant="light">AI-Ready</Badge>
        <Badge color="orange" variant="light">Needs review</Badge>
      </div>
    ),
  },
  {
    id: 'switch',
    label: 'Switch',
    tray: 'Tray 5 / Behavior',
    proof: 'Stateful controls expose interaction states as contract data instead of hidden implementation detail.',
    variants: ['on', 'off', 'disabled'],
    render: (variant) => (
      <div className="switch-stack">
        <Switch label="Use component-tier tokens" checked={variant !== 'off'} disabled={variant === 'disabled'} readOnly />
        <Switch label="Fail build on drift" checked readOnly />
      </div>
    ),
  },
  {
    id: 'alert',
    label: 'Alert',
    tray: 'Tray 6 / Language',
    proof: 'System feedback is governed copy plus governed visuals, which matters when AI output is uncertain.',
    variants: ['info', 'warning', 'error'],
    render: (variant) => (
      <Alert color={variant === 'error' ? 'red' : variant === 'warning' ? 'orange' : 'blue'} title="Contract check">
        {variant === 'error'
          ? 'This component is trying to use a token outside its contract.'
          : 'All declared parts and interaction states are accounted for.'}
      </Alert>
    ),
  },
  {
    id: 'tabs',
    label: 'Tabs',
    tray: 'Tray 3 / Patterns',
    proof: 'Patterns can compose components while still pointing back to the source contracts underneath.',
    variants: ['contract', 'runtime', 'figma'],
    render: (variant) => (
      <Tabs defaultValue={variant}>
        <TabsList>
          <TabsTab value="contract">Contract</TabsTab>
          <TabsTab value="runtime">Runtime</TabsTab>
          <TabsTab value="figma">Figma</TabsTab>
        </TabsList>
        <TabsPanel value="contract" pt="sm">Spec and token files define the allowed surface.</TabsPanel>
        <TabsPanel value="runtime" pt="sm">The Clementine theme emits matching CSS variables.</TabsPanel>
        <TabsPanel value="figma" pt="sm">Variables mirror component-tier bindings for visual parity.</TabsPanel>
      </Tabs>
    ),
  },
  {
    id: 'message',
    label: 'Message',
    tray: 'Tray 4 / AI Surface',
    proof: 'Clementine includes AI-native components, not just generic SaaS primitives with a chat wrapper.',
    variants: ['assistant', 'user', 'system'],
    render: (variant) => (
      <div className="message-preview">
        <Message role={variant as 'assistant' | 'user' | 'system'} authorName="Clementine" timestamp="Now">
          {variant === 'user'
            ? 'Build a screen, but only use valid Clementine tokens.'
            : 'I read the spec first, then bind the component to its declared token contract.'}
        </Message>
      </div>
    ),
  },
  {
    id: 'tool-call-card',
    label: 'ToolCallCard',
    tray: 'Tray 4 / AI Surface',
    proof: 'Agent behavior becomes inspectable: tool name, args, status, and result are part of the interface.',
    variants: ['running', 'success', 'error'],
    render: (variant) => (
      <ToolCallCard
        name="validate:contract"
        status={variant as 'running' | 'success' | 'error'}
        defaultOpen
        args={{ component: 'button', gate: 'token_contract' }}
        result={variant === 'error' ? '1 invented token found.' : 'All declared tokens resolve through the cascade.'}
      />
    ),
  },
  {
    id: 'confidence-meter',
    label: 'ConfidenceMeter',
    tray: 'Tray 8 / Feedback',
    proof: 'Evaluation surfaces make uncertainty explicit with labels, not color alone.',
    variants: ['high', 'medium', 'low'],
    render: (variant) => <ConfidenceMeter level={variant as 'high' | 'medium' | 'low'} />,
  },
];

function findSpec(id: string) {
  return data.specs.find((spec) => spec.component === id || spec.name === id);
}

function compactDate(value: string) {
  return String(value).slice(0, 10);
}

function AppMetric({ label, value, detail }: { label: string; value: string | number; detail: string }) {
  return (
    <article className="metric-tile">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}

function StoryMode() {
  const [activeId, setActiveId] = useState(STORY_PANELS[0]?.id ?? 'pitfalls');
  const active = STORY_PANELS.find((panel) => panel.id === activeId) ?? STORY_PANELS[0];

  if (!active) {
    return null;
  }

  return (
    <section id="story" className="story-section">
      <div className="section-heading narrow">
        <p className="eyebrow">Article mode</p>
        <h2>See the narrative assets inside the product.</h2>
        <p>
          These are the diagrams now landed in the repo for Medium, Notion, and launch posts. The playground shows where each one fits and what it proves.
        </p>
      </div>

      <div className="story-board">
        <div className="story-tabs" role="tablist" aria-label="Article diagrams">
          {STORY_PANELS.map((panel) => (
            <button
              key={panel.id}
              id={`story-tab-${panel.id}`}
              type="button"
              role="tab"
              aria-controls={`story-panel-${panel.id}`}
              aria-selected={panel.id === active.id}
              className={panel.id === active.id ? 'is-active' : ''}
              onClick={() => setActiveId(panel.id)}
            >
              <span>{panel.label}</span>
              <small>{panel.placement}</small>
            </button>
          ))}
        </div>

        <article
          id={`story-panel-${active.id}`}
          className="story-preview"
          role="tabpanel"
          aria-labelledby={`story-tab-${active.id}`}
        >
          <div className="story-preview__media">
            <img src={active.image} alt={active.caption} />
          </div>
          <div className="story-preview__copy">
            <p className="eyebrow">Selected diagram</p>
            <h3>{active.headline}</h3>
            <p>{active.caption}</p>
            <dl>
              <div>
                <dt>Placement</dt>
                <dd>{active.placement}</dd>
              </div>
              <div>
                <dt>Proof</dt>
                <dd>{active.proof}</dd>
              </div>
            </dl>
          </div>
        </article>
      </div>
    </section>
  );
}

export function App() {
  const [selectedId, setSelectedId] = useState<PlaygroundId>('tool-call-card');
  const selected = playground.find((item) => item.id === selectedId) ?? playground[0];
  const [variantById, setVariantById] = useState<Record<string, string>>(() =>
    Object.fromEntries(playground.map((item) => [item.id, item.variants[0]])),
  );
  const variant = variantById[selected.id] ?? selected.variants[0];
  const spec = findSpec(selected.id);

  const componentTokens = useMemo(
    () => Object.values(data.totals.tokens.components).reduce((sum, count) => sum + count, 0),
    [],
  );
  const aiReadyPct = Math.round((data.totals.ai_ready / data.totals.specs) * 100);
  const aiSurfaceSpecs = data.specs.filter((item) =>
    ['message', 'tool-call-card', 'confidence-meter', 'composer', 'reasoning-trace', 'hitl-gate'].includes(item.component),
  );

  return (
    <main className="site-shell">
      <nav className="top-nav" aria-label="Primary">
        <a className="brand" href="#top" aria-label="Clementine home">
          <span className="brand-glyph" aria-hidden="true" />
          <span>Clementine</span>
        </a>
        <div className="nav-links">
          <a href="#proof">Proof</a>
          <a href="#story">Story</a>
          <a href="#playground">Playground</a>
          <a href="#governance">Governance</a>
          <a href="#architecture">Architecture</a>
          <a href={data.surfaces.storybook}>Storybook</a>
        </div>
      </nav>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <h1 className="pixel-wordmark">
            Clementine
            <span className="clementine-dot" aria-hidden="true" />
          </h1>
          <div className="hero-rule">
            <p className="eyebrow">Design system</p>
            <span />
          </div>
          <p className="hero-lede">
            A modern component library for enterprise products. Designed for speed, accessibility,
            and agent-readable contracts.
          </p>
          <div className="hero-actions">
            <a className="action primary" href="#playground">Try the contract playground</a>
            <a className="action secondary" href={data.surfaces.mintlify}>Read the docs</a>
          </div>
        </div>

        <div className="token-board" aria-label="Clementine design tokens">
          <div className="token-group primitives">
            <p className="board-label">Core primitives</p>
            <div className="swatch-row wide">
              {TOKEN_SWATCHES.primitives.map(([name, path, value]) => (
                <article key={name} className="swatch-card">
                  <span style={{ backgroundColor: value }} />
                  <strong>{name}</strong>
                  <small>{path}</small>
                  <small>{value}</small>
                </article>
              ))}
            </div>
          </div>

          <div className="token-group atmosphere">
            <p className="board-label">Atmosphere</p>
            <div className="swatch-row">
              {TOKEN_SWATCHES.atmosphere.map(([name, path, value]) => (
                <article key={name} className="swatch-card">
                  <span style={{ backgroundColor: value }} />
                  <strong>{name}</strong>
                  <small>{path}</small>
                  <small>{value}</small>
                </article>
              ))}
            </div>
          </div>

          <div className="token-group accent">
            <p className="board-label">Accent</p>
            <div className="swatch-row">
              {TOKEN_SWATCHES.accent.map(([name, path, value]) => (
                <article key={name} className="swatch-card">
                  <span style={{ backgroundColor: value }} />
                  <strong>{name}</strong>
                  <small>{path}</small>
                  <small>{value}</small>
                </article>
              ))}
            </div>
          </div>

          <div className="live-component-ghost">
            <p className="board-label">Live component</p>
            <div className="ghost-mark" />
          </div>
        </div>
      </section>

      <section id="proof" className="proof-band">
        <div className="section-heading">
          <p className="eyebrow">The marketing point</p>
          <h2>Most systems document intent. Clementine makes intent executable.</h2>
        </div>
        <div className="proof-grid">
          {COMPONENT_PROOF.map((item, index) => (
            <article key={item} className="proof-step" style={{ '--delay': `${index * 90}ms` } as React.CSSProperties}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <StoryMode />

      <section className="metrics-strip" aria-label="Clementine system metrics">
        <AppMetric label="Specs" value={data.totals.specs} detail={`${aiReadyPct}% AI-Ready`} />
        <AppMetric label="Component tokens" value={componentTokens} detail="Tier-3 bindings" />
        <AppMetric label="Contract drift" value={`${data.scoreboard.drift}%`} detail="passing validator rules" />
        <AppMetric label="AI surfaces" value={aiSurfaceSpecs.length} detail="chat, tools, confidence" />
      </section>

      <section id="playground" className="playground-section">
        <div className="section-heading narrow">
          <p className="eyebrow">Playground</p>
          <h2>Pick a component. Watch the contract travel with it.</h2>
        </div>

        <div className="playground-shell">
          <aside className="component-picker" aria-label="Components">
            {playground.map((item) => (
              <button
                key={item.id}
                type="button"
                className={item.id === selected.id ? 'is-selected' : ''}
                onClick={() => setSelectedId(item.id)}
              >
                <span>{item.label}</span>
                <small>{item.tray}</small>
              </button>
            ))}
          </aside>

          <div className="playground-stage">
            <div className="stage-toolbar">
              <div>
                <p className="eyebrow">{selected.tray}</p>
                <h3>{selected.label}</h3>
              </div>
              <div className="variant-control" role="group" aria-label={`${selected.label} variants`}>
                {selected.variants.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={variant === option ? 'is-active' : ''}
                    onClick={() => setVariantById((current) => ({ ...current, [selected.id]: option }))}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="preview-canvas">
              <div className="animated-grid" aria-hidden="true" />
              <div className="preview-content" key={`${selected.id}-${variant}`}>
                {selected.render(variant)}
              </div>
            </div>

            <p className="playground-proof">{selected.proof}</p>
          </div>

          <aside className="contract-panel" aria-label="Component contract">
            <div>
              <p className="eyebrow">Live contract</p>
              <h3>{spec?.component ?? selected.id}</h3>
            </div>
            <dl>
              <div>
                <dt>Status</dt>
                <dd>{spec?.status ?? 'Spec-backed'}</dd>
              </div>
              <div>
                <dt>Health</dt>
                <dd>{spec?.health_score ?? 100}/100</dd>
              </div>
              <div>
                <dt>Tokens</dt>
                <dd>{spec?.token_contract.length ?? 0}</dd>
              </div>
              <div>
                <dt>Verified</dt>
                <dd>{spec ? compactDate(spec.last_verified) : 'build-time'}</dd>
              </div>
            </dl>
            <div className="token-list">
              {(spec?.token_contract ?? ['component.bg.default', 'component.fg.default', 'component.border.focus']).slice(0, 9).map((token) => (
                <code key={token}>{token}</code>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="governance" className="governance-section">
        <div className="section-heading narrow">
          <p className="eyebrow">Governance layer</p>
          <h2>The system does not just render components. It watches what agents do with them.</h2>
          <p>
            The playground is the product surface. The governance layer is the machinery behind it:
            validators, parity checks, behavior specs, and repair loops all pointed at the same contract.
          </p>
        </div>

        <div className="governance-board">
          <div className="learning-loop" aria-label="Watch, diagnose, fix, learn loop">
            <div className="loop-track" />
            <div className="loop-core">
              <span>Context</span>
              <strong>{data.totals.specs} specs</strong>
              <small>Token architecture · governance rules · learning history</small>
            </div>
            {GOVERNANCE_SIGNALS.map((signal, index) => (
              <article key={signal.label} className={`loop-card loop-card-${index + 1}`}>
                <span>{signal.label}</span>
                <strong>{signal.value}</strong>
              </article>
            ))}
          </div>

          <div className="governance-copy">
            <article>
              <span>Validator rules</span>
              <strong>{data.validators.length}</strong>
              <p>Rules in the public CLI check identity, tokens, dates, honesty, and AI-ready gates before merge.</p>
            </article>
            <article>
              <span>Token contract</span>
              <strong>{componentTokens}</strong>
              <p>Component-tier bindings create the closed vocabulary agents are allowed to use.</p>
            </article>
            <article>
              <span>Agent loop</span>
              <strong>watch → fix → learn</strong>
              <p>When drift repeats, the answer is not another reminder. It becomes a rule.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="architecture" className="architecture-section">
        <div className="section-heading narrow">
          <p className="eyebrow">9-tray architecture</p>
          <h2>Not AI-themed. AI-operable.</h2>
          <p>
            The core difference is governance: components, AI surfaces, behavior states, trust signals,
            feedback, and Figma parity all point back to the same contract.
          </p>
        </div>
        <div className="architecture-grid">
          {[
            ['01', 'Foundations', `${data.totals.tokens.primitives} primitives`],
            ['02', 'Components', `${data.totals.specs} specs`],
            ['03', 'Patterns', `${data.totals.patterns} patterns`],
            ['04', 'AI surfaces', 'messages, tools, HITL'],
            ['05', 'Behavior', 'stream, retry, interrupt'],
            ['06', 'Language', 'copy as contract'],
            ['07', 'Trust', 'disclosure + provenance'],
            ['08', 'Feedback', 'evaluation loop'],
            ['09', 'Governance', 'CI, Figma, validator'],
          ].map(([number, title, detail]) => (
            <article key={number}>
              <span>{number}</span>
              <strong>{title}</strong>
              <small>{detail}</small>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <span>Always here when agents need proof.</span>
        <div>
          <a href={data.surfaces.github}>GitHub</a>
          <a href={data.surfaces.figma}>Figma</a>
          <a href={data.surfaces.cli}>agentic-spec</a>
        </div>
      </footer>
    </main>
  );
}
