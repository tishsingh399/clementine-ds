import figma from '@figma/code-connect';
import { Tooltip } from './Tooltip';

// Figma → code link for the Clementine 'Tooltip' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Tooltip, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=6-607', {
  example: () => (
    <Tooltip label="Saves without leaving the page"><button>Hover me</button></Tooltip>
  ),
});
