import { Popover as MantinePopover } from '@mantine/core';

export type { PopoverProps } from '@mantine/core';

/**
 * Clementine Popover — a floating panel anchored to a trigger, for rich content
 * (forms, details) that a Tooltip can't hold. Compose `Popover` > `PopoverTarget` +
 * `PopoverDropdown`. Manages focus + Escape. Spec: specs/popover/index.md
 */
export const Popover: typeof MantinePopover = MantinePopover;
export const PopoverTarget: typeof MantinePopover.Target = MantinePopover.Target;
export const PopoverDropdown: typeof MantinePopover.Dropdown = MantinePopover.Dropdown;
