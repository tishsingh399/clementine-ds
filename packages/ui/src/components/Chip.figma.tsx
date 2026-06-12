import figma from '@figma/code-connect';
import { Chip } from './Chip';

// Figma → code link for the Clementine 'Chip' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Chip, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=16-1040', {
  example: () => (
    <Chip defaultChecked>Standing access</Chip>
  ),
});
