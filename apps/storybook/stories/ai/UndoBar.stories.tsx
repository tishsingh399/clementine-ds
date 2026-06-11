import type { Meta, StoryObj } from '@storybook/react';
import { UndoBar } from '@clementine-ds/ui';
const meta: Meta<typeof UndoBar> = { title:'AI/UndoBar', component: UndoBar, args:{ message:'Revoked 3 sessions', onUndo:()=>{} }, render:(args)=> <div style={{width:380}}><UndoBar {...args} /></div> };
export default meta; type Story = StoryObj<typeof UndoBar>;
export const Default: Story = {};
