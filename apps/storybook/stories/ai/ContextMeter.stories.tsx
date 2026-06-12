import type { Meta, StoryObj } from '@storybook/react';
import { ContextMeter, Stack } from '@clementine-ds/ui';
const meta: Meta<typeof ContextMeter> = { title:'AI/ContextMeter', component: ContextMeter, args:{ used:48000, total:200000 } };
export default meta; type Story = StoryObj<typeof ContextMeter>;
export const Default: Story = {};
export const NearLimit: Story = { args:{ used:182000, total:200000 } };
