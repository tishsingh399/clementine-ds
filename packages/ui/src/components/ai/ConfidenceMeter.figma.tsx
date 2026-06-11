import figma from '@figma/code-connect';
import { ConfidenceMeter } from './ConfidenceMeter';

// Figma → code link for the Clementine 'ConfidenceMeter' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(ConfidenceMeter, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1058', {
  example: () => (
    <ConfidenceMeter level="high" />
  ),
});
