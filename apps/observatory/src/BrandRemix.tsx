import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import {
  Alert,
  Anchor,
  Badge,
  Button,
  Checkbox,
  Pagination,
  Progress,
  Switch,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  TextInput,
  brandScales,
  brandVariables,
  contrastReport,
  hexToOklch,
  oklchToHex,
  type ContrastRow,
} from '@clementine-ds/ui';

const DEFAULT_BRAND = '#305eb7'; // palette.ink.9, Clementine's own primary
const PRESETS: [string, string][] = [
  ['Clementine', DEFAULT_BRAND],
  ['Teal', '#12a594'],
  ['Violet', '#8e4ec6'],
  ['Crimson', '#e5484d'],
  ['Forest', '#2f6b3a'],
  ['Lemon', '#f5d90a'],
];
const HEX = /^#[0-9a-f]{6}$/i;

const failures = (rows: ContrastRow[]) => rows.filter((r) => !r.pass && !r.exempt);

/** Closest colour with the same hue and chroma whose generated scale passes every non-exempt pair. */
function nearestPassing(brand: string): string | null {
  const [l, c, h] = hexToOklch(brand);
  for (let step = 0.01; step <= 0.5; step += 0.01) {
    for (const L of [l - step, l + step]) {
      if (L <= 0.05 || L >= 0.98) continue;
      const hex = oklchToHex([L, c, h]);
      if (failures(contrastReport(brandVariables(hex))).length === 0) return hex;
    }
  }
  return null;
}

function readBrandFromUrl(): string {
  const raw = new URLSearchParams(window.location.search).get('brand');
  const hex = raw ? `#${raw.replace('#', '')}` : '';
  return HEX.test(hex) ? hex.toLowerCase() : DEFAULT_BRAND;
}

