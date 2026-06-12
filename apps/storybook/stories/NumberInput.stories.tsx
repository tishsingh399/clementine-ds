import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from '@clementine-ds/ui';
const meta: Meta<typeof NumberInput> = { title:'Components/NumberInput', component: NumberInput, args:{ label:'Seats', placeholder:'0', min:0, max:100 } };
export default meta; type Story = StoryObj<typeof NumberInput>;
export const Default: Story = {};
export const WithError: Story = { args:{ error:'Must be between 0 and 100' } };
export const Disabled: Story = { args:{ disabled:true, defaultValue:25 } };
