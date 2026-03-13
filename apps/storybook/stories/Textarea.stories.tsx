import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@tina-ds/ui';

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

export const WithError: Story = {
  args: { error: 'Description is required' },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'Disabled content' },
};
