import figma from '@figma/code-connect';
import { Rating } from './Rating';

// Figma → code link for the Clementine 'Rating' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Rating, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1049', {
  example: () => (
    <Rating defaultValue={3} />
  ),
});
