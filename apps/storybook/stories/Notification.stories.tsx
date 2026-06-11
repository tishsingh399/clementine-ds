import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from '@clementine-ds/ui';
const meta: Meta<typeof Notification> = { title:'Components/Notification', component: Notification, args:{ title:'Session revoked', children:'User signed out of all devices.' }, render:(args) => <div style={{ width: 380 }}><Notification {...args} /></div> };
export default meta; type Story = StoryObj<typeof Notification>;
export const Default: Story = {};
export const Success: Story = { args:{ color:'green', title:'Saved' } };
export const Error: Story = { args:{ color:'red', title:'Action failed', children:'Could not revoke the session.' } };
export const Loading: Story = { args:{ loading:true, title:'Revoking…' } };
