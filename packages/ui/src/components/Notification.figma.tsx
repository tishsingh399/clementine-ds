import figma from '@figma/code-connect';
import { Notification } from './Notification';

// Figma → code link for the Clementine 'Notification' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Notification, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1055', {
  example: () => (
    <Notification title="Session revoked" color="green">Signed out everywhere.</Notification>
  ),
});
