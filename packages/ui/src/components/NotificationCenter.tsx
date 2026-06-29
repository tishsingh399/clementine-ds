import { Paper, Stack, Group, Text, ActionIcon } from '@mantine/core';
import { forwardRef } from 'react';

export interface NotificationItem {
  id: string;
  title: string;
  body?: string;
  when?: string;
  read?: boolean;
}
export interface NotificationCenterProps {
  notifications: NotificationItem[];
  onMarkRead?: (id: string) => void;
}

/**
 * Enterprise · NotificationCenter — a panel of system/activity notifications, unread first,
 * each dismissable/markable. Tokens: notification-center.* . Spec: specs/notification-center/index.md
 */
export const NotificationCenter = forwardRef<HTMLDivElement, NotificationCenterProps>(({ notifications, onMarkRead }, ref) => (
  <Paper ref={ref} withBorder radius="md" p="xs" style={{ width: 340, background: 'var(--cds-surface-elevated)' }}>
    <Text size="xs" fw={700} px="xs" py={4} style={{ textTransform: 'uppercase', color: 'var(--cds-text-tertiary)' }}>Notifications</Text>
    <Stack gap={2}>
      {notifications.map((n) => (
        <Group key={n.id} justify="space-between" wrap="nowrap" align="flex-start" p="xs"
          style={{ borderRadius: 6, background: n.read ? 'transparent' : 'var(--cds-surface-subtle)' }}>
          <div>
            <Group gap={6} wrap="nowrap" align="center">
              {!n.read && <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--cds-action-primary)' }} aria-hidden />}
              <Text size="sm" fw={n.read ? 400 : 600} style={{ color: 'var(--cds-text-primary)' }}>{n.title}</Text>
            </Group>
            {n.body && <Text size="xs" c="dimmed">{n.body}</Text>}
          </div>
          {n.when && <Text size="xs" style={{ color: 'var(--cds-text-tertiary)', flexShrink: 0 }}>{n.when}</Text>}
        </Group>
      ))}
    </Stack>
  </Paper>
));

NotificationCenter.displayName = 'NotificationCenter';
