import { Stack, Group, Text } from '@mantine/core';
import { forwardRef } from 'react';

export interface StatProps {
  label: string;
  value: React.ReactNode;
  /** Optional delta, e.g. "+12%". */
  delta?: string;
  trend?: 'up' | 'down';
}

/**
 * Clementine Stat — a KPI/metric tile: a label, a large value, and an optional trend delta.
 * Pair the trend arrow with text + color (not color alone). Tokens: stat.* . Spec: specs/stat/index.md
 */
export const Stat = forwardRef<HTMLDivElement, StatProps>(({ label, value, delta, trend }, ref) => (
  <Stack ref={ref} gap={2}>
    <Text size="xs" style={{ textTransform: 'uppercase', letterSpacing: 0.4, color: 'var(--cds-stat-label)' }}>{label}</Text>
    <Group gap={8} align="baseline">
      <Text fw={700} style={{ fontSize: 'var(--mantine-font-size-2xl)', lineHeight: 1.1, color: 'var(--cds-stat-value)' }}>{value}</Text>
      {delta && (
        <Text size="sm" style={{ color: trend === 'down' ? 'var(--cds-stat-delta-down)' : 'var(--cds-stat-delta-up)' }}>
          {trend === 'down' ? '▾' : '▴'} {delta}
        </Text>
      )}
    </Group>
  </Stack>
));

Stat.displayName = 'Stat';
