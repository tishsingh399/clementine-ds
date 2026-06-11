import figma from '@figma/code-connect';
import { Slider } from './Slider';

// Figma → code link for the Clementine 'Slider' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Slider, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1050', {
  example: () => (
    <Slider defaultValue={40} />
  ),
});
