import { Button, Menu, ActionIcon, Group } from '@mantine/core';
import { forwardRef } from 'react';

export interface SplitButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  /** Menu items for the secondary actions (e.g. MenuItem nodes). */
  menu: React.ReactNode;
  menuLabel?: string;
}

/**
 * Clementine SplitButton — a primary action joined to a dropdown of related actions
 * (Save / Save as…). Tokens reuse `button.*`. Spec: specs/split-button/index.md
 */
export const SplitButton = forwardRef<HTMLButtonElement, SplitButtonProps>(
  ({ children, onClick, menu, menuLabel = 'More actions' }, ref) => (
    <Group gap={1} wrap="nowrap">
      <Button ref={ref} onClick={onClick} style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
        {children}
      </Button>
      <Menu position="bottom-end" withinPortal>
        <Menu.Target>
          <ActionIcon size={36} variant="filled" aria-label={menuLabel} style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
            ▾
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>{menu}</Menu.Dropdown>
      </Menu>
    </Group>
  ),
);

SplitButton.displayName = 'SplitButton';
