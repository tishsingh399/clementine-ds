import type { Meta, StoryObj } from '@storybook/react';
import { ConfidenceMeter } from '@clementine-ds/ui';
const meta: Meta<typeof ConfidenceMeter> = { title:'AI/ConfidenceMeter', component: ConfidenceMeter, args:{ level:'high' } };
export default meta; type Story = StoryObj<typeof ConfidenceMeter>;
export const High: Story = {};
export const Medium: Story = { args:{ level:'medium' } };
export const Low: Story = { args:{ level:'low' } };
