import figma from '@figma/code-connect';
import { Progress } from './Progress';

// Figma → code link for the Clementine 'Progress' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Progress, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=6-608', {
  example: () => (
    <Progress value={60} />
  ),
});
