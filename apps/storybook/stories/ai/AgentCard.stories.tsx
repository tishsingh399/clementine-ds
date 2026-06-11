import type { Meta, StoryObj } from '@storybook/react';
import { AgentCard } from '@clementine-ds/ui';
const meta: Meta<typeof AgentCard> = { title:'AI/AgentCard', component: AgentCard, args:{ name:'Access Auditor', description:'Reviews standing access and flags least-privilege violations.', capabilities:['sessions:read','audit:read','report'], owner:'Security team' }, render:(args)=> <div style={{width:320}}><AgentCard {...args} /></div> };
export default meta; type Story = StoryObj<typeof AgentCard>;
export const Default: Story = {};
