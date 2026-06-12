import type { Meta, StoryObj } from '@storybook/react';
import { Stat, Group } from '@clementine-ds/ui';
const meta: Meta<typeof Stat> = { title:'Components/Stat', component: Stat, args:{ label:'Active sessions', value:'1,284', delta:'+12%', trend:'up' } };
export default meta; type Story = StoryObj<typeof Stat>;
export const Default: Story = {};
export const Row: Story = { render:() => (<Group gap={48}><Stat label="Active sessions" value="1,284" delta="+12%" trend="up" /><Stat label="Standing access" value="37" delta="-4" trend="down" /></Group>) };
