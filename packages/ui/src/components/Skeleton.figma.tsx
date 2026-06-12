import figma from '@figma/code-connect';
import { Skeleton } from './Skeleton';

// Figma → code link for the Clementine 'Skeleton' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Skeleton, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=6-609', {
  example: () => (
    <Skeleton height={16} width={240} />
  ),
});
