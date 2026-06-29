import { Group, Avatar, Tooltip } from '@mantine/core';
import { forwardRef } from 'react';

export type Presence = 'online' | 'away' | 'busy' | 'offline';
export interface PresenceUser {
  name: string;
  status: Presence;
}
export interface PresenceIndicatorProps {
  users: PresenceUser[];
}

const DOT: Record<Presence, string> = {
  online: 'var(--cds-feedback-success)',
  away:   'var(--cds-feedback-warning)',
  busy:   'var(--cds-feedback-error)',
  offline:'var(--cds-text-tertiary)',
};

/**
 * Enterprise · PresenceIndicator — who's here, as a stack of avatars each with a presence
 * dot. Status by dot + accessible name, not color alone. Tokens: presence.* .
 * Spec: specs/presence-indicator/index.md
 */
export const PresenceIndicator = forwardRef<HTMLDivElement, PresenceIndicatorProps>(({ users }, ref) => (
  <Group ref={ref} gap={-8}>
    {users.map((u, i) => (
      <Tooltip key={i} label={`${u.name} · ${u.status}`} withArrow>
        <div style={{ position: 'relative' }}>
          <Avatar name={u.name} color="blue" radius="xl" size="md" style={{ border: '2px solid var(--cds-surface-default)' }} />
          <span aria-hidden style={{ position: 'absolute', right: 0, bottom: 0, width: 10, height: 10, borderRadius: 99, background: DOT[u.status], border: '2px solid var(--cds-surface-default)' }} />
        </div>
      </Tooltip>
    ))}
  </Group>
));

PresenceIndicator.displayName = 'PresenceIndicator';
