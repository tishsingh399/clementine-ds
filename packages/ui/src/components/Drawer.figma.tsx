import figma from '@figma/code-connect';
import { Drawer } from './Drawer';

// Figma → code link for the Clementine 'Drawer' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Drawer, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=6-616', {
  example: () => (
    <Drawer opened title="Filters" onClose={() => {}}>Secondary tasks live here.</Drawer>
  ),
});
