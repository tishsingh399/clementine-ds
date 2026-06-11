import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, AccordionControl, AccordionPanel, Text } from '@clementine-ds/ui';

const items = (
  <>
    <AccordionItem value="access">
      <AccordionControl>What is standing access?</AccordionControl>
      <AccordionPanel>
        <Text size="sm">A permanent permission grant that stays in place until it is manually revoked.</Text>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="jit">
      <AccordionControl>How does just-in-time access work?</AccordionControl>
      <AccordionPanel>
        <Text size="sm">Access is requested on demand, approved, and expires automatically after the window closes.</Text>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value="audit">
      <AccordionControl>Where are audit logs stored?</AccordionControl>
      <AccordionPanel>
        <Text size="sm">Session logs are retained for 400 days in the regional audit store.</Text>
      </AccordionPanel>
    </AccordionItem>
  </>
);

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    variant: { control: 'select', options: ['default', 'contained', 'filled', 'separated'] },
  },
  args: { defaultValue: 'access', variant: 'separated' },
  render: (args) => (
    <Accordion {...args} w={420}>
      {items}
    </Accordion>
  ),
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Separated: Story = {};

export const Contained: Story = { args: { variant: 'contained' } };

export const Multiple: Story = {
  render: () => (
    <Accordion multiple defaultValue={['access', 'jit']} variant="separated" w={420}>
      {items}
    </Accordion>
  ),
};
