import type { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from '@clementine-ds/ui';
const meta: Meta<typeof PasswordInput> = { title:'Components/PasswordInput', component: PasswordInput, args:{ label:'Password', placeholder:'Your password' } };
export default meta; type Story = StoryObj<typeof PasswordInput>;
export const Default: Story = {};
export const WithError: Story = { args:{ error:'At least 12 characters' } };
export const Disabled: Story = { args:{ disabled:true } };
