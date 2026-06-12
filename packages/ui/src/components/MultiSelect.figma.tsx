import figma from '@figma/code-connect';
import { MultiSelect } from './MultiSelect';

// Figma → code link for the Clementine 'MultiSelect' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(MultiSelect, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1048', {
  example: () => (
    <MultiSelect label='Roles' data={['Admin','Viewer']} defaultValue={['Viewer']} />
  ),
});
