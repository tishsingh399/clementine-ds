import figma from '@figma/code-connect';
import { Skeleton } from './Skeleton';

// Figma → code link for the Clementine 'Skeleton' component set (node 88:64,
// Shape). Until October 2026 this pointed at 6:609, an older one-off specimen.
// Sizes are the Figma variants' own dimensions.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Skeleton, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=88-64', {
  props: {
    width: figma.enum('Shape', {
      'Line-SM': 200, 'Line-MD': 300, 'Line-LG': 400, 'Block-SM': 160, 'Block-MD': 240,
      'Circle-SM': undefined, 'Circle-MD': undefined, 'Circle-LG': undefined,
    }),
    height: figma.enum('Shape', {
      'Line-SM': 10, 'Line-MD': 10, 'Line-LG': 10, 'Block-SM': 40, 'Block-MD': 80,
      'Circle-SM': 32, 'Circle-MD': 48, 'Circle-LG': 64,
    }),
    circle: figma.enum('Shape', { 'Circle-SM': true, 'Circle-MD': true, 'Circle-LG': true }),
  },
  example: ({ width, height, circle }) => <Skeleton width={width} height={height} circle={circle} />,
});
