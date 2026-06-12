import { Group, ActionIcon, Tooltip } from '@mantine/core';
import { forwardRef } from 'react';

export type FeedbackValue = 'up' | 'down' | null;

export interface FeedbackControlProps {
  value?: FeedbackValue;
  onChange?: (value: FeedbackValue) => void;
}

/**
 * Tray 8 · Feedback — thumbs up/down on an AI response; the first link in the eval loop
 * (thumbs → telemetry → eval sets → iterate).
 *
 * Toggleable, exposes `aria-pressed`. Tokens: feedback-control.* .
 * See specs/feedback/feedback-control/index.md.
 */
export const FeedbackControl = forwardRef<HTMLDivElement, FeedbackControlProps>(
  ({ value = null, onChange }, ref) => {
    return (
      <Group ref={ref} gap={4}>
        <Tooltip label="Good response">
          <ActionIcon
            variant={value === 'up' ? 'filled' : 'subtle'}
            color={value === 'up' ? 'green' : 'gray'}
            aria-pressed={value === 'up'}
            aria-label="Good response"
            onClick={() => onChange?.(value === 'up' ? null : 'up')}
          >
            👍
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Bad response">
          <ActionIcon
            variant={value === 'down' ? 'filled' : 'subtle'}
            color={value === 'down' ? 'red' : 'gray'}
            aria-pressed={value === 'down'}
            aria-label="Bad response"
            onClick={() => onChange?.(value === 'down' ? null : 'down')}
          >
            👎
          </ActionIcon>
        </Tooltip>
      </Group>
    );
  },
);

FeedbackControl.displayName = 'FeedbackControl';
