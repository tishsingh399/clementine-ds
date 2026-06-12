import figma from '@figma/code-connect';
import { Timeline, TimelineItem } from './Timeline';

// Figma → code link for the Clementine 'Timeline' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Timeline, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=16-1053', {
  example: () => (
    <Timeline active={1}><TimelineItem title="Requested" /><TimelineItem title="Approved" /></Timeline>
  ),
});
