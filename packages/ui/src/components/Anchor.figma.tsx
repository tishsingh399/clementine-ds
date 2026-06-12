import figma from '@figma/code-connect';
import { Anchor } from './Anchor';

// Figma → code link for the Clementine 'Anchor' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Anchor, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1063', {
  example: () => (
    <Anchor href="/policy">Read the access policy</Anchor>
  ),
});
