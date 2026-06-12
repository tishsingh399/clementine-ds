import { Progress as MantineProgress } from '@mantine/core';

export type { ProgressProps } from '@mantine/core';

/**
 * Clementine Progress — a determinate bar for task completion (upload, import, quota).
 *
 * Set `aria-label` (or pair with a visible label) and use color to reinforce, never to
 * carry meaning alone — pair `color="red"` with text. For indeterminate / unknown-duration
 * work, use Skeleton or a spinner instead. See specs/progress/index.md.
 */
export const Progress: typeof MantineProgress = MantineProgress;
