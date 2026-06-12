import figma from '@figma/code-connect';
import { Alert } from './Alert';

// Figma → code link for the Clementine 'Alert' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Alert, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=6-606', {
  example: () => (
    <Alert intent="warning" title="Approaching limit">You have used 90% of your seats.</Alert>
  ),
});
