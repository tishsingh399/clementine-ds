import type { Meta, StoryObj } from '@storybook/react';
import { Section, prim, resolve, ui, type Token } from './tokens';

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

type Style = Record<'font-family' | 'font-size' | 'line-height' | 'font-weight' | 'letter-spacing', Token>;
const styles = Object.entries(prim.typography.style as Record<string, Style>);

export const TextStyles: Story = {
  render: () => (
    <div style={{ ...ui.page, padding: 24 }}>
      <Section title={`Text styles (${styles.length})`}>
        <div style={{ display: 'grid', gap: 24 }}>
          {styles.map(([name, s]) => {
            const v = (k: keyof Style) => resolve(s[k].$value);
            return (
              <div key={name} style={{ display: 'grid', gap: 4, borderBottom: '1px solid var(--cds-border-default)', paddingBottom: 16 }}>
                <span style={ui.meta}>
                  {name} · {v('font-size')}/{v('line-height')} · {v('font-weight')} · {v('letter-spacing')}
                </span>
                <span
                  style={{
                    fontFamily: v('font-family'),
                    fontSize: v('font-size'),
                    lineHeight: v('line-height'),
                    fontWeight: Number(v('font-weight')),
                    letterSpacing: v('letter-spacing'),
                  }}
                >
                  Agents should explain what they did and why
                </span>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  ),
};
