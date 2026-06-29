import { Stack, Text, Loader } from '@mantine/core';
import { forwardRef } from 'react';

export interface LoadingStateProps {
  label?: string;
}

/**
 * Clementine LoadingState — A centered spinner with a label for a loading region.
 * Tokens: loading-state.* . Spec: specs/loading-state/index.md
 */
export const LoadingState = forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ label = 'Loading…' }, ref) => (
    <Stack ref={ref} align="center" gap={10} role="status" aria-live="polite"
      style={{ background: 'var(--cds-surface-default)', padding: '28px 24px' }}>
      <Loader color="var(--cds-action-primary)" size="sm" />
      <Text size="sm" style={{ color: 'var(--cds-text-secondary)' }}>{label}</Text>
    </Stack>
  )
);

LoadingState.displayName = 'LoadingState';
