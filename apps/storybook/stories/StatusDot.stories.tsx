import type { Meta, StoryObj } from '@storybook/react';
import { StatusDot, Stack } from '@clementine-ds/ui';
const meta: Meta<typeof StatusDot> = { title:'Components/StatusDot', component: StatusDot, args:{ status:'online' } };
export default meta; type Story = StoryObj<typeof StatusDot>;
export const Online: Story = {};
export const All: Story = { render:() => (<Stack gap="xs"><StatusDot status="online" /><StatusDot status="away" /><StatusDot status="busy" /><StatusDot status="offline" /></Stack>) };
