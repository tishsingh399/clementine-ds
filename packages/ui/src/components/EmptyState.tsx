import { Stack, Text } from '@mantine/core';
import { forwardRef } from 'react';

export interface EmptyStateProps {
  title: string;
  description?: React.ReactNode;
  /** Decorative glyph or icon node. */
  icon?: React.ReactNode;
  /** Optional action slot (e.g. a Button). */
  action?: React.ReactNode;
}

/**
 * Clementine EmptyState — A centered placeholder for no-data or cleared-filter views, with an optional next action.
 * Tokens: empty-state.* . Spec: specs/empty-state/index.md
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ title, description, icon, action }, ref) => (
    <Stack ref={ref} align="center" gap={8} role="status"
      style={{ background: 'var(--cds-surface-subtle)', borderRadius: 8, padding: '32px 24px', textAlign: 'center' }}>
      <span aria-hidden style={{ color: 'var(--cds-text-tertiary)', fontSize: 28, lineHeight: 1 }}>{icon ?? '○'}</span>
      <Text fw={600} style={{ color: 'var(--cds-text-primary)' }}>{title}</Text>
      {description && <Text size="sm" style={{ color: 'var(--cds-text-secondary)', maxWidth: 380 }}>{description}</Text>}
      {action && <div style={{ marginTop: 4 }}>{action}</div>}
    </Stack>
  )
);

EmptyState.displayName = 'EmptyState';
