import figma from '@figma/code-connect';
import { Card, CardSection } from './Card';
import { Text } from '@mantine/core';

// Figma → code link for the Clementine 'Card' component set (node 88:55,
// Elevation × Interactive). Until October 2026 this pointed at 6:612, an older
// one-off specimen card, not the component set designers use.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
//
// Elevation maps to Mantine's two surface props. Flat is neither, Raised is
// the shadow, Bordered is the border (it binds border/default in Figma). The
// theme's default Card is bordered AND raised, which no Figma variant is;
// recorded in specs/card/index.md.
// Interactive maps to data-interactive, the attribute the hover lift in
// theme/states.css keys on. A clickable Card also needs real link or button
// semantics (component="a" with href, or component="button"); see the spec.
figma.connect(Card, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=88-55', {
  props: {
    shadow: figma.enum('Elevation', { Flat: 'none', Raised: 'sm', Bordered: 'none' }),
    withBorder: figma.enum('Elevation', { Flat: false, Raised: false, Bordered: true }),
    interactive: figma.boolean('Interactive', { true: 'true', false: undefined }),
  },
  example: ({ shadow, withBorder, interactive }) => (
    <Card shadow={shadow} withBorder={withBorder} data-interactive={interactive}>
      <CardSection>
        <Text fw={600}>Production access</Text>
        <Text size="sm">Standing access to the production cluster, scoped to read-only.</Text>
      </CardSection>
    </Card>
  ),
});
