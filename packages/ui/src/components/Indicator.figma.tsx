import figma from '@figma/code-connect';
import { Indicator, Avatar } from './Indicator';

// Figma → code link for the Clementine 'Indicator' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Indicator, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1043', {
  example: () => (
    <Indicator label="3"><Avatar name="Tina Singh" /></Indicator>
  ),
});
