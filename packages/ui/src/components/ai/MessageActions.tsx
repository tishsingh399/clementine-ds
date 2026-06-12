import { Group, ActionIcon, Tooltip } from '@mantine/core';
import { forwardRef } from 'react';

export interface MessageActionsProps {
  onCopy?: () => void;
  onEdit?: () => void;
  onRegenerate?: () => void;
  onBranch?: () => void;
}

/**
 * Tray 4 · AI — the hover/focus action row on a Message (copy, edit, regenerate, branch).
 * Only the handlers you pass are rendered. Tokens: message-actions.* .
 * Spec: specs/ai/message-actions/index.md
 */
export const MessageActions = forwardRef<HTMLDivElement, MessageActionsProps>(
  ({ onCopy, onEdit, onRegenerate, onBranch }, ref) => {
    const acts: [string, string, (() => void) | undefined][] = [
      ['Copy', '⧉', onCopy],
      ['Edit', '✎', onEdit],
      ['Regenerate', '↻', onRegenerate],
      ['Branch', '⎇', onBranch],
    ];
    return (
      <Group ref={ref} gap={2}>
        {acts.filter(([, , fn]) => fn).map(([label, glyph, fn]) => (
          <Tooltip key={label} label={label} withArrow>
            <ActionIcon size="sm" variant="subtle" color="gray" aria-label={label} onClick={fn}>{glyph}</ActionIcon>
          </Tooltip>
        ))}
      </Group>
    );
  },
);

MessageActions.displayName = 'MessageActions';
