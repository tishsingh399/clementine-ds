import figma from '@figma/code-connect';
import { Slider } from './Slider';

// Figma → code link for the Clementine 'Slider' component set (node 86:111,
// Disabled × Size). Until October 2026 this pointed at 16:1050, an older
// one-off specimen.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Slider, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=86-111', {
  props: {
    disabled: figma.boolean('Disabled'),
    size: figma.enum('Size', { SM: 'sm', MD: 'md', LG: 'lg' }),
  },
  example: ({ disabled, size }) => <Slider defaultValue={40} disabled={disabled} size={size} />,
});
