import { Card as MantineCard } from '@mantine/core';

export type { CardProps, CardSectionProps } from '@mantine/core';

/**
 * Clementine Card — an elevated surface that groups related content.
 *
 * House defaults (set in clementine-theme): bordered, radius `lg`, shadow `sm`, padding `lg`.
 * Use `CardSection` for full-bleed regions (media, footers). See specs/card/index.md.
 */
export const Card = MantineCard;
export const CardSection = MantineCard.Section;
