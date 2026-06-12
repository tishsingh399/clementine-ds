import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '@clementine-ds/ui';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  args: {
    intent: 'info',
    title: 'Heads up',
    children: 'Your session will expire in 5 minutes.',
  },
  argTypes: {
    intent: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
    variant: { control: 'select', options: ['light', 'filled', 'outline'] },
    withCloseButton: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {};

export const Success: Story = {
  args: { intent: 'success', title: 'Saved', children: 'Your changes have been published.' },
};

export const Warning: Story = {
  args: { intent: 'warning', title: 'Approaching limit', children: 'You have used 90% of your seats.' },
};

export const Error: Story = {
  args: { intent: 'error', title: 'Action failed', children: 'We could not revoke the session. Try again.' },
};

export const Dismissible: Story = {
  args: { withCloseButton: true },
};
