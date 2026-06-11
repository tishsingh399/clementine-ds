import { Image as MantineImage } from '@mantine/core';

export type { ImageProps } from '@mantine/core';

/** Clementine Image — responsive image with a fallback. ALWAYS pass `alt` (empty `alt=""` only when decorative). Spec: specs/image/index.md */
export const Image: typeof MantineImage = MantineImage;
