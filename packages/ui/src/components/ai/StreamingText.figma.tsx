import figma from '@figma/code-connect';
import { StreamingText } from './StreamingText';

// Figma → code link for the Clementine 'StreamingText' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(StreamingText, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=6-625', {
  example: () => (
    <StreamingText streaming>Revoking standing access</StreamingText>
  ),
});
