import figma from '@figma/code-connect';
import { Progress } from './Progress';

// Figma → code link for the Clementine 'Progress' component set (node 85:34,
// Color × Size). Until October 2026 this pointed at 6:608, an older one-off
// specimen. The theme maps green/orange/red to the progress.bar-* tokens.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Progress, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=85-34', {
  props: {
    color: figma.enum('Color', { Default: undefined, Success: 'green', Warning: 'orange', Error: 'red' }),
    size: figma.enum('Size', { XS: 'xs', SM: 'sm', MD: 'md', LG: 'lg' }),
  },
  example: ({ color, size }) => <Progress value={60} color={color} size={size} aria-label="Upload progress" />,
});
