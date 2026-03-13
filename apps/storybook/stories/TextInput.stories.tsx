import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from '@tina-ds/ui';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    withAsterisk: { control: 'boolean' },
    error: { control: 'text' },
  },
  args: {
    label: 'Label',
    placeholder: 'Enter value...',
    size: 'md',
    disabled: false,
    withAsterisk: false,
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {};

export const WithError: Story = {
  args: { error: 'This field is required', withAsterisk: true },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'Disabled value' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const WithDescription: Story = {
  args: { description: 'Enter your full name' },
};
