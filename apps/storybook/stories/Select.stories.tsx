import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@tina-ds/ui';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    clearable: { control: 'boolean' },
    searchable: { control: 'boolean' },
    error: { control: 'text' },
  },
  args: {
    label: 'Select option',
    placeholder: 'Pick one',
    data: ['Option A', 'Option B', 'Option C', 'Option D'],
    size: 'md',
    disabled: false,
    clearable: false,
    searchable: false,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const Searchable: Story = {
  args: { searchable: true },
};

export const Clearable: Story = {
  args: { clearable: true },
};

export const WithError: Story = {
  args: { error: 'Selection required' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
