import figma from '@figma/code-connect';
import { Avatar, AvatarGroup } from './Avatar';

// Figma → code link for the Clementine 'AvatarGroup' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(AvatarGroup, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=6-615', {
  example: () => (
    <AvatarGroup>
          <Avatar name="Tina Singh" />
          <Avatar name="Jordan Lee" />
          <Avatar>+5</Avatar>
        </AvatarGroup>
  ),
});
