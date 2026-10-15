import figma from '@figma/code-connect';
import { Notification } from './Notification';

// Figma → code link for the Clementine 'Notification' component set (node
// 86:11, Accent). Until October 2026 this pointed at 16:1055, an older one-off
// specimen.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
//
// Accent is not mapped: there is no single code prop that turns the accent on
// and off. Recorded in specs/notification.
figma.connect(Notification, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=86-11', {
  example: () => (
    <Notification title="Session revoked" color="green">Signed out everywhere.</Notification>
  ),
});
