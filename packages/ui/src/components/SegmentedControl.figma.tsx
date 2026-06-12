import figma from '@figma/code-connect';
import { SegmentedControl } from './SegmentedControl';

// Figma → code link for the Clementine 'SegmentedControl' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(SegmentedControl, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=16-1041', {
  example: () => (
    <SegmentedControl data={['Day','Week','Month']} defaultValue='Week' />
  ),
});
