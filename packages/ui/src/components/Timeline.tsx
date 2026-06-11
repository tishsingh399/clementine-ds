import { Timeline as MantineTimeline } from '@mantine/core';

export type { TimelineProps } from '@mantine/core';

/** Clementine Timeline — Show a sequence of events over time — an access request lifecycle, an activity log, a process trail. Spec: specs/timeline/index.md */
export const Timeline: typeof MantineTimeline = MantineTimeline;
export const TimelineItem: typeof MantineTimeline.Item = MantineTimeline.Item;