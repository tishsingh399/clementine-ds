import type { Meta, StoryObj } from '@storybook/react';
import { AreaChart, LineChart, BarChart } from '@clementine-ds/ui';

const data = [
  { month: 'Jan', Revenue: 420, Cost: 210 },
  { month: 'Feb', Revenue: 510, Cost: 240 },
  { month: 'Mar', Revenue: 470, Cost: 230 },
  { month: 'Apr', Revenue: 620, Cost: 260 },
  { month: 'May', Revenue: 700, Cost: 290 },
];
// Series colors map chart.series-1 / series-2 (action.primary / feedback.success)
const series = [
  { name: 'Revenue', color: 'blue.6' },
  { name: 'Cost', color: 'green.6' },
];

const meta: Meta<typeof AreaChart> = {
  title: 'Components/Chart',
  component: AreaChart,
  args: { h: 240, data, dataKey: 'month', series },
};
export default meta; type Story = StoryObj<typeof AreaChart>;

export const Area: Story = {};
export const Line: Story = { render: (args) => <LineChart {...args} /> };
export const Bar: Story = { render: (args) => <BarChart {...args} /> };
