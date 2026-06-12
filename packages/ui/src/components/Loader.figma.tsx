import figma from '@figma/code-connect';
import { Loader } from './Loader';

// Figma → code link for the Clementine 'Loader' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Loader, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=16-1042', {
  example: () => (
    <Loader type="oval" size="sm" />
  ),
});
