import figma from '@figma/code-connect';
import { TagsInput } from './TagsInput';

// Figma → code link for the Clementine 'TagsInput' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(TagsInput, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1075', {
  example: () => (
    <TagsInput label="Labels" placeholder="Add a label" defaultValue={['prod', 'read-only']} />
  ),
});
