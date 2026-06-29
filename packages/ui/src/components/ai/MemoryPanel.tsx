import { Paper, Stack, Group, Text, ActionIcon } from '@mantine/core';
import { forwardRef } from 'react';

export interface MemoryFact {
  id: string;
  text: string;
}

export interface MemoryPanelProps {
  facts: MemoryFact[];
  title?: string;
  onDelete?: (id: string) => void;
}

/**
 * Tray 4 · AI — the persistent facts an agent holds about the user/context: viewable and
 * deletable (user control over memory). Tokens: memory.* . Spec: specs/memory-panel/index.md
 */
export const MemoryPanel = forwardRef<HTMLDivElement, MemoryPanelProps>(
  ({ facts, title = 'Memory', onDelete }, ref) => (
    <Paper ref={ref} withBorder radius="md" p="sm" style={{ background: 'var(--cds-surface-elevated)' }}>
      <Text size="xs" fw={600} mb={8} style={{ textTransform: 'uppercase', color: 'var(--cds-text-tertiary)' }}>{title}</Text>
      <Stack gap={6}>
        {facts.map((f) => (
          <Group key={f.id} justify="space-between" wrap="nowrap" gap="sm">
            <Text size="sm" style={{ color: 'var(--cds-text-primary)' }}>{f.text}</Text>
            {onDelete && <ActionIcon size="sm" variant="subtle" color="gray" aria-label={`Forget: ${f.text}`} onClick={() => onDelete(f.id)}>×</ActionIcon>}
          </Group>
        ))}
      </Stack>
    </Paper>
  ),
);

MemoryPanel.displayName = 'MemoryPanel';
