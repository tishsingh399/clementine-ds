import type { Meta, StoryObj } from '@storybook/react';
import { PinInput } from '@clementine-ds/ui';
const meta: Meta<typeof PinInput> = { title:'Components/PinInput', component: PinInput, args:{ length:6 } };
export default meta; type Story = StoryObj<typeof PinInput>;
export const SixDigit: Story = {};
export const FourDigit: Story = { args:{ length:4 } };
export const Error: Story = { args:{ error:true, length:6 } };
