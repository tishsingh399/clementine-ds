import type { Meta, StoryObj } from '@storybook/react';
import { SessionDeviceList } from '@clementine-ds/ui';
const meta: Meta<typeof SessionDeviceList> = { title:'Enterprise/SessionDeviceList', component: SessionDeviceList, args:{ onRevoke:()=>{}, sessions:[{ id:'1', device:'MacBook Pro 16"', location:'New York, US', lastActive:'Active now', current:true },{ id:'2', device:'iPhone 15', location:'New York, US', lastActive:'2h ago' },{ id:'3', device:'Chrome · Windows', location:'Unknown', lastActive:'3d ago' }] }, render:(a)=> <div style={{width:420}}><SessionDeviceList {...a} /></div> };
export default meta; type Story = StoryObj<typeof SessionDeviceList>; export const Default: Story = {};
