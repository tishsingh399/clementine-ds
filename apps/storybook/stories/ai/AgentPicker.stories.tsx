import type { Meta, StoryObj } from '@storybook/react';
import { AgentPicker } from '@clementine-ds/ui';
const meta: Meta<typeof AgentPicker> = { title:'AI/AgentPicker', component: AgentPicker, args:{ label:'Agent', agents:['Access Auditor','Policy Drafter','Session Triage'], defaultValue:'Access Auditor' } };
export default meta; type Story = StoryObj<typeof AgentPicker>;
export const Default: Story = {};
