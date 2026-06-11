import type { Meta, StoryObj } from '@storybook/react';
import { MessageActions } from '@clementine-ds/ui';
const meta: Meta<typeof MessageActions> = { title:'AI/MessageActions', component: MessageActions, args:{ onCopy:()=>{}, onEdit:()=>{}, onRegenerate:()=>{}, onBranch:()=>{} } };
export default meta; type Story = StoryObj<typeof MessageActions>;
export const Default: Story = {};
