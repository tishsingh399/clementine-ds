import figma from '@figma/code-connect';
import { CitationChip } from './CitationChip';

// Figma → code link for the Clementine 'CitationChip' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(CitationChip, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=6-626', {
  example: () => (
    <CitationChip index={1} source="retention-policy.md" href="#" />
  ),
});
