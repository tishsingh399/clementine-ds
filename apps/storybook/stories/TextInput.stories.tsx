import type { Meta, StoryObj } from '@storybook/react';
import { Loader, TextInput } from '@clementine-ds/ui';

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

export const Filled: Story = {
  args: { value: 'Verified value' },
};

export const Loading: Story = {
  args: {
    value: 'Resolving...',
    rightSection: <Loader size="xs" />,
    'aria-busy': true,
  },
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
