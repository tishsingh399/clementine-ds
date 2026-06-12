import figma from '@figma/code-connect';
import { Spoiler } from './Spoiler';

// Figma → code link for the Clementine 'Spoiler' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Spoiler, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1054', {
  example: () => (
    <Spoiler maxHeight={48} showLabel="Show more" hideLabel="Hide">Long content…</Spoiler>
  ),
});
