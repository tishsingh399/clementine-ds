import { Menu as MantineMenu } from '@mantine/core';

export type {
  MenuProps,
  MenuItemProps,
  MenuLabelProps,
  MenuDividerProps,
  MenuTargetProps,
  MenuDropdownProps,
} from '@mantine/core';

/**
 * Clementine Menu — a dropdown list of actions triggered by a control.
 *
 * Compose: `Menu` > `MenuTarget` (the trigger) + `MenuDropdown` (items, labels, dividers).
 * The dropdown is a `role="menu"` with arrow-key roving focus; use `color="red"` on a
 * `MenuItem` for destructive actions. See specs/menu/index.md.
 */
export const Menu = MantineMenu;
export const MenuTarget: typeof MantineMenu.Target = MantineMenu.Target;
export const MenuDropdown: typeof MantineMenu.Dropdown = MantineMenu.Dropdown;
export const MenuItem: typeof MantineMenu.Item = MantineMenu.Item;
export const MenuLabel: typeof MantineMenu.Label = MantineMenu.Label;
export const MenuDivider: typeof MantineMenu.Divider = MantineMenu.Divider;
