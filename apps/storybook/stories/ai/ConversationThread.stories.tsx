import type { Meta, StoryObj } from '@storybook/react';
import { ConversationThread, Message } from '@clementine-ds/ui';
const meta: Meta<typeof ConversationThread> = { title:'AI/ConversationThread', component: ConversationThread, render:() => (
  <div style={{ width: 540 }}><ConversationThread><Message role="user" timestamp="2:13 PM">Which sessions still have standing access?</Message><Message role="assistant" timestamp="2:14 PM">Three do — I can revoke them.</Message></ConversationThread></div>
) };
export default meta; type Story = StoryObj<typeof ConversationThread>;
export const Default: Story = {};
