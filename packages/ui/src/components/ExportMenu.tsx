import { Menu, Button } from '@mantine/core';
import { forwardRef } from 'react';

export interface ExportMenuProps {
  formats?: string[];
  onExport?: (format: string) => void;
  label?: string;
}

/**
 * Enterprise · ExportMenu — a dropdown of export formats (CSV, JSON, PDF…) for a data view.
 * Tokens reuse `menu.*`. Spec: specs/export-menu/index.md
 */
export const ExportMenu = forwardRef<HTMLButtonElement, ExportMenuProps>(
  ({ formats = ['CSV', 'JSON', 'PDF'], onExport, label = 'Export' }, ref) => (
    <Menu position="bottom-end" withinPortal>
      <Menu.Target>
        <Button ref={ref} variant="default" size="sm">{label} ▾</Button>
      </Menu.Target>
      <Menu.Dropdown>
        {formats.map((f) => <Menu.Item key={f} onClick={() => onExport?.(f)}>{f}</Menu.Item>)}
      </Menu.Dropdown>
    </Menu>
  ),
);

ExportMenu.displayName = 'ExportMenu';
