import { Stack, Text } from '@mantine/core';
import { forwardRef } from 'react';

export interface ErrorStateProps {
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

/**
 * Clementine ErrorState — A centered failure state with a cause and an optional retry.
 * Tokens: error-state.* . Spec: specs/error-state/index.md
 */
export const ErrorState = forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ title = 'Something went wrong', description, action }, ref) => (
    <Stack ref={ref} align="center" gap={8} role="alert"
      style={{ background: 'var(--cds-feedback-error-subtle)', borderRadius: 8, padding: '32px 24px', textAlign: 'center' }}>
      <span aria-hidden style={{ color: 'var(--cds-feedback-error)', fontSize: 26, lineHeight: 1 }}>⊘</span>
      <Text fw={600} style={{ color: 'var(--cds-text-primary)' }}>{title}</Text>
      {description && <Text size="sm" style={{ color: 'var(--cds-text-secondary)', maxWidth: 380 }}>{description}</Text>}
      {action && <div style={{ marginTop: 4 }}>{action}</div>}
    </Stack>
  )
);

ErrorState.displayName = 'ErrorState';
