import figma from '@figma/code-connect';
import { ConfidenceMeter } from './ConfidenceMeter';

// Figma → code link for the Clementine 'ConfidenceMeter' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(ConfidenceMeter, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=16-1058', {
  example: () => (
    <ConfidenceMeter level="high" />
  ),
});
