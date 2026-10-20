import type { Meta, StoryObj } from '@storybook/react';
import { Section, cssVar, dark, flatten, light, prim, resolve, ui, type Token } from './tokens';

const meta: Meta = {
  title: 'Foundations/Colour',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

function Chip({ fill, label, sub }: { fill: string; label: string; sub?: string }) {
  return (
    <div style={{ display: 'grid', gap: 4, minWidth: 0 }}>
      <div style={{ height: 40, borderRadius: 6, background: fill, border: '1px solid var(--cds-border-default)' }} />
      <span style={{ fontSize: 12, lineHeight: '16px', fontWeight: 500 }}>{label}</span>
      {sub && <span style={ui.meta}>{sub}</span>}
    </div>
  );
}

const grid = (min: number) => ({ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`, gap: 12 });

function Ramps({ group }: { group: 'palette' | 'palette-dark' }) {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {Object.entries(prim[group] as Record<string, Record<string, Token>>).map(([hue, steps]) => (
        <div key={hue}>
          <div style={{ ...ui.meta, marginBottom: 6 }}>{group}/{hue}</div>
          <div style={grid(64)}>
            {Object.entries(steps).map(([step, t]) => (
              <Chip key={step} fill={String(t.$value)} label={step} sub={String(t.$value)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export const Palette: Story = {
  render: () => (
    <div style={{ ...ui.page, padding: 24 }}>
      <Section title="Palette (light)"><Ramps group="palette" /></Section>
      <Section title="Palette (dark)"><Ramps group="palette-dark" /></Section>
    </div>
  ),
};

// Semantic tokens follow the toolbar theme: swatches paint the runtime CSS variable,
// and the caption shows the alias for the active mode.
const groups = ['surface', 'text', 'icon', 'border', 'action', 'accent', 'focus', 'feedback', 'risk'] as const;

export const Semantic: Story = {
  render: (_, { globals }) => {
    const tree = globals.colorScheme === 'dark' ? dark : light;
    return (
      <div style={{ ...ui.page, padding: 24 }}>
        {groups.map((g) => (
          <Section key={g} title={g}>
            <div style={grid(160)}>
              {flatten(tree[g], [g]).map(([path, t]) => (
                <Chip key={path} fill={cssVar(path)} label={path} sub={`${String(t.$value)} · ${resolve(t.$value)}`} />
              ))}
            </div>
          </Section>
        ))}
      </div>
    );
  },
};

export const Categorical: Story = {
  render: (_, { globals }) => {
    const tree = globals.colorScheme === 'dark' ? dark : light;
    const pairs = flatten(tree.category, ['category']);
    return (
      <div style={{ ...ui.page, padding: 24 }}>
        <Section title="Categorical hues">
          <p style={{ ...ui.meta, margin: '0 0 12px' }}>
            For chart series, tags and identity chips. Unordered: use risk/* for severity.
          </p>
          <div style={grid(160)}>
            {pairs.map(([path, t]) => (
              <Chip key={path} fill={cssVar(path)} label={path} sub={resolve(t.$value)} />
            ))}
          </div>
        </Section>
      </div>
    );
  },
};
