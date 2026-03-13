import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup, Stack } from '@tina-ds/ui';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio',
  component: RadioGroup,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
  args: {
    label: 'Select your role',
    size: 'md',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Stack gap="xs" mt="xs">
        <Radio value="admin" label="Administrator" />
        <Radio value="operator" label="Operator" />
        <Radio value="auditor" label="Auditor" />
        <Radio value="viewer" label="Viewer" />
      </Stack>
    </RadioGroup>
  ),
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};

export const WithDefault: Story = {
  args: { defaultValue: 'operator' },
};

export const WithDescription: Story = {
  args: { description: 'Choose the role for this user' },
};
