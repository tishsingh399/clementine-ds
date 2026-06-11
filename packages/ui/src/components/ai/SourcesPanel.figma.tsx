import figma from '@figma/code-connect';
import { SourcesPanel } from './SourcesPanel';

// Figma → code link for the Clementine 'SourcesPanel' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(SourcesPanel, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1061', {
  example: () => (
    <SourcesPanel sources={[{ index: 1, title: 'retention-policy.md', url: '#' }]} />
  ),
});
