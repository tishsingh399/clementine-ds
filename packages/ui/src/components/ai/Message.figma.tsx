import figma from '@figma/code-connect';
import { Message } from './Message';

// Figma → code link for the Clementine 'Message' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Message, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=6-620', {
  example: () => (
    <Message role="assistant" timestamp="2:14 PM">Three sessions still have standing access.</Message>
  ),
});
