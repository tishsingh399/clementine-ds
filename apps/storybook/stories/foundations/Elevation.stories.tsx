import type { Meta, StoryObj } from '@storybook/react';
import { Section, prim, resolve, ui, type Token } from './tokens';

const meta: Meta = {
  title: 'Foundations/Elevation',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

// Each level's shadow colour goes through the semantic elevation/shadow-* token,
// which is transparent in dark mode. Dark elevation comes from surface steps.
const shadowVar: Record<string, string> = {
  '{shadow.10}': 'var(--cds-elevation-shadow-sm)',
  '{shadow.12}': 'var(--cds-elevation-shadow-md)',
  '{shadow.14}': 'var(--cds-elevation-shadow-lg)',
  '{shadow.18}': 'var(--cds-elevation-shadow-xl)',
};
const toCss = (v: string) => v.replace(/\{shadow\.\d+\}/g, (ref) => shadowVar[ref] ?? resolve(ref));

export const Levels: Story = {
  render: () => (
    <div style={{ ...ui.page, padding: 24, background: 'var(--cds-surface-default)' }}>
      <Section title="Elevation 0–4">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 32 }}>
          {Object.entries(prim.elevation as Record<string, Token>).map(([level, t]) => (
            <div
              key={level}
              style={{
                height: 140,
                padding: 16,
                borderRadius: 8,
                background: 'var(--cds-surface-elevated)',
                boxShadow: toCss(String(t.$value)),
                display: 'grid',
                alignContent: 'space-between',
              }}
            >
              <strong style={{ fontSize: 16 }}>elevation/{level}</strong>
              <span style={ui.meta}>{resolve(t.$value)}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
};
