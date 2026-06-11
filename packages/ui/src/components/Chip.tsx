import { Chip as MantineChip } from '@mantine/core';

export type { ChipProps } from '@mantine/core';

/**
 * Clementine Chip — a compact, toggleable selection (filter chip, choice). Distinct from
 * Badge (which is read-only status). Use `ChipGroup` for single/multi selection.
 * Spec: specs/chip/index.md
 */
export const Chip: typeof MantineChip = MantineChip;
export const ChipGroup: typeof MantineChip.Group = MantineChip.Group;
