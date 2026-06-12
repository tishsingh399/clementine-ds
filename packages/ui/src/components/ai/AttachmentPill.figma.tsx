import figma from '@figma/code-connect';
import { AttachmentPill } from './AttachmentPill';

// Figma → code link for the Clementine 'AttachmentPill' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(AttachmentPill, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=16-1060', {
  example: () => (
    <AttachmentPill name='access-review.pdf' size='240 KB' onRemove={() => {}} />
  ),
});
