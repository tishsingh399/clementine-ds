import type { Meta, StoryObj } from '@storybook/react';
import { ReasoningTrace } from '@clementine-ds/ui';

const meta: Meta<typeof ReasoningTrace> = {
  title: 'AI/ReasoningTrace',
  component: ReasoningTrace,
  args: {
    children:
      'The user asked about standing access. I should query active sessions, filter by access type = standing, then summarize the count before offering to revoke.',
    durationMs: 1200,
  },
};

export default meta;
type Story = StoryObj<typeof ReasoningTrace>;

export const Collapsed: Story = {};
export const Open: Story = { args: { defaultOpen: true } };
export const Streaming: Story = { args: { streaming: true, defaultOpen: true } };
