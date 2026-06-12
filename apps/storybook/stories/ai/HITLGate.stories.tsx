import type { Meta, StoryObj } from '@storybook/react';
import { HITLGate } from '@clementine-ds/ui';

const meta: Meta<typeof HITLGate> = {
  title: 'AI/HITLGate',
  component: HITLGate,
  args: {
    title: 'Approve action: revoke 3 sessions',
    description: 'The agent wants to revoke standing access for 3 users. This signs them out of every device.',
  },
};

export default meta;
type Story = StoryObj<typeof HITLGate>;

export const Pending: Story = {};
export const Destructive: Story = { args: { destructive: true, approveLabel: 'Revoke' } };
export const Approved: Story = { args: { status: 'approved' } };
export const Denied: Story = { args: { status: 'denied' } };
