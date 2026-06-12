import figma from '@figma/code-connect';
import { PromptSuggestions } from './PromptSuggestions';

// Figma → code link for the Clementine 'PromptSuggestions' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(PromptSuggestions, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1057', {
  example: () => (
    <PromptSuggestions suggestions={['Show standing access','Summarize the audit log']} />
  ),
});
