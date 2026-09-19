import { Group, Stack, Text } from '@mantine/core';
import { forwardRef } from 'react';

export type SessionRisk = 'critical' | 'high' | 'medium' | 'low';

export interface SessionRiskPanelProps {
  sessionId: string;
  account: string;
  risk?: SessionRisk;
}

const RISK_FG: Record<SessionRisk, string> = {
  critical: 'var(--cds-risk-critical)',
  high: 'var(--cds-risk-high)',
  medium: 'var(--cds-risk-medium)',
  low: 'var(--cds-risk-low)',
};

/**
 * Enterprise · SessionRiskPanel — summarises the risk posture of one privileged
 * session. Risk carried by color + label, never color alone.
 */
export const SessionRiskPanel = forwardRef<HTMLDivElement, SessionRiskPanelProps>(
  ({ sessionId, account, risk = 'low' }, ref) => {
    return (
      <Stack
        ref={ref}
        gap={8}
        p="md"
        role="group"
        style={{
          background: 'var(--cds-surface-subtle)',
          border: '1px solid var(--cds-border-default)',
        }}
      >
        <Text size="md" style={{ color: 'var(--cds-text-primary)' }}>
          Session {sessionId}
        </Text>
        <Group justify="space-between">
          <Text size="sm" style={{ color: 'var(--cds-text-secondary)' }}>
            {account}
          </Text>
          <Text size="sm" style={{ color: RISK_FG[risk] }}>
            {risk}
          </Text>
        </Group>
      </Stack>
    );
  },
);

SessionRiskPanel.displayName = 'SessionRiskPanel';
