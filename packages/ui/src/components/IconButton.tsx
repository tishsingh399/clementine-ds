import { ActionIcon as MantineActionIcon } from '@mantine/core';

export type { ActionIconProps as IconButtonProps } from '@mantine/core';

/** Clementine IconButton — an icon-only action (toolbar, row action). ALWAYS set `aria-label`; pair with a Tooltip. Spec: specs/icon-button/index.md */
export const IconButton: typeof MantineActionIcon = MantineActionIcon;
