import type { Meta, StoryObj } from '@storybook/react';
import { NotificationCenter } from '@clementine-ds/ui';
const meta: Meta<typeof NotificationCenter> = { title:'Enterprise/NotificationCenter', component: NotificationCenter, args:{ notifications:[{ id:'1', title:'Standing access flagged', body:'3 users exceed least-privilege', when:'2m', read:false },{ id:'2', title:'Audit export ready', when:'1h', read:true }], onMarkRead:()=>{} } };
export default meta; type Story = StoryObj<typeof NotificationCenter>; export const Default: Story = {};
