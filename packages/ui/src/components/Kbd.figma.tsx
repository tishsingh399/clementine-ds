import figma from '@figma/code-connect';
import { Kbd } from './Kbd';

// Figma → code link for the Clementine 'Kbd' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Kbd, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1038', {
  example: () => (
    <Kbd>⌘</Kbd>
  ),
});
