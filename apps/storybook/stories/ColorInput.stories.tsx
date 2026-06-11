import type { Meta, StoryObj } from '@storybook/react';
import { ColorInput } from '@clementine-ds/ui';
const meta: Meta<typeof ColorInput> = { title:'Components/ColorInput', component: ColorInput, args:{ label:'Brand color', defaultValue:'#2563eb' } };
export default meta; type Story = StoryObj<typeof ColorInput>;
export const Default: Story = {};
