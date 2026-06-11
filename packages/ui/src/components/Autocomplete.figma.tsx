import figma from '@figma/code-connect';
import { Autocomplete } from './Autocomplete';

// Figma → code link for the Clementine 'Autocomplete' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Autocomplete, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=6-618', {
  example: () => (
    <Autocomplete label="Assignee" placeholder="Type a name" data={['Tina Singh', 'Tim Park']} />
  ),
});
