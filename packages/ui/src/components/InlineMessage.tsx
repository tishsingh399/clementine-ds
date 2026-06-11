import { Group, Text } from '@mantine/core';
import { forwardRef } from 'react';

export type InlineMessageStatus = 'info' | 'success' | 'warning' | 'error';
export interface InlineMessageProps {
  status?: InlineMessageStatus;
  children: React.ReactNode;
}

/**
 * Clementine InlineMessage — A compact inline status line (icon + text) for info, success, warning, or error.
 * Tokens: inline-message.* . Spec: specs/inline-message/index.md
 */
const IM: Record<InlineMessageStatus, { color: string; glyph: string }> = {
  info:    { color: 'var(--tds-text-secondary)',  glyph: 'ⓘ' },
  success: { color: 'var(--tds-feedback-success)', glyph: '✓' },
  warning: { color: 'var(--tds-feedback-warning)', glyph: '⚠' },
  error:   { color: 'var(--tds-feedback-error)',   glyph: '⊘' },
};
export const InlineMessage = forwardRef<HTMLDivElement, InlineMessageProps>(
  ({ status = 'info', children }, ref) => {
    const m = IM[status];
    return (
      <Group ref={ref} gap={6} align="flex-start" wrap="nowrap">
        <span aria-hidden style={{ color: m.color, lineHeight: 1.5 }}>{m.glyph}</span>
        <Text size="sm" style={{ color: 'var(--tds-text-primary)' }}>{children}</Text>
      </Group>
    );
  }
);

InlineMessage.displayName = 'InlineMessage';
