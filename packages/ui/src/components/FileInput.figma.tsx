import figma from '@figma/code-connect';
import { FileInput } from './FileInput';

// Figma → code link for the Clementine 'FileInput' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(FileInput, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1066', {
  example: () => (
    <FileInput label="Upload evidence" placeholder="Pick a file" />
  ),
});
