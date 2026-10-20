import { forwardRef, useMemo } from 'react';
import {
  AreaChart as MantineAreaChart,
  LineChart as MantineLineChart,
  BarChart as MantineBarChart,
  type AreaChartProps,
  type LineChartProps,
  type BarChartProps,
} from '@mantine/charts';

export type { AreaChartProps, LineChartProps, BarChartProps };

/**
 * recharts 3 keeps `data` in an Immer store, which deep-freezes it — so the
 * caller's own array (and every row in it) would become read-only after the
 * first render. Hand recharts a copy instead.
 */
function useOwnCopy<T extends object>(data: T[]): T[] {
  return useMemo(() => data.map((row) => ({ ...row })), [data]);
}

/**
 * Clementine Chart family — Area / Line / Bar over the shared series palette.
 * One spec (specs/chart/index.md) covers all three: same axes, grid, tooltip
 * and series tokens; only the mark geometry differs.
 * Series colors come from chart.series-1..5 (semantic-bound) — pass them via
 * the `series` prop, e.g. { name: 'Revenue', color: 'blue.6' }.
 */
export const AreaChart = forwardRef<HTMLDivElement, AreaChartProps>(({ data, ...props }, ref) => (
  <MantineAreaChart ref={ref} {...props} data={useOwnCopy(data)} />
));
AreaChart.displayName = 'AreaChart';

export const LineChart = forwardRef<HTMLDivElement, LineChartProps>(({ data, ...props }, ref) => (
  <MantineLineChart ref={ref} {...props} data={useOwnCopy(data)} />
));
LineChart.displayName = 'LineChart';

export const BarChart = forwardRef<HTMLDivElement, BarChartProps>(({ data, ...props }, ref) => (
  <MantineBarChart ref={ref} {...props} data={useOwnCopy(data)} />
));
BarChart.displayName = 'BarChart';
