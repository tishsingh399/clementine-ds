import figma from '@figma/code-connect';
import { DisclosureBadge } from './DisclosureBadge';

// Figma → code link for the Clementine 'DisclosureBadge' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(DisclosureBadge, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=6-610', {
  example: () => (
    <DisclosureBadge />
  ),
});
