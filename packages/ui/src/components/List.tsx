import { List as MantineList } from '@mantine/core';

export type { ListProps } from '@mantine/core';

/** Clementine List — ordered or unordered lists with consistent markers and spacing. Use `ListItem` for items. Spec: specs/list/index.md */
export const List: typeof MantineList = MantineList;
export const ListItem: typeof MantineList.Item = MantineList.Item;
