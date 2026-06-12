import figma from '@figma/code-connect';
import { Composer } from './Composer';

// Figma → code link for the Clementine 'Composer' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Composer, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=6-621', {
  example: () => (
    <Composer placeholder="Message the assistant…" />
  ),
});
