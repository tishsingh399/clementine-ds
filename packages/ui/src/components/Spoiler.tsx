import { Spoiler as MantineSpoiler } from '@mantine/core';

export type { SpoilerProps } from '@mantine/core';

/** Clementine Spoiler — Truncate long content to a max height with a show-more/less toggle. Spec: specs/spoiler/index.md */
export const Spoiler: typeof MantineSpoiler = MantineSpoiler;
