import figma from '@figma/code-connect';
import { HoverCard, HoverCardTarget, HoverCardDropdown } from './HoverCard';

// Figma → code link for the Clementine 'HoverCard' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(HoverCard, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1056', {
  example: () => (
    <HoverCard><HoverCardTarget><button>Tina</button></HoverCardTarget><HoverCardDropdown>Senior UX Designer</HoverCardDropdown></HoverCard>
  ),
});
