import { Stack, Group, Avatar, Text } from '@mantine/core';
import { forwardRef } from 'react';

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  when: string;
}
export interface ActivityFeedProps {
  items: ActivityItem[];
}

/**
 * Enterprise · ActivityFeed — a chronological stream of who-did-what-when (audit-adjacent).
 * Tokens: activity-feed.* . Spec: specs/activity-feed/index.md
 */
export const ActivityFeed = forwardRef<HTMLDivElement, ActivityFeedProps>(({ items }, ref) => (
  <Stack ref={ref} gap="sm">
    {items.map((it) => (
      <Group key={it.id} gap="sm" wrap="nowrap" align="flex-start">
        <Avatar name={it.actor} color="gray" radius="xl" size="sm" />
        <div>
          <Text size="sm" style={{ color: 'var(--cds-text-primary)' }}>
            <strong>{it.actor}</strong> {it.action}
          </Text>
          <Text size="xs" style={{ color: 'var(--cds-text-tertiary)' }}>{it.when}</Text>
        </div>
      </Group>
    ))}
  </Stack>
));

ActivityFeed.displayName = 'ActivityFeed';
