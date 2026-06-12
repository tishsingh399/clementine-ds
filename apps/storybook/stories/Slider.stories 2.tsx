import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '@clementine-ds/ui';
const meta: Meta<typeof Slider> = { title:'Components/Slider', component: Slider, args:{ defaultValue:40 } };
export default meta; type Story = StoryObj<typeof Slider>;
export const Default: Story = {};
export const WithMarks: Story = { args:{ marks:[{ value:0, label:'0' },{ value:50, label:'50' },{ value:100, label:'100' }] } };
export const Disabled: Story = { args:{ disabled:true, defaultValue:60 } };
