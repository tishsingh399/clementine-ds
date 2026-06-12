import figma from '@figma/code-connect';
import { Stepper, StepperStep } from './Stepper';

// Figma → code link for the Clementine 'Stepper' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Stepper, 'https://www.figma.com/design/kPBBglpMr7MVjejDjc19hy/Clementine-DS?node-id=16-1044', {
  example: () => (
    <Stepper active={1}><StepperStep label="Scope" /><StepperStep label="Review" /></Stepper>
  ),
});
