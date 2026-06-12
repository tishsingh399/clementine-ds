import figma from '@figma/code-connect';
import { DisclosureBadge } from './DisclosureBadge';

// Figma → code link for the Clementine 'DisclosureBadge' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(DisclosureBadge, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=6-610', {
  example: () => (
    <DisclosureBadge />
  ),
});
