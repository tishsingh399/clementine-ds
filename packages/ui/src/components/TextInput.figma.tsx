import figma from '@figma/code-connect';
import { TextInput } from './TextInput';

// Figma → code link for the Clementine 'TextInput' component set (node 76:392,
// State × Size). 76:392 is the canonical set; 27:1596 is an older specimen.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
//
// Hover and Focus are interaction states, not props. Error is the error prop
// (its message is the helper text), Filled a value, Disabled the disabled prop.
figma.connect(TextInput, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=76-392', {
  props: {
    size: figma.enum('Size', { SM: 'sm', MD: 'md', LG: 'lg' }),
    error: figma.enum('State', { Error: 'Enter a valid email address' }),
    defaultValue: figma.enum('State', { Filled: 'ana@example.com' }),
    disabled: figma.enum('State', { Disabled: true }),
  },
  example: ({ size, error, defaultValue, disabled }) => (
    <TextInput label="Email" size={size} error={error} defaultValue={defaultValue} disabled={disabled} />
  ),
});
