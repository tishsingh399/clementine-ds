import {
  AreaChart as MantineAreaChart,
  LineChart as MantineLineChart,
  BarChart as MantineBarChart,
} from '@mantine/charts';

export type { AreaChartProps, LineChartProps, BarChartProps } from '@mantine/charts';

/**
 * Clementine Chart family — Area / Line / Bar over the shared series palette.
 * One spec (specs/chart/index.md) covers all three: same axes, grid, tooltip
 * and series tokens; only the mark geometry differs.
 * Series colors come from chart.series-1..5 (semantic-bound) — pass them via
 * the `series` prop, e.g. { name: 'Revenue', color: 'blue.6' }.
 */
export const AreaChart: typeof MantineAreaChart = MantineAreaChart;
export const LineChart: typeof MantineLineChart = MantineLineChart;
export const BarChart: typeof MantineBarChart = MantineBarChart;
