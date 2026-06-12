import type { Meta, StoryObj } from '@storybook/react';
import { Sparkline } from '@clementine-ds/ui';

const meta: Meta<typeof Sparkline> = {
  title: 'Components/Sparkline',
  component: Sparkline,
  args: { w: 200, h: 48, data: [10, 22, 18, 30, 26, 38, 44], curveType: 'natural' },
};
export default meta; type Story = StoryObj<typeof Sparkline>;

export const Default: Story = { args: { color: 'blue.6' } };
export const TrendUp: Story = { args: { color: 'green.6', fillOpacity: 0.3 } };
export const TrendDown: Story = { args: { data: [44, 38, 40, 30, 26, 18, 10], color: 'red.6', fillOpacity: 0.3 } };
