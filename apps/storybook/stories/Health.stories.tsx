import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import healthData from '../health-data.json';

type HealthData = {
  generatedAt: string;
  sources: {
    contract: string;
    dom: string;
    stateCoverage: string;
  };
  contract: {
    generatedAt: string;
    threshold: number;
    specs: number;
    total: number;
    passed: number;
    average: number;
    belowThreshold: Array<{
      component: string;
      parity: number;
      failed: string[];
    }>;
  };
  dom: null | {
    generatedAt: string;
    modes: string[];
    measured: number;
    average: number;
    belowFullParityCount: number;
    belowFullParity: Array<{
      component: string;
      parity: number;
      misses: unknown[];
    }>;
    unwiredStateCount: number;
    unwiredStates: Array<{
      component: string;
      mode: string;
      state: string;
      reason: string;
      tokens: string[];
    }>;
  };
  stateCoverage: {
    generatedAt: string;
    gaps: number;
    componentsWithGaps: number;
    visibleGaps: Array<{
      component: string;
      state: string;
      status: 'gap';
      story: string;
      reason: string;
    }>;
  };
};

const report = healthData as HealthData;

const formatPercent = (value: number) =>
  `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })}%`;

const formatDate = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));

const visibleStateGaps = report.stateCoverage.visibleGaps;
const visibleUnwiredStates = report.dom?.unwiredStates.slice(0, 12) ?? [];

const tone = {
  ink: '#191918',
  muted: '#737370',
  line: '#e5e5e0',
  panel: '#ffffff',
  subtle: '#fafaf8',
  accent: '#f5631a',
  ok: '#15803d',
  warn: '#a16207',
};

