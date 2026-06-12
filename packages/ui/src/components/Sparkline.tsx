import { Sparkline as MantineSparkline } from '@mantine/charts';

export type { SparklineProps } from '@mantine/charts';

/** Clementine Sparkline — axis-less inline trend for table cells and stat cards. Spec: specs/sparkline/index.md */
export const Sparkline: typeof MantineSparkline = MantineSparkline;
