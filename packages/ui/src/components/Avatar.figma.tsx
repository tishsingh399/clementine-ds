import figma from '@figma/code-connect';
import { Avatar } from './Avatar';

// Figma → code link for the Clementine 'Avatar' component set (node 76:445,
// Type × Size). Until October 2026 this linked AvatarGroup to 6:615, an older
// one-off specimen; the set is a single Avatar, so it now links Avatar.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
//
// Drift, recorded in specs/avatar: Figma sizes are 24/32/40/48/56/72 px, the
// code uses Mantine's xs-xl scale (16/26/38/56/84 px) and has no 2XL.
figma.connect(Avatar, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=76-445', {
  props: {
    size: figma.enum('Size', { XS: 'xs', SM: 'sm', MD: 'md', LG: 'lg', XL: 'xl', '2XL': 'xl' }),
  },
  example: ({ size }) => <Avatar name="Ana Lee" size={size} />,
});
