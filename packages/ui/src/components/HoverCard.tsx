import { HoverCard as MantineHoverCard } from '@mantine/core';

export type { HoverCardProps } from '@mantine/core';

/** Clementine HoverCard — Reveal supplementary, non-interactive detail on hover/focus — a richer Tooltip (avatar preview, definition, stats). Spec: specs/hover-card/index.md */
export const HoverCard: typeof MantineHoverCard = MantineHoverCard;
export const HoverCardTarget: typeof MantineHoverCard.Target = MantineHoverCard.Target;
export const HoverCardDropdown: typeof MantineHoverCard.Dropdown = MantineHoverCard.Dropdown;