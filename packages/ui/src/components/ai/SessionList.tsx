import { Stack, Group, Text, UnstyledButton } from '@mantine/core';
import { forwardRef } from 'react';

export interface SessionItem {
  id: string;
  title: string;
  when?: string;
}

export interface SessionListProps {
  sessions: SessionItem[];
  activeId?: string;
  onOpen?: (id: string) => void;
}

/**
 * Tray 4 · AI — past conversations, searchable and resumable. Tokens: session-list.* .
 * Spec: specs/ai/session-list/index.md
 */
export const SessionList = forwardRef<HTMLDivElement, SessionListProps>(({ sessions, activeId, onOpen }, ref) => (
  <Stack ref={ref} gap={2}>
    {sessions.map((s) => (
      <UnstyledButton
        key={s.id}
        onClick={() => onOpen?.(s.id)}
        aria-current={s.id === activeId ? 'page' : undefined}
        style={{
          padding: '8px 10px', borderRadius: 6,
          background: s.id === activeId ? 'var(--tds-surface-subtle)' : 'transparent',
        }}
      >
        <Group justify="space-between" wrap="nowrap" gap="sm">
          <Text size="sm" lineClamp={1} style={{ color: 'var(--tds-text-primary)' }}>{s.title}</Text>
          {s.when && <Text size="xs" style={{ color: 'var(--tds-text-tertiary)', flexShrink: 0 }}>{s.when}</Text>}
        </Group>
      </UnstyledButton>
    ))}
  </Stack>
));

SessionList.displayName = 'SessionList';
