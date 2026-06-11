import figma from '@figma/code-connect';
import { Code } from './Code';

// Figma → code link for the Clementine 'Code' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Code, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1037', {
  example: () => (
    <Code>pnpm install</Code>
  ),
});
