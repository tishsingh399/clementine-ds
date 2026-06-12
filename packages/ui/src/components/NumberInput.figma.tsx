import figma from '@figma/code-connect';
import { NumberInput } from './NumberInput';

// Figma → code link for the Clementine 'NumberInput' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(NumberInput, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1064', {
  example: () => (
    <NumberInput label="Seats" placeholder="0" min={0} max={100} />
  ),
});
