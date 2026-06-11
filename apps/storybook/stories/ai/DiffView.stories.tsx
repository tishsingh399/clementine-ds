import type { Meta, StoryObj } from '@storybook/react';
import { DiffView } from '@clementine-ds/ui';
const meta: Meta<typeof DiffView> = { title:'AI/DiffView', component: DiffView, args:{ lines:[{ type:'context', text:'const ids = await listStanding();' },{ type:'remove', text:'revoke(ids);' },{ type:'add', text:'await revokeSessions(ids);' }], onAccept:()=>{}, onReject:()=>{} }, render:(args)=> <div style={{width:440}}><DiffView {...args} /></div> };
export default meta; type Story = StoryObj<typeof DiffView>;
export const Default: Story = {};
