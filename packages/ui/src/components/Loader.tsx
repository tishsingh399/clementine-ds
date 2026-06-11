import { Loader as MantineLoader } from '@mantine/core';

export type { LoaderProps } from '@mantine/core';

/** Clementine Loader — indeterminate spinner for unknown-duration work. Pair with aria-busy + a label. Spec: specs/loader/index.md */
export const Loader: typeof MantineLoader = MantineLoader;
