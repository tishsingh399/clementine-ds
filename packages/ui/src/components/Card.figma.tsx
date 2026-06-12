import figma from '@figma/code-connect';
import { Card } from './Card';

// Figma → code link for the Clementine 'Card' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Card, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=6-612', {
  example: () => (
    <Card>Production access — standing, read-only.</Card>
  ),
});
