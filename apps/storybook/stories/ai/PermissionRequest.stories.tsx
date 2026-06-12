import type { Meta, StoryObj } from '@storybook/react';
import { PermissionRequest } from '@clementine-ds/ui';
const meta: Meta<typeof PermissionRequest> = { title:'AI/PermissionRequest', component: PermissionRequest, args:{ action:'Read your session list and revoke standing access', scope:'sessions:read sessions:revoke', onAllow:()=>{}, onDeny:()=>{} }, render:(args)=> <div style={{width:380}}><PermissionRequest {...args} /></div> };
export default meta; type Story = StoryObj<typeof PermissionRequest>;
export const Default: Story = {};
