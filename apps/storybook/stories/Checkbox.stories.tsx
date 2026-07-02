import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@clementine-ds/ui';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
  args: {
    label: 'Accept terms and conditions',
    size: 'md',
    disabled: false,
    indeterminate: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const WithDescription: Story = {
  args: { description: 'Send product and security updates to this address.' },
};

export const WithError: Story = {
  args: {
    error: 'You must accept the terms before continuing.',
    withAsterisk: true,
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};
