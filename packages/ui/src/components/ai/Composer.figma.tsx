import figma from '@figma/code-connect';
import { Composer } from './Composer';

// Figma → code link for the Clementine 'Composer' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Composer, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=6-621', {
  example: () => (
    <Composer placeholder="Message the assistant…" />
  ),
});
