import figma from '@figma/code-connect';
import { PinInput } from './PinInput';

// Figma → code link for the Clementine 'PinInput' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(PinInput, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1047', {
  example: () => (
    <PinInput length={6} oneTimeCode />
  ),
});
