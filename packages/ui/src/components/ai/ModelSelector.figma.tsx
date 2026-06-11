import figma from '@figma/code-connect';
import { ModelSelector } from './ModelSelector';

// Figma → code link for the Clementine 'ModelSelector' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(ModelSelector, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1059', {
  example: () => (
    <ModelSelector label='Model' models={['claude-opus-4-8','claude-haiku-4-5']} defaultValue='claude-opus-4-8' />
  ),
});
