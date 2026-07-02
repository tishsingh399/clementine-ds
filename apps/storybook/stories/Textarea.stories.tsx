import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@clementine-ds/ui';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    autosize: { control: 'boolean' },
    error: { control: 'text' },
  },
  args: {
    label: 'Description',
    placeholder: 'Enter description...',
    size: 'md',
    disabled: false,
    autosize: false,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const Autosize: Story = {
  args: { autosize: true, minRows: 3, maxRows: 8 },
};

export const Filled: Story = {
  args: { value: 'This request needs privileged production access for incident response.' },
};

export const WithDescription: Story = {
  args: { description: 'Include enough context for the reviewer to approve safely.' },
};

export const WithError: Story = {
  args: { error: 'Description is required' },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'Disabled content' },
};
