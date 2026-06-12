import figma from '@figma/code-connect';
import { ToolCallCard } from './ToolCallCard';

// Figma → code link for the Clementine 'ToolCallCard' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(ToolCallCard, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=6-623', {
  example: () => (
    <ToolCallCard name="list_sessions" status="success" args={{ filter: 'standing', limit: 50 }} result="3 sessions found" />
  ),
});
