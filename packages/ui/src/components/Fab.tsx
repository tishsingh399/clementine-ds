import { ActionIcon, type ActionIconProps } from '@mantine/core';
import { forwardRef } from 'react';

export interface FabProps extends ActionIconProps {
  /** Required — a FAB is icon-only. */
  'aria-label': string;
}

/**
 * Clementine Fab — a floating action button for the single primary action on a surface.
 * Icon-only, so `aria-label` is required. One per screen. Spec: specs/fab/index.md
 */
export const Fab = forwardRef<HTMLButtonElement, FabProps>((props, ref) => (
  <ActionIcon ref={ref} radius="xl" size={56} {...props} />
));

Fab.displayName = 'Fab';
