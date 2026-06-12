import { Calendar as MantineCalendar } from '@mantine/dates';

export type { CalendarProps } from '@mantine/dates';

/** Clementine Calendar — read-mostly month grid for displaying dates and availability (no selection contract). Spec: specs/calendar/index.md */
export const Calendar: typeof MantineCalendar = MantineCalendar;
