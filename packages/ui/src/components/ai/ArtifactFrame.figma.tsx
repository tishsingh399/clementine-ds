import figma from '@figma/code-connect';
import { ArtifactFrame } from './ArtifactFrame';

// Figma → code link for the Clementine 'ArtifactFrame' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(ArtifactFrame, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=6-617', {
  example: () => (
    <ArtifactFrame title="revoke-sessions.ts" kind="code">await revokeSessions(ids);</ArtifactFrame>
  ),
});
