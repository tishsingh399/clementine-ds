import { Stack } from '@mantine/core';
import { forwardRef } from 'react';

export interface ConversationThreadProps {
  children: React.ReactNode;
}

/**
 * Tray 4 · AI — the scrollable container for a conversation: holds Message turns with
 * consistent spacing. Tokens: thread.* . Spec: specs/ai/conversation-thread/index.md
 */
export const ConversationThread = forwardRef<HTMLDivElement, ConversationThreadProps>(({ children }, ref) => (
  <Stack ref={ref} gap="lg" role="log" aria-live="polite" style={{ background: 'var(--tds-surface-default)', padding: 16, borderRadius: 8 }}>
    {children}
  </Stack>
));

ConversationThread.displayName = 'ConversationThread';
