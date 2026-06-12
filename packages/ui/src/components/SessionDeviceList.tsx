import { Stack, Group, Text, Button, Badge } from '@mantine/core';
import { forwardRef } from 'react';

export interface DeviceSession {
  id: string;
  device: string;
  location?: string;
  lastActive: string;
  current?: boolean;
}
export interface SessionDeviceListProps {
  sessions: DeviceSession[];
  onRevoke?: (id: string) => void;
}

/**
 * Enterprise · SessionDeviceList — active sessions/devices for a principal, each revocable.
 * Privileged-access staple. Tokens: session-device.* . Spec: specs/session-device-list/index.md
 */
export const SessionDeviceList = forwardRef<HTMLDivElement, SessionDeviceListProps>(({ sessions, onRevoke }, ref) => (
  <Stack ref={ref} gap="xs">
    {sessions.map((s) => (
      <Group key={s.id} justify="space-between" wrap="nowrap" p="sm"
        style={{ border: '1px solid var(--tds-border-default)', borderRadius: 8, background: 'var(--tds-surface-elevated)' }}>
        <div>
          <Group gap={8} align="center">
            <Text size="sm" fw={600} style={{ color: 'var(--tds-text-primary)' }}>{s.device}</Text>
            {s.current && <Badge size="xs" color="green" variant="light">This device</Badge>}
          </Group>
          <Text size="xs" c="dimmed">{[s.location, s.lastActive].filter(Boolean).join(' · ')}</Text>
        </div>
        {!s.current && onRevoke && <Button size="xs" color="red" variant="light" onClick={() => onRevoke(s.id)}>Revoke</Button>}
      </Group>
    ))}
  </Stack>
));

SessionDeviceList.displayName = 'SessionDeviceList';
