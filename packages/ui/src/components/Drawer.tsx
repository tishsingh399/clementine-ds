import { Drawer as MantineDrawer, type DrawerProps as MantineDrawerProps } from '@mantine/core';

export interface DrawerProps extends MantineDrawerProps {}

/**
 * Clementine Drawer — a panel that slides in from a screen edge for secondary tasks
 * (filters, details, create/edit) without leaving the page.
 *
 * Like Modal, it traps focus, closes on Escape + overlay click, and restores focus on close.
 * Prefer a Drawer over a Modal when the task is contextual to the page behind it.
 * See specs/drawer/index.md.
 */
export function Drawer(props: DrawerProps) {
  return <MantineDrawer {...props} />;
}

Drawer.displayName = 'Drawer';
