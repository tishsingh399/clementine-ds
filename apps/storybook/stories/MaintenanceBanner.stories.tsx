import type { Meta, StoryObj } from '@storybook/react';
import { MaintenanceBanner, Stack } from '@clementine-ds/ui';
const meta: Meta<typeof MaintenanceBanner> = { title:'Enterprise/MaintenanceBanner', component: MaintenanceBanner, args:{ severity:'degraded', message:'Audit export is delayed — we are investigating.' } };
export default meta; type Story = StoryObj<typeof MaintenanceBanner>;
export const Degraded: Story = {};
export const Down: Story = { args:{ severity:'down', message:'Session service is unavailable. Changes are paused.' } };
