import { Group, Text, Button } from '@mantine/core';
import { forwardRef } from 'react';

export interface BulkActionBarProps {
  count: number;
  actions?: React.ReactNode;
  onClear?: () => void;
}

/**
 * Enterprise · BulkActionBar — appears when table rows are selected: shows the count and
 * bulk actions. Pairs with a Table + selection. Tokens: bulk-action-bar.* .
 * Spec: specs/bulk-action-bar/index.md
 */
export const BulkActionBar = forwardRef<HTMLDivElement, BulkActionBarProps>(({ count, actions, onClear }, ref) => (
  <Group
    ref={ref}
    justify="space-between"
    px="md"
    py="xs"
    role="region"
    aria-label={`${count} selected`}
    style={{ background: 'var(--tds-surface-subtle)', border: '1px solid var(--tds-border-default)', borderRadius: 8 }}
  >
    <Group gap="sm">
      <Text size="sm" fw={600} style={{ color: 'var(--tds-text-primary)' }}>{count} selected</Text>
      {onClear && <Button size="xs" variant="subtle" color="gray" onClick={onClear}>Clear</Button>}
    </Group>
    <Group gap="xs">{actions}</Group>
  </Group>
));

BulkActionBar.displayName = 'BulkActionBar';
