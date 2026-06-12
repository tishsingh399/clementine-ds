import figma from '@figma/code-connect';
import { Accordion, AccordionItem, AccordionControl, AccordionPanel } from './Accordion';

// Figma → code link for the Clementine 'Accordion' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Accordion, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=6-613', {
  example: () => (
    <Accordion defaultValue="access">
          <AccordionItem value="access">
            <AccordionControl>What is standing access?</AccordionControl>
            <AccordionPanel>A permanent grant until revoked.</AccordionPanel>
          </AccordionItem>
        </Accordion>
  ),
});
