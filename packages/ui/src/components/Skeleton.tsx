import { Skeleton as MantineSkeleton } from '@mantine/core';

export type { SkeletonProps } from '@mantine/core';

/**
 * Clementine Skeleton — a placeholder that mimics content shape while it loads.
 *
 * Use for first-load of known layouts (cards, rows, avatars). Mark the live region
 * `aria-busy="true"` on the container while skeletons show, and respect
 * `prefers-reduced-motion` (the shimmer uses motion.duration-stream). See specs/skeleton/index.md.
 */
export const Skeleton = MantineSkeleton;
