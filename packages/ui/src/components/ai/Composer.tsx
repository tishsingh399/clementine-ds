import { Paper, Group, Textarea, ActionIcon } from '@mantine/core';
import { forwardRef } from 'react';

export interface ComposerProps {
  value?: string;
  onChange?: (value: string) => void;
  /** Fires on Enter (without Shift) or the send button, when there is non-empty text. */
  onSubmit?: (value: string) => void;
  /** Fires on the stop button while `busy`. */
  onStop?: () => void;
  placeholder?: string;
  /** Generating/streaming — swaps Send for Stop and blocks Enter-submit. */
  busy?: boolean;
  disabled?: boolean;
  maxRows?: number;
}

/**
 * Clementine Composer — the prompt input for an AI surface.
 *
 * Autosizing textarea + a Send affordance that becomes Stop while `busy`. Enter submits,
 * Shift+Enter inserts a newline. Tokens: composer.* . See specs/ai/composer/index.md.
 */
export const Composer = forwardRef<HTMLTextAreaElement, ComposerProps>(
  ({ value = '', onChange, onSubmit, onStop, placeholder = 'Message the assistant…', busy = false, disabled = false, maxRows = 8 }, ref) => {
    const canSend = !disabled && value.trim().length > 0;
    const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
      if (e.key === 'Enter' && !e.shiftKey && !busy) {
        e.preventDefault();
        if (canSend) onSubmit?.(value);
      }
    };
    return (
      <Paper withBorder radius="lg" p={6} style={{ background: 'var(--tds-surface-elevated)' }}>
        <Group align="flex-end" gap={6} wrap="nowrap">
          <Textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange?.(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autosize
            minRows={1}
            maxRows={maxRows}
            disabled={disabled}
            variant="unstyled"
            aria-label="Message composer"
            style={{ flex: 1 }}
          />
          {busy ? (
            <ActionIcon onClick={onStop} color="red" variant="filled" radius="xl" size="lg" aria-label="Stop generating">■</ActionIcon>
          ) : (
            <ActionIcon onClick={() => canSend && onSubmit?.(value)} disabled={!canSend} variant="filled" radius="xl" size="lg" aria-label="Send message">↑</ActionIcon>
          )}
        </Group>
      </Paper>
    );
  },
);

Composer.displayName = 'Composer';
