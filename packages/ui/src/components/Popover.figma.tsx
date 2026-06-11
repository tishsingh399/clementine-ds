import figma from '@figma/code-connect';
import { Popover, PopoverTarget, PopoverDropdown } from './Popover';

// Figma → code link for the Clementine 'Popover' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Popover, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1045', {
  example: () => (
    <Popover><PopoverTarget><button>Details</button></PopoverTarget><PopoverDropdown>Standing since Jan</PopoverDropdown></Popover>
  ),
});
