import { Group, Text } from '@mantine/core';
import { forwardRef } from 'react';

export type MaintenanceSeverity = 'info' | 'degraded' | 'down';
export interface MaintenanceBannerProps {
  message: React.ReactNode;
  severity?: MaintenanceSeverity;
}

const SEV: Record<MaintenanceSeverity, { bg: string; fg: string }> = {
  info:     { bg: 'var(--tds-surface-subtle)',          fg: 'var(--tds-text-primary)' },
  degraded: { bg: 'var(--tds-feedback-warning-subtle)', fg: 'var(--tds-text-primary)' },
  down:     { bg: 'var(--tds-feedback-error-subtle)',   fg: 'var(--tds-text-primary)' },
};

/**
 * Enterprise · MaintenanceBanner — a full-width system banner for maintenance / degraded /
 * down states. Severity carried by color + an icon + text, never color alone.
 * Tokens: maintenance-banner.* . Spec: specs/maintenance-banner/index.md
 */
export const MaintenanceBanner = forwardRef<HTMLDivElement, MaintenanceBannerProps>(({ message, severity = 'info' }, ref) => {
  const s = SEV[severity];
  const icon = severity === 'down' ? '⛔' : severity === 'degraded' ? '⚠' : 'ℹ';
  return (
    <Group ref={ref} gap={8} px="md" py={8} justify="center" role="status"
      style={{ background: s.bg, borderBottom: '1px solid var(--tds-border-default)', width: '100%' }}>
      <span aria-hidden>{icon}</span>
      <Text size="sm" style={{ color: s.fg }}>{message}</Text>
    </Group>
  );
});

MaintenanceBanner.displayName = 'MaintenanceBanner';
