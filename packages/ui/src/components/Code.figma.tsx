import figma from '@figma/code-connect';
import { Code } from './Code';

// Figma → code link for the Clementine 'Code' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Code, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=16-1037', {
  example: () => (
    <Code>pnpm install</Code>
  ),
});
