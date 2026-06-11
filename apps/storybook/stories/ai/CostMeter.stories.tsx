import type { Meta, StoryObj } from '@storybook/react';
import { CostMeter } from '@clementine-ds/ui';
const meta: Meta<typeof CostMeter> = { title:'AI/CostMeter', component: CostMeter, args:{ tokens:'12.4k', cost:'$0.03', latency:'1.2s' } };
export default meta; type Story = StoryObj<typeof CostMeter>;
export const Default: Story = {};
