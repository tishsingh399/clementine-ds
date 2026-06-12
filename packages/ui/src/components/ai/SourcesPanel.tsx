import { Paper, Stack, Group, Text, Anchor } from '@mantine/core';
import { forwardRef } from 'react';

export interface Source {
  index: number;
  title: string;
  url?: string;
  snippet?: string;
}

export interface SourcesPanelProps {
  sources: Source[];
  title?: string;
}

/**
 * Tray 4 · AI — the provenance list behind a cited answer. Pairs with inline CitationChip
 * [n] markers. Tokens: sources.* . Spec: specs/ai/sources-panel/index.md
 */
export const SourcesPanel = forwardRef<HTMLDivElement, SourcesPanelProps>(
  ({ sources, title = 'Sources' }, ref) => (
    <Paper ref={ref} withBorder radius="md" p="sm" style={{ background: 'var(--tds-surface-elevated)' }}>
      <Text size="xs" fw={600} mb={8} style={{ textTransform: 'uppercase', color: 'var(--tds-text-tertiary)' }}>
        {title}
      </Text>
      <Stack gap={8}>
        {sources.map((s) => (
          <Group key={s.index} gap={8} wrap="nowrap" align="flex-start">
            <span
              style={{
                minWidth: 18, height: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, borderRadius: 4, background: 'var(--tds-surface-subtle)',
                color: 'var(--tds-text-secondary)', border: '1px solid var(--tds-border-default)',
              }}
            >
              {s.index}
            </span>
            <div>
              {s.url ? (
                <Anchor href={s.url} size="sm" target="_blank" rel="noopener noreferrer">{s.title}</Anchor>
              ) : (
                <Text size="sm">{s.title}</Text>
              )}
              {s.snippet && <Text size="xs" c="dimmed">{s.snippet}</Text>}
            </div>
          </Group>
        ))}
      </Stack>
    </Paper>
  ),
);

SourcesPanel.displayName = 'SourcesPanel';
