import { Group, Text, ActionIcon } from '@mantine/core';
import { forwardRef } from 'react';

export interface AttachmentPillProps {
  name: string;
  /** Human-readable size, e.g. "240 KB". */
  size?: string;
  onRemove?: () => void;
}

/**
 * Tray 4 · AI — a file attached to a prompt, shown as a removable pill in the Composer.
 * Tokens: attachment.* . Spec: specs/attachment-pill/index.md
 */
export const AttachmentPill = forwardRef<HTMLDivElement, AttachmentPillProps>(
  ({ name, size, onRemove }, ref) => (
    <Group
      ref={ref}
      gap={8}
      wrap="nowrap"
      style={{
        padding: '4px 6px 4px 10px', borderRadius: 8, display: 'inline-flex',
        background: 'var(--cds-surface-subtle)', border: '1px solid var(--cds-border-default)',
      }}
    >
      <span aria-hidden>📎</span>
      <div style={{ minWidth: 0 }}>
        <Text size="sm" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 160 }}>
          {name}
        </Text>
        {size && <Text size="xs" c="dimmed">{size}</Text>}
      </div>
      {onRemove && (
        <ActionIcon size="sm" variant="subtle" color="gray" onClick={onRemove} aria-label={`Remove ${name}`}>
          ×
        </ActionIcon>
      )}
    </Group>
  ),
);

AttachmentPill.displayName = 'AttachmentPill';
