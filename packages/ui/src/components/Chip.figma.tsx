import figma from '@figma/code-connect';
import { Chip } from './Chip';

// Figma → code link for the Clementine 'Chip' component set (node 84:69,
// Checked × Removable × Size). Until October 2026 this pointed at 16:1040, an
// older one-off specimen.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
//
// Removable has no code equivalent: Mantine's Chip is a toggle with no remove
// button. Recorded in specs/chip.
figma.connect(Chip, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=84-69', {
  props: {
    checked: figma.boolean('Checked'),
    size: figma.enum('Size', { SM: 'sm', MD: 'md', LG: 'lg' }),
  },
  example: ({ checked, size }) => (
    <Chip defaultChecked={checked} size={size}>Standing access</Chip>
  ),
});
