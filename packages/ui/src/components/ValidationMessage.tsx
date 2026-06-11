import { Group, Text } from '@mantine/core';
import { forwardRef } from 'react';

export type ValidationStatus = 'error' | 'warning' | 'success';
export interface ValidationMessageProps {
  status?: ValidationStatus;
  children: React.ReactNode;
  id?: string;
}

/**
 * Clementine ValidationMessage — Inline field validation feedback for error, warning, or success.
 * Tokens: validation-message.* . Spec: specs/validation-message/index.md
 */
const VM: Record<ValidationStatus, { color: string; glyph: string }> = {
  error:   { color: 'var(--tds-feedback-error)',   glyph: '⊘' },
  warning: { color: 'var(--tds-feedback-warning)', glyph: '⚠' },
  success: { color: 'var(--tds-feedback-success)', glyph: '✓' },
};
export const ValidationMessage = forwardRef<HTMLDivElement, ValidationMessageProps>(
  ({ status = 'error', children, id }, ref) => {
    const m = VM[status];
    return (
      <Group ref={ref} id={id} gap={5} align="center" wrap="nowrap" role={status === 'error' ? 'alert' : undefined} style={{ marginTop: 4 }}>
        <span aria-hidden style={{ color: m.color, fontSize: 12 }}>{m.glyph}</span>
        <Text size="xs" style={{ color: 'var(--tds-text-primary)' }}>{children}</Text>
      </Group>
    );
  }
);

ValidationMessage.displayName = 'ValidationMessage';
