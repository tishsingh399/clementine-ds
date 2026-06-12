import { Group, Text } from '@mantine/core';
import { forwardRef } from 'react';

export interface CostMeterProps {
  tokens?: string | number;
  cost?: string;
  latency?: string;
}

/**
 * Tray 4 · AI — usage transparency for a run: tokens, estimated cost, and elapsed latency.
 * Enterprise-critical (usage is billable + audited). Tokens: cost-meter.* .
 * Spec: specs/ai/cost-meter/index.md
 */
export const CostMeter = forwardRef<HTMLDivElement, CostMeterProps>(({ tokens, cost, latency }, ref) => {
  const items: [string, string | number | undefined][] = [
    ['Tokens', tokens],
    ['Cost', cost],
    ['Latency', latency],
  ];
  return (
    <Group ref={ref} gap={16}>
      {items.filter(([, v]) => v != null).map(([label, v]) => (
        <Group key={label} gap={4} align="baseline">
          <Text size="xs" style={{ color: 'var(--tds-text-tertiary)' }}>{label}</Text>
          <Text size="xs" fw={600} style={{ color: 'var(--tds-text-secondary)' }}>{v}</Text>
        </Group>
      ))}
    </Group>
  );
});

CostMeter.displayName = 'CostMeter';
