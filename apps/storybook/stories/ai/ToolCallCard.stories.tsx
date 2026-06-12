import type { Meta, StoryObj } from '@storybook/react';
import { ToolCallCard, Stack } from '@clementine-ds/ui';

const meta: Meta<typeof ToolCallCard> = {
  title: 'AI/ToolCallCard',
  component: ToolCallCard,
  args: { name: 'list_sessions', args: { filter: 'standing', limit: 50 }, result: '3 sessions found', status: 'success', defaultOpen: true },
};

export default meta;
type Story = StoryObj<typeof ToolCallCard>;

export const Success: Story = {};
export const Running: Story = { args: { status: 'running', result: undefined } };
export const Error: Story = { args: { status: 'error', result: 'Permission denied' } };

export const AllStates: Story = {
  render: () => (
    <Stack gap="sm" w={420}>
      <ToolCallCard name="list_sessions" status="pending" args={{ filter: 'standing' }} />
      <ToolCallCard name="list_sessions" status="running" args={{ filter: 'standing' }} />
      <ToolCallCard name="list_sessions" status="success" args={{ filter: 'standing' }} result="3 found" defaultOpen />
      <ToolCallCard name="revoke_session" status="error" args={{ id: 's_91' }} result="Permission denied" defaultOpen />
    </Stack>
  ),
};
