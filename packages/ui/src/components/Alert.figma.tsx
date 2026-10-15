import figma from '@figma/code-connect';
import { Alert } from './Alert';

// Figma → code link for the Clementine 'Alert' component set (node 84:38,
// Type × WithTitle). Until October 2026 this pointed at 6:606, an older
// one-off specimen.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Alert, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=84-38', {
  props: {
    intent: figma.enum('Type', { Info: 'info', Success: 'success', Warning: 'warning', Error: 'error' }),
    title: figma.boolean('WithTitle', { true: 'Approaching limit', false: undefined }),
  },
  example: ({ intent, title }) => (
    <Alert intent={intent} title={title}>You have used 90% of your seats.</Alert>
  ),
});
