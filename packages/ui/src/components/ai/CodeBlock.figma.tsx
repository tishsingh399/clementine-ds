import figma from '@figma/code-connect';
import { CodeBlock } from './CodeBlock';

// Figma → code link for the Clementine 'CodeBlock' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(CodeBlock, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=16-1062', {
  example: () => (
    <CodeBlock filename='revoke.ts' code={'await revokeSessions(ids);'} />
  ),
});
