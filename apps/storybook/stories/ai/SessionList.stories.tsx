import type { Meta, StoryObj } from '@storybook/react';
import { SessionList } from '@clementine-ds/ui';
const meta: Meta<typeof SessionList> = { title:'AI/SessionList', component: SessionList, args:{ activeId:'1', onOpen:()=>{}, sessions:[{ id:'1', title:'Standing access review', when:'2h' },{ id:'2', title:'Audit log summary', when:'1d' },{ id:'3', title:'Least-privilege policy draft', when:'3d' }] }, render:(args)=> <div style={{width:280}}><SessionList {...args} /></div> };
export default meta; type Story = StoryObj<typeof SessionList>;
export const Default: Story = {};
