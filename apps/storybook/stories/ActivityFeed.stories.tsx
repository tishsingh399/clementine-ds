import type { Meta, StoryObj } from '@storybook/react';
import { ActivityFeed } from '@clementine-ds/ui';
const meta: Meta<typeof ActivityFeed> = { title:'Enterprise/ActivityFeed', component: ActivityFeed, args:{ items:[{ id:'1', actor:'Tina Singh', action:'revoked 3 standing sessions', when:'2m ago' },{ id:'2', actor:'Jordan Lee', action:'approved an access request', when:'1h ago' }] }, render:(a)=> <div style={{width:380}}><ActivityFeed {...a} /></div> };
export default meta; type Story = StoryObj<typeof ActivityFeed>; export const Default: Story = {};
