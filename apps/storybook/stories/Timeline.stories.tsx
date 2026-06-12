import type { Meta, StoryObj } from '@storybook/react';
import { Timeline, TimelineItem, Text } from '@clementine-ds/ui';
const meta: Meta<typeof Timeline> = { title:'Components/Timeline', component: Timeline, args:{ active:1, bulletSize:18 }, render:(args) => (
  <Timeline {...args} w={420}>
    <TimelineItem title="Access requested"><Text size="sm" c="dimmed">Tina requested standing access</Text></TimelineItem>
    <TimelineItem title="Approved"><Text size="sm" c="dimmed">Approved by Jordan Lee</Text></TimelineItem>
    <TimelineItem title="Granted"><Text size="sm" c="dimmed">Scoped to read-only</Text></TimelineItem>
  </Timeline>
) };
export default meta; type Story = StoryObj<typeof Timeline>;
export const Active: Story = {};
export const AllComplete: Story = { args:{ active:3 } };