function StatTile({
  label,
  value,
  meta,
  status = 'ok',
}: {
  label: string;
  value: string;
  meta: string;
  status?: 'ok' | 'warn';
}) {
  return (
    <section
      style={{
        minWidth: 0,
        border: `1px solid ${tone.line}`,
        borderRadius: 8,
        background: tone.panel,
        padding: 20,
      }}
    >
      <div
        style={{
          color: status === 'ok' ? tone.ok : tone.warn,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 0,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
      <div style={{ marginTop: 10, color: tone.ink, fontSize: 32, fontWeight: 760, lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ marginTop: 8, color: tone.muted, fontSize: 14, lineHeight: 1.45 }}>{meta}</div>
    </section>
  );
}

function DataTable({
  title,
  rows,
}: {
  title: string;
  rows: Array<{ component: string; detail: string; note: string }>;
}) {
  return (
    <section
      style={{
        border: `1px solid ${tone.line}`,
        borderRadius: 8,
        background: tone.panel,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '16px 18px',
          borderBottom: `1px solid ${tone.line}`,
          color: tone.ink,
          fontSize: 16,
          fontWeight: 720,
        }}
      >
        {title}
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 680 }}>
          <thead>
            <tr style={{ background: tone.subtle }}>
              <th style={headerCell}>Component</th>
              <th style={headerCell}>Signal</th>
              <th style={headerCell}>Evidence</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.component}-${row.detail}-${row.note}`}>
                <td style={bodyCell}>{row.component}</td>
                <td style={bodyCell}>{row.detail}</td>
                <td style={{ ...bodyCell, color: tone.muted }}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const headerCell: CSSProperties = {
  padding: '10px 14px',
  color: tone.muted,
  fontSize: 12,
  fontWeight: 720,
  letterSpacing: 0,
  textAlign: 'left',
  textTransform: 'uppercase',
  borderBottom: `1px solid ${tone.line}`,
};

const bodyCell: CSSProperties = {
  padding: '12px 14px',
  color: tone.ink,
  fontSize: 14,
  lineHeight: 1.45,
  borderBottom: `1px solid ${tone.line}`,
  verticalAlign: 'top',
};

function HealthPanel() {
  return (
    <main
      style={{
        color: tone.ink,
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        maxWidth: 1180,
        margin: '0 auto',
      }}
    >
      <header style={{ marginBottom: 28 }}>
        <div
          style={{
            color: tone.accent,
            fontSize: 12,
            fontWeight: 760,
            letterSpacing: 0,
            textTransform: 'uppercase',
          }}
        >
          Governance
        </div>
        <h1 style={{ margin: '8px 0 10px', color: tone.ink, fontSize: 42, lineHeight: 1.05 }}>
          System health
        </h1>
        <p style={{ maxWidth: 780, margin: 0, color: tone.muted, fontSize: 17, lineHeight: 1.6 }}>
          A read-only view of Clementine&apos;s generated proof artifacts. It shows what the repo
          has measured, where state evidence is still missing, and which claims should stay
          qualified.
        </p>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 14,
          marginBottom: 22,
        }}
      >
        <StatTile
          label="Contract parity"
          value={formatPercent(report.contract.average)}
          meta={`${report.contract.specs} specs, ${report.contract.belowThreshold.length} below ${report.contract.threshold}%`}
        />
        <StatTile
          label="Painted DOM"
          value={report.dom ? formatPercent(report.dom.average) : 'n/a'}
          meta={
            report.dom
              ? `${report.dom.measured} measured components, ${report.dom.belowFullParityCount} below 100%`
              : 'no painted-DOM snapshot available'
          }
          status={report.dom ? 'ok' : 'warn'}
        />
        <StatTile
          label="State coverage"
          value={`${report.stateCoverage.gaps}`}
          meta={`known gaps across ${report.stateCoverage.componentsWithGaps} components`}
          status={report.stateCoverage.gaps > 0 ? 'warn' : 'ok'}
        />
        <StatTile
          label="Unwired states"
          value={report.dom ? `${report.dom.unwiredStateCount}` : 'n/a'}
          meta="informational painted-state observations"
          status={report.dom?.unwiredStateCount ? 'warn' : 'ok'}
        />
      </div>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 14,
          marginBottom: 22,
        }}
      >
        <div style={noteBox}>
          <strong>Proves</strong>
          <span>
            Token contracts resolve cleanly, measured Storybook examples match the generated CSS
            contract, and state gaps are named instead of hidden.
          </span>
        </div>
        <div style={noteBox}>
          <strong>Does not prove</strong>
          <span>
            Full Figma parity, exhaustive visual QA, or complete per-state coverage. Those remain
            separate proof layers.
          </span>
        </div>
      </section>

      <div style={{ display: 'grid', gap: 18 }}>
        <DataTable
          title="State coverage gaps"
          rows={visibleStateGaps.map((gap) => ({
            component: gap.component,
            detail: gap.state,
            note: gap.reason,
          }))}
        />
        {report.dom ? (
          <DataTable
            title="Painted-state observations"
            rows={visibleUnwiredStates.map((state) => ({
              component: state.component,
              detail: `${state.state} / ${state.mode}`,
              note: `${state.reason}: ${state.tokens.join(', ')}`,
            }))}
          />
        ) : null}
      </div>

      <footer style={{ marginTop: 24, color: tone.muted, fontSize: 13, lineHeight: 1.6 }}>
        Reports generated: contract {formatDate(report.contract.generatedAt)}, painted DOM{' '}
        {report.dom ? formatDate(report.dom.generatedAt) : 'not available in this build'}, state
        coverage {formatDate(report.stateCoverage.generatedAt)}. Health snapshot{' '}
        {formatDate(report.generatedAt)}.
      </footer>
    </main>
  );
}

const noteBox: CSSProperties = {
  display: 'grid',
  gap: 8,
  border: `1px solid ${tone.line}`,
  borderRadius: 8,
  background: tone.subtle,
  padding: 18,
  color: tone.muted,
  fontSize: 14,
  lineHeight: 1.55,
};

const meta: Meta<typeof HealthPanel> = {
  title: 'Governance/Health',
  component: HealthPanel,
  parameters: {
    controls: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof HealthPanel>;

export const Current: Story = {};
