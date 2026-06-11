import type { Meta, StoryObj } from '@storybook/react';
import { Message, Stack } from '@clementine-ds/ui';

const meta: Meta<typeof Message> = {
  title: 'AI/Message',
  component: Message,
  argTypes: {
    role: { control: 'select', options: ['user', 'assistant', 'system'] },
    status: { control: 'select', options: ['sending', 'streaming', 'complete', 'error'] },
  },
  args: { role: 'assistant', children: 'Three sessions still have standing access. I can revoke them.', timestamp: '2:14 PM' },
};

export default meta;
type Story = StoryObj<typeof Message>;

export const Assistant: Story = {};
export const User: Story = { args: { role: 'user', children: 'Which sessions still have standing access?', timestamp: '2:13 PM' } };
export const System: Story = { args: { role: 'system', children: 'Conversation started.', timestamp: undefined } };
export const Error: Story = { args: { role: 'user', status: 'error', children: 'Revoke all sessions' } };

export const Thread: Story = {
  render: () => (
    <Stack gap="md" w={520}>
      <Message role="user" timestamp="2:13 PM">Which sessions still have standing access?</Message>
      <Message role="assistant" timestamp="2:14 PM">Three do — I can revoke them for you.</Message>
    </Stack>
  ),
};
