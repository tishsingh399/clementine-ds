import figma from '@figma/code-connect';
import { PromptSuggestions } from './PromptSuggestions';

// Figma → code link for the Clementine 'PromptSuggestions' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(PromptSuggestions, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=16-1057', {
  example: () => (
    <PromptSuggestions suggestions={['Show standing access','Summarize the audit log']} />
  ),
});
