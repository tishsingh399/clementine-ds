import figma from '@figma/code-connect';
import { Tooltip } from './Tooltip';

// Figma → code link for the Clementine 'Tooltip' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Tooltip, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=6-607', {
  example: () => (
    <Tooltip label="Saves without leaving the page"><button>Hover me</button></Tooltip>
  ),
});
