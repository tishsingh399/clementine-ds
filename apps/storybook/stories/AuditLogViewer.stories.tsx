import type { Meta, StoryObj } from '@storybook/react';
import { AuditLogViewer } from '@clementine-ds/ui';
const meta: Meta<typeof AuditLogViewer> = { title:'Enterprise/AuditLogViewer', component: AuditLogViewer, args:{ entries:[{ id:'1', actor:'tina@bt', action:'revoke_session', target:'s_91', when:'14:14:02' },{ id:'2', actor:'agent:auditor', action:'list_sessions', target:'filter=standing', when:'14:13:55' },{ id:'3', actor:'jordan@bt', action:'approve_request', target:'req_42', when:'13:02:10' }] }, render:(a)=> <div style={{width:560}}><AuditLogViewer {...a} /></div> };
export default meta; type Story = StoryObj<typeof AuditLogViewer>; export const Default: Story = {};
