import { Paper, Group, Button } from '@mantine/core';
import { forwardRef } from 'react';

export interface DiffLine {
  type: 'add' | 'remove' | 'context';
  text: string;
}

export interface DiffViewProps {
  lines: DiffLine[];
  onAccept?: () => void;
  onReject?: () => void;
}

const LINE: Record<DiffLine['type'], { bg: string; prefix: string }> = {
  add:     { bg: 'var(--cds-feedback-success-subtle)', prefix: '+' },
  remove:  { bg: 'var(--cds-feedback-error-subtle)',   prefix: '-' },
  context: { bg: 'transparent',                        prefix: ' ' },
};

/**
 * Tray 4 · AI — a proposed change as added/removed lines with accept/reject. Pairs with
 * an agent suggesting an edit. Tokens: diff.* . Spec: specs/diff-view/index.md
 */
export const DiffView = forwardRef<HTMLDivElement, DiffViewProps>(({ lines, onAccept, onReject }, ref) => (
  <Paper ref={ref} withBorder radius="md" style={{ overflow: 'hidden', background: 'var(--cds-surface-elevated)' }}>
    <div style={{ fontFamily: 'var(--mantine-font-family-monospace)', fontSize: 12 }}>
      {lines.map((l, i) => (
        <div key={i} style={{ background: LINE[l.type].bg, padding: '2px 12px', whiteSpace: 'pre', color: 'var(--cds-text-primary)' }}>
          {LINE[l.type].prefix} {l.text}
        </div>
      ))}
    </div>
    {(onAccept || onReject) && (
      <Group gap="xs" p="xs" style={{ borderTop: '1px solid var(--cds-border-default)' }}>
        {onAccept && <Button size="xs" color="green" onClick={onAccept}>Accept</Button>}
        {onReject && <Button size="xs" variant="default" onClick={onReject}>Reject</Button>}
      </Group>
    )}
  </Paper>
));

DiffView.displayName = 'DiffView';
