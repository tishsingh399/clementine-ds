import figma from '@figma/code-connect';
import { Button } from './Button';

// Figma → code link for the Clementine 'Button' component set (node 76:98,
// Variant × Size × State). 76:98 is the canonical set; 27:1590 is an older
// specimen card of example buttons.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
//
// Variant: Primary is the filled default, Secondary the outline variant,
// Destructive filled in red, Ghost the subtle variant. Hover and Focus are
// interaction states, not props; Disabled is the disabled prop.
figma.connect(Button, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=76-98', {
  props: {
    variant: figma.enum('Variant', { Primary: undefined, Secondary: 'outline', Destructive: undefined, Ghost: 'subtle' }),
    color: figma.enum('Variant', { Primary: undefined, Secondary: undefined, Destructive: 'red', Ghost: undefined }),
    size: figma.enum('Size', { SM: 'sm', MD: 'md', LG: 'lg' }),
    disabled: figma.enum('State', { Default: undefined, Hover: undefined, Focus: undefined, Disabled: true }),
  },
  example: ({ variant, color, size, disabled }) => (
    <Button variant={variant} color={color} size={size} disabled={disabled}>
      Save changes
    </Button>
  ),
});
