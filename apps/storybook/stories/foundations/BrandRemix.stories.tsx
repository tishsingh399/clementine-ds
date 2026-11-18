import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import { Button, brandScales, brandVariables, contrastReport } from '@clementine-ds/ui';
import primitives from '@clementine-ds/tokens/primitives-source';

const meta: Meta = {
  title: 'Foundations/Brand remix',
  parameters: {
    docs: {
      description: {
        component:
          '`brandVariables(hex)` re-themes Clementine from one primary colour: a generated ink scale run back through the token cascade. `contrastReport` checks the result against every declared pair in `packages/tokens/contrast-pairs.json`. The live tool is the Remix section of the Observatory.',
      },
    },
  },
};
export default meta;

const BRANDS = ['#305eb7', '#12a594', '#8e4ec6', '#f5d90a'];

function check(ok: unknown, message: string) {
  if (!ok) throw new Error(message);
}

export const Scales: StoryObj = {
  parameters: {
    // Teal and Lemon are here to show failing pairs; axe still checks contrast everywhere else.
    a11y: { config: { rules: [{ id: 'color-contrast', selector: '*:not([data-expected-fail] *)' }] } },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      {BRANDS.map((brand) => {
        const vars = brandVariables(brand);
        const fails = contrastReport(vars).filter((r) => !r.pass && !r.exempt).length;
        return (
          <div key={brand} style={{ display: 'grid', gap: 8 }} data-brand={brand} data-expected-fail={fails ? '' : undefined}>
            <code>
              {brand}: {fails ? `${fails} failing pairs` : 'all declared pairs pass'}
            </code>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>
              {brandScales(brand).light.map((hex, i) => (
                <span key={i} title={hex} style={{ background: hex, height: 24, borderRadius: 4 }} />
              ))}
            </div>
            <div style={vars.light as CSSProperties}>
              <Button>Primary action</Button>
            </div>
          </div>
        );
      })}
    </div>
  ),
  play: async ({ canvasElement }) => {
    // Generating from Clementine's own ink.9 gives back the ink scale.
    const ink = primitives.palette.ink as Record<string, { $value: string }>;
    const { light } = brandScales('#305eb7');
    light.forEach((hex, i) => check(hex === ink[i + 1]!.$value, `ink.${i + 1}: generated ${hex}, expected ${ink[i + 1]!.$value}`));

    // The default brand passes the same gate as scripts/contrast-audit.mjs; Lemon does not.
    check(contrastReport(brandVariables('#305eb7')).every((r) => r.pass || r.exempt), 'default brand should pass every non-exempt pair');
    const lemon = contrastReport(brandVariables('#f5d90a'));
    check(
      lemon.some((r) => r.fg === 'text.on-action' && r.bg === 'action.primary' && !r.pass),
      'white text on a lemon primary should fail',
    );

    // The variables are scoped: a Button inside the wrapper paints the brand colour.
    const teal = canvasElement.querySelector('[data-brand="#12a594"] .mantine-Button-root');
    check(teal && getComputedStyle(teal).backgroundColor === 'rgb(18, 165, 148)', 'teal Button should paint #12a594');
  },
};
