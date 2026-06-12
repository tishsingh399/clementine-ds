import type { Meta, StoryObj } from '@storybook/react';
import { StreamingText, Text } from '@clementine-ds/ui';

const meta: Meta<typeof StreamingText> = {
  title: 'AI/StreamingText',
  component: StreamingText,
  args: { children: 'Revoking standing access for 3 sessions', streaming: true },
};

export default meta;
type Story = StoryObj<typeof StreamingText>;

export const Streaming: Story = {
  render: (args) => (
    <Text size="sm" maw={440}>
      <StreamingText {...args} />
    </Text>
  ),
};

export const Done: Story = {
  args: { streaming: false, children: 'Revoked standing access for 3 sessions.' },
  render: (args) => (
    <Text size="sm" maw={440}>
      <StreamingText {...args} />
    </Text>
  ),
};
