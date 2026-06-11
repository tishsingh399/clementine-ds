import figma from '@figma/code-connect';
import { FeedbackControl } from './FeedbackControl';

// Figma → code link for the Clementine 'FeedbackControl' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(FeedbackControl, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=6-611', {
  example: () => (
    <FeedbackControl />
  ),
});
