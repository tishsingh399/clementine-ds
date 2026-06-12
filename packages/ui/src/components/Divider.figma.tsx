import figma from '@figma/code-connect';
import { Divider } from './Divider';

// Figma → code link for the Clementine 'Divider' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Divider, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=16-1046', {
  example: () => (
    <Divider label="Or" labelPosition="center" />
  ),
});
