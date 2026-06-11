import figma from '@figma/code-connect';
import { PasswordInput } from './PasswordInput';

// Figma → code link for the Clementine 'PasswordInput' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(PasswordInput, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1065', {
  example: () => (
    <PasswordInput label="Password" placeholder="Your password" />
  ),
});