export function BrandRemix() {
  const [brand, setBrand] = useState(readBrandFromUrl);
  const [draft, setDraft] = useState(brand);
  const [scheme, setScheme] = useState<'light' | 'dark'>('light');
  const [copied, setCopied] = useState(false);

  const scales = useMemo(() => brandScales(brand), [brand]);
  const vars = useMemo(() => brandVariables(brand), [brand]);
  const report = useMemo(() => contrastReport(vars), [vars]);
  const failing = failures(report);
  const fix = useMemo(() => (failing.length ? nearestPassing(brand) : null), [brand, failing.length]);
  const passing = report.filter((r) => r.pass).length;

  useEffect(() => {
    const url = new URL(window.location.href);
    if (brand === DEFAULT_BRAND) url.searchParams.delete('brand');
    else url.searchParams.set('brand', brand.slice(1));
    window.history.replaceState(null, '', url);
  }, [brand]);

  // Arriving from a shared link: jump to the remix.
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has('brand')) return;
    // After first paint, or the sections above haven't laid out yet.
    const id = window.setTimeout(() => document.getElementById('remix')?.scrollIntoView({ behavior: 'instant' }), 300);
    return () => window.clearTimeout(id);
  }, []);

  const choose = (hex: string) => {
    setBrand(hex.toLowerCase());
    setDraft(hex.toLowerCase());
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?brand=${brand.slice(1)}#remix`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="remix" className="architecture-section remix-section">
      <div className="section-heading">
        <p className="eyebrow">Brand remix</p>
        <h2>One colour in. The whole system follows, and the contrast rules still check it.</h2>
        <p>
          Pick a primary colour. Clementine builds a 12-step scale with its own lightness curve, swaps it in for the ink
          primitives, and re-runs the token cascade. Every component below is the real one. The meter checks the{' '}
          {report.length / 2} text and surface pairs the system declares, in light and dark.
        </p>
      </div>

      <div className="remix-shell">
        <div className="remix-controls">
          <label className="remix-picker">
            <input
              type="color"
              value={brand}
              onChange={(e) => choose(e.target.value)}
              aria-label="Primary colour picker"
            />
            <input
              className="remix-hex"
              value={draft}
              spellCheck={false}
              aria-label="Primary colour hex"
              onChange={(e) => {
                setDraft(e.target.value);
                const hex = e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`;
                if (HEX.test(hex)) setBrand(hex.toLowerCase());
              }}
            />
          </label>

          <div className="remix-presets" role="group" aria-label="Preset colours">
            {PRESETS.map(([name, hex]) => (
              <button
                key={hex}
                type="button"
                className={hex === brand ? 'is-active' : undefined}
                aria-pressed={hex === brand}
                onClick={() => choose(hex)}
              >
                <span style={{ background: hex }} aria-hidden="true" />
                {name}
              </button>
            ))}
          </div>

          {(['light', 'dark'] as const).map((mode) => (
            <div key={mode} className="remix-scale">
              <p className="board-label">{mode} scale</p>
              <div>
                {scales[mode].map((hex, i) => (
                  <span key={i} title={`ink.${i + 1} ${hex}`} style={{ background: hex }} className={i === 8 ? 'is-brand' : undefined} />
                ))}
              </div>
            </div>
          ))}

          <div className={`remix-meter ${failing.length ? 'has-fail' : 'is-pass'}`} aria-live="polite">
            <strong>
              {passing}/{report.length}
            </strong>
            <span>
              pairs pass AA
              {failing.length ? `, ${failing.length} fail` : ', none fail'}
            </span>
          </div>

          {failing.length > 0 && (
            <div className="remix-failures">
              <ul>
                {failing.slice(0, 6).map((r) => (
                  <li key={`${r.mode}${r.fg}${r.bg}`}>
                    <code>{r.fg}</code> on <code>{r.bg}</code> ({r.mode}) {r.ratio?.toFixed(2)}:1, needs {r.need}
                  </li>
                ))}
              </ul>
              {failing.length > 6 && <p>and {failing.length - 6} more</p>}
              {fix && (
                <button type="button" className="action primary remix-fix" onClick={() => choose(fix)}>
                  <span style={{ background: fix }} aria-hidden="true" /> Try {fix}, the closest shade that passes
                </button>
              )}
            </div>
          )}

          <button type="button" className="action secondary remix-share" onClick={share}>
            {copied ? 'Link copied' : 'Copy a link to this remix'}
          </button>
        </div>

        <div className="remix-stage">
          <div className="variant-control" role="group" aria-label="Preview colour scheme">
            {(['light', 'dark'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                className={scheme === mode ? 'is-active' : undefined}
                aria-pressed={scheme === mode}
                onClick={() => setScheme(mode)}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Remix vars are scoped to this element, so the rest of the page keeps Clementine's own theme.
              Everything here renders inline (no portals), so it all sits inside the scope. */}
          <div className="remix-preview" data-mantine-color-scheme={scheme} style={vars[scheme] as CSSProperties}>
            <div className="remix-row">
              <Button>Deploy agent</Button>
              <Button variant="light">Preview</Button>
              <Button variant="outline">Cancel</Button>
              <Button variant="subtle">Skip</Button>
            </div>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTab value="overview">Overview</TabsTab>
                <TabsTab value="tasks">Tasks</TabsTab>
                <TabsTab value="activity">Activity</TabsTab>
                <TabsTab value="settings" disabled>
                  Settings
                </TabsTab>
              </TabsList>
              <TabsPanel value="overview" pt="sm">
                Three agents are running. One needs your approval.
              </TabsPanel>
              <TabsPanel value="tasks" pt="sm">
                12 tasks, 4 waiting on review.
              </TabsPanel>
              <TabsPanel value="activity" pt="sm">
                Last run finished 2 minutes ago.
              </TabsPanel>
            </Tabs>
            <TextInput label="Workspace name" placeholder="Acme security" />
            <div className="remix-row">
              <Switch label="Auto-approve low risk" defaultChecked />
              <Checkbox label="Notify me" defaultChecked />
              <Badge color="blue" variant="light">Beta</Badge>
              <Badge color="blue">New</Badge>
            </div>
            <Progress value={64} aria-label="Run progress" />
            <Alert intent="info" title="Heads up">
              The model changed since your last run. <Anchor href="#remix">See what changed</Anchor>
            </Alert>
            <Pagination total={8} defaultValue={3} />
          </div>
        </div>
      </div>
    </section>
  );
}
