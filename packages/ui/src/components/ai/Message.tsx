import { Paper, Group, Stack, Text, Avatar } from '@mantine/core';
import { forwardRef } from 'react';

export type MessageRole = 'user' | 'assistant' | 'system';
export type MessageStatus = 'sending' | 'streaming' | 'complete' | 'error';

export interface MessageProps {
  /** Who authored the message — drives alignment, fill, and avatar. */
  role: MessageRole;
  children: React.ReactNode;
  authorName?: string;
  timestamp?: string;
  status?: MessageStatus;
}

const roleStyle: Record<MessageRole, { bg: string; fg: string }> = {
  user:      { bg: 'var(--cds-action-primary)',  fg: 'var(--cds-text-on-action)' },
  assistant: { bg: 'var(--cds-surface-subtle)',  fg: 'var(--cds-text-primary)' },
  system:    { bg: 'var(--cds-surface-default)', fg: 'var(--cds-text-secondary)' },
};

/**
 * Clementine Message — a single turn in a chat thread (user / assistant / system).
 *
 * Tokens: message.* . User turns align right on `action.primary`; assistant/system align
 * left on a subtle surface. `status="streaming"` sets `aria-busy` for assistive tech.
 * See specs/message/index.md.
 */
export const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ role, children, authorName, timestamp, status = 'complete' }, ref) => {
    const s = roleStyle[role];
    const isUser = role === 'user';
    return (
      <Group ref={ref} justify={isUser ? 'flex-end' : 'flex-start'} align="flex-start" wrap="nowrap" gap="sm" data-role={role}>
        {!isUser && (
          <Avatar size="sm" radius="xl" color={role === 'assistant' ? 'blue' : 'gray'} name={authorName ?? (role === 'assistant' ? 'AI' : 'SY')} />
        )}
        <Stack gap={4} align={isUser ? 'flex-end' : 'flex-start'} style={{ maxWidth: '80%' }}>
          <Paper p="sm" radius="lg" style={{ background: s.bg, color: s.fg }}>
            <Text component="div" size="sm" aria-busy={status === 'streaming'} style={{ color: s.fg, whiteSpace: 'pre-wrap' }}>
              {children}
            </Text>
          </Paper>
          {(timestamp || status === 'error') && (
            <Text size="xs" c={status === 'error' ? 'red' : 'dimmed'}>
              {status === 'error' ? 'Failed to send' : timestamp}
            </Text>
          )}
        </Stack>
      </Group>
    );
  },
);

Message.displayName = 'Message';
