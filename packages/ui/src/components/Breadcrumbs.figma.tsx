import figma from '@figma/code-connect';
import { Breadcrumbs, Anchor } from './Breadcrumbs';

// Figma → code link for the Clementine 'Breadcrumbs' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Breadcrumbs, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=16-1036', {
  example: () => (
    <Breadcrumbs><Anchor href="/">Dashboard</Anchor><span>Sessions</span></Breadcrumbs>
  ),
});
