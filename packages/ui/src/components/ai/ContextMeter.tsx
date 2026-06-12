import { Group, Text } from '@mantine/core';
import { forwardRef } from 'react';

export interface ContextMeterProps {
  /** Tokens used. */
  used: number;
  /** Context window size. */
  total: number;
}

/**
 * Tray 4 · AI — shows how much of the context window is consumed (used / total), warning as
 * it fills. Tokens: context-meter.* . Spec: specs/ai/context-meter/index.md
 */
export const ContextMeter = forwardRef<HTMLDivElement, ContextMeterProps>(({ used, total }, ref) => {
  const pct = Math.min(used / total, 1);
  const warn = pct > 0.85;
  const fill = warn ? 'var(--tds-feedback-warning)' : 'var(--tds-action-primary)';
  return (
    <div ref={ref} style={{ width: 220 }} role="meter" aria-valuenow={used} aria-valuemin={0} aria-valuemax={total} aria-label="Context window used">
      <Group justify="space-between" mb={4}>
        <Text size="xs" c="dimmed">Context</Text>
        <Text size="xs" style={{ color: warn ? 'var(--tds-feedback-warning)' : 'var(--tds-text-tertiary)' }}>
          {used.toLocaleString()} / {total.toLocaleString()}
        </Text>
      </Group>
      <div style={{ height: 6, borderRadius: 99, background: 'var(--tds-surface-subtle)', overflow: 'hidden' }}>
        <div style={{ width: `${pct * 100}%`, height: '100%', background: fill, borderRadius: 99 }} />
      </div>
    </div>
  );
});

ContextMeter.displayName = 'ContextMeter';
