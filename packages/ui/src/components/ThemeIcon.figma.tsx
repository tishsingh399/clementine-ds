import figma from '@figma/code-connect';
import { ThemeIcon } from './ThemeIcon';

// Figma → code link for the Clementine 'ThemeIcon' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(ThemeIcon, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1039', {
  example: () => (
    <ThemeIcon size="lg">★</ThemeIcon>
  ),
});
