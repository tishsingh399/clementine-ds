import { Group, Text, Button } from '@mantine/core';
import { forwardRef } from 'react';

export interface UndoBarProps {
  /** What was done, e.g. "Revoked 3 sessions". */
  message: string;
  onUndo?: () => void;
}

/**
 * Tray 4 · AI — a transient bar confirming an agent action and offering to reverse it.
 * Reversibility is a core safety affordance. Tokens: undo.* . Spec: specs/undo-bar/index.md
 */
export const UndoBar = forwardRef<HTMLDivElement, UndoBarProps>(({ message, onUndo }, ref) => (
  <Group ref={ref} justify="space-between" align="center" px="md" py="xs" role="status" aria-live="polite"
    style={{ background: 'var(--cds-text-primary)', borderRadius: 8 }}>
    <Text size="sm" style={{ color: 'var(--cds-text-on-action)' }}>{message}</Text>
    {onUndo && <Button size="xs" variant="white" onClick={onUndo}>Undo</Button>}
  </Group>
));

UndoBar.displayName = 'UndoBar';
