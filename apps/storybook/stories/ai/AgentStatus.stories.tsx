import type { Meta, StoryObj } from '@storybook/react';
import { AgentStatus, Stack } from '@clementine-ds/ui';
const meta: Meta<typeof AgentStatus> = { title:'AI/AgentStatus', component: AgentStatus, args:{ state:'thinking' } };
export default meta; type Story = StoryObj<typeof AgentStatus>;
export const Thinking: Story = {};
export const All: Story = { render:() => (<Stack gap="xs"><AgentStatus state="idle" /><AgentStatus state="thinking" /><AgentStatus state="tool" /><AgentStatus state="waiting" /><AgentStatus state="done" /><AgentStatus state="error" /><AgentStatus state="refused" /></Stack>) };
