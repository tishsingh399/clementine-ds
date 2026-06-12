import figma from '@figma/code-connect';
import { HITLGate } from './HITLGate';

// Figma → code link for the Clementine 'HITLGate' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(HITLGate, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=6-622', {
  example: () => (
    <HITLGate title="Approve: revoke 3 sessions" description="This signs the users out of every device." destructive approveLabel="Revoke" />
  ),
});
