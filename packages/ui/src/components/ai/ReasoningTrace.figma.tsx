import figma from '@figma/code-connect';
import { ReasoningTrace } from './ReasoningTrace';

// Figma → code link for the Clementine 'ReasoningTrace' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(ReasoningTrace, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=6-624', {
  example: () => (
    <ReasoningTrace durationMs={1200}>Query active sessions, filter by access type, then summarize.</ReasoningTrace>
  ),
});
