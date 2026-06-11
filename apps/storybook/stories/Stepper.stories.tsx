import type { Meta, StoryObj } from '@storybook/react';
import { Stepper, StepperStep, StepperCompleted, Text } from '@clementine-ds/ui';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  args: { active: 1 },
  render: (args) => (
    <Stepper {...args}>
      <StepperStep label="Scope" description="Pick resources">
        <Text size="sm" mt="sm">Step 1 content</Text>
      </StepperStep>
      <StepperStep label="Policy" description="Set least-privilege">
        <Text size="sm" mt="sm">Step 2 content</Text>
      </StepperStep>
      <StepperStep label="Review" description="Confirm + grant">
        <Text size="sm" mt="sm">Step 3 content</Text>
      </StepperStep>
      <StepperCompleted>
        <Text size="sm" mt="sm">All steps complete — access granted.</Text>
      </StepperCompleted>
    </Stepper>
  ),
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Active: Story = {};
export const FirstStep: Story = { args: { active: 0 } };
export const Complete: Story = { args: { active: 3 } };
