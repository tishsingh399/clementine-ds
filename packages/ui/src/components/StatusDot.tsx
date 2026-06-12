import { Group, Text } from '@mantine/core';
import { forwardRef } from 'react';

export type StatusKind = 'online' | 'offline' | 'busy' | 'away' | 'neutral';

export interface StatusDotProps {
  status: StatusKind;
  /** Override the default text label. */
  label?: string;
}

const MAP: Record<StatusKind, { color: string; text: string }> = {
  online:  { color: 'var(--tds-feedback-success)', text: 'Online' },
  offline: { color: 'var(--tds-text-tertiary)',    text: 'Offline' },
  busy:    { color: 'var(--tds-feedback-error)',   text: 'Busy' },
  away:    { color: 'var(--tds-feedback-warning)', text: 'Away' },
  neutral: { color: 'var(--tds-text-tertiary)',    text: 'Unknown' },
};

/**
 * Clementine StatusDot — a small colored dot + text label for presence/health state.
 * Status is carried by the dot AND the label, never color alone (WCAG 1.4.1).
 * Tokens: status-dot.* . Spec: specs/status-dot/index.md
 */
export const StatusDot = forwardRef<HTMLDivElement, StatusDotProps>(({ status, label }, ref) => {
  const m = MAP[status];
  return (
    <Group ref={ref} gap={6} align="center">
      <span style={{ width: 8, height: 8, borderRadius: 99, background: m.color, flexShrink: 0 }} aria-hidden />
      <Text size="sm">{label ?? m.text}</Text>
    </Group>
  );
});

StatusDot.displayName = 'StatusDot';
