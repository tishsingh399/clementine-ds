import figma from '@figma/code-connect';
import { Fieldset, TextInput } from './Fieldset';

// Figma → code link for the Clementine 'Fieldset' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Fieldset, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=16-1051', {
  example: () => (
    <Fieldset legend="Access details"><TextInput label="Resource" /></Fieldset>
  ),
});
