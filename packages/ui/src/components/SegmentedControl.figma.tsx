import figma from '@figma/code-connect';
import { SegmentedControl } from './SegmentedControl';

// Figma → code link for the Clementine 'SegmentedControl' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(SegmentedControl, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1041', {
  example: () => (
    <SegmentedControl data={['Day','Week','Month']} defaultValue='Week' />
  ),
});
