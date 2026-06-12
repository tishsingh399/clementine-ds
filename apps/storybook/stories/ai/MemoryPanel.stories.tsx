import type { Meta, StoryObj } from '@storybook/react';
import { MemoryPanel } from '@clementine-ds/ui';
const meta: Meta<typeof MemoryPanel> = { title:'AI/MemoryPanel', component: MemoryPanel, args:{ facts:[{ id:'1', text:'Prefers concise answers' },{ id:'2', text:'Works on the SDS design system' },{ id:'3', text:'Reviews access quarterly' }], onDelete:()=>{} }, render:(args)=> <div style={{width:320}}><MemoryPanel {...args} /></div> };
export default meta; type Story = StoryObj<typeof MemoryPanel>;
export const Default: Story = {};
