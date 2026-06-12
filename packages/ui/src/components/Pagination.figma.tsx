import figma from '@figma/code-connect';
import { Pagination } from './Pagination';

// Figma → code link for the Clementine 'Pagination' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Pagination, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=6-619', {
  example: () => (
    <Pagination total={10} defaultValue={3} />
  ),
});
