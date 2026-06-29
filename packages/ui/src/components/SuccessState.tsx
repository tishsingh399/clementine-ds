import { Stack, Text } from '@mantine/core';
import { forwardRef } from 'react';

export interface SuccessStateProps {
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

/**
 * Clementine SuccessState — A centered confirmation state for a completed flow.
 * Tokens: success-state.* . Spec: specs/success-state/index.md
 */
export const SuccessState = forwardRef<HTMLDivElement, SuccessStateProps>(
  ({ title = 'All done', description, action }, ref) => (
    <Stack ref={ref} align="center" gap={8} role="status"
      style={{ background: 'var(--cds-feedback-success-subtle)', borderRadius: 8, padding: '32px 24px', textAlign: 'center' }}>
      <span aria-hidden style={{ color: 'var(--cds-feedback-success)', fontSize: 26, lineHeight: 1 }}>✓</span>
      <Text fw={600} style={{ color: 'var(--cds-text-primary)' }}>{title}</Text>
      {description && <Text size="sm" style={{ color: 'var(--cds-text-secondary)', maxWidth: 380 }}>{description}</Text>}
      {action && <div style={{ marginTop: 4 }}>{action}</div>}
    </Stack>
  )
);

SuccessState.displayName = 'SuccessState';
