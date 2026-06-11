import { Pill as MantinePill } from '@mantine/core';

export type { PillProps } from '@mantine/core';

/**
 * Clementine Pill — a compact, removable token (a selected value, a filter). Distinct from
 * Badge (read-only status) and Chip (toggleable choice). Use `PillGroup` to wrap a set.
 * Spec: specs/pill/index.md
 */
export const Pill: typeof MantinePill = MantinePill;
export const PillGroup: typeof MantinePill.Group = MantinePill.Group;
