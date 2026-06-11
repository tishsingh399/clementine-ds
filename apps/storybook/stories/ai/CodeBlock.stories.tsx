import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from '@clementine-ds/ui';
const meta: Meta<typeof CodeBlock> = { title:'AI/CodeBlock', component: CodeBlock, render:(args) => (
  <div style={{ width: 440 }}><CodeBlock {...args} filename="revoke-sessions.ts" code={'const ids = await listStanding();\nawait revokeSessions(ids);\nlog("revoked", ids.length);'} /></div>
) };
export default meta; type Story = StoryObj<typeof CodeBlock>;
export const Default: Story = {};
