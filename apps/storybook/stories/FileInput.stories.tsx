import type { Meta, StoryObj } from '@storybook/react';
import { FileInput } from '@clementine-ds/ui';
const meta: Meta<typeof FileInput> = { title:'Components/FileInput', component: FileInput, args:{ label:'Upload evidence', placeholder:'Pick a file' } };
export default meta; type Story = StoryObj<typeof FileInput>;
export const Default: Story = {};
export const Multiple: Story = { args:{ multiple:true, placeholder:'Pick files' } };
export const WithError: Story = { args:{ error:'File too large (max 10MB)' } };
