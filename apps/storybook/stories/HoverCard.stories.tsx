import type { Meta, StoryObj } from '@storybook/react';
import { HoverCard, HoverCardTarget, HoverCardDropdown, Button, Text } from '@clementine-ds/ui';
const meta: Meta<typeof HoverCard> = { title:'Components/HoverCard', component: HoverCard, args:{ width:260, shadow:'lg', withArrow:true }, render:(args) => (
  <HoverCard {...args}>
    <HoverCardTarget><Button variant="outline">Tina Singh</Button></HoverCardTarget>
    <HoverCardDropdown><Text size="sm">Senior UX/UI Designer · Standing access to 3 systems · Last active 2h ago</Text></HoverCardDropdown>
  </HoverCard>
) };
export default meta; type Story = StoryObj<typeof HoverCard>;
export const Default: Story = {};
