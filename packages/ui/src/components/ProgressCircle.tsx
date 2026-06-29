import { RingProgress, Text, Center } from '@mantine/core';
import { forwardRef } from 'react';

export interface ProgressCircleProps {
  value: number;
  size?: number;
  label?: React.ReactNode;
}

/**
 * Clementine ProgressCircle — A circular determinate progress indicator with a center label.
 * Tokens: progress-circle.* . Spec: specs/progress-circle/index.md
 */
export const ProgressCircle = forwardRef<HTMLDivElement, ProgressCircleProps>(
  ({ value, size = 84, label }, ref) => {
    const pct = Math.min(100, Math.max(0, value));
    return (
      <div ref={ref} role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
        <RingProgress size={size} thickness={Math.max(6, Math.round(size / 12))} roundCaps
          rootColor="var(--cds-surface-subtle)"
          sections={[{ value: pct, color: 'var(--cds-action-primary)' }]}
          label={<Center><Text fw={600} size="sm" style={{ color: 'var(--cds-text-primary)' }}>{label ?? (Math.round(pct) + '%')}</Text></Center>} />
      </div>
    );
  }
);

ProgressCircle.displayName = 'ProgressCircle';
