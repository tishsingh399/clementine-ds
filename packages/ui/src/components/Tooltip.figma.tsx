import figma from '@figma/code-connect';
import { Tooltip } from './Tooltip';

// Figma → code link for the Clementine 'Tooltip' component set (node 85:43,
// Placement). Until October 2026 this pointed at 6:607, an older one-off
// specimen.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Tooltip, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=85-43', {
  props: {
    position: figma.enum('Placement', { Top: 'top', Bottom: 'bottom', Left: 'left', Right: 'right' }),
  },
  example: ({ position }) => (
    <Tooltip label="Saves without leaving the page" position={position}><button>Hover me</button></Tooltip>
  ),
});
