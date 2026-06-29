import { Paper, Group, Text, Badge } from '@mantine/core';
import { forwardRef } from 'react';

export interface ArtifactFrameProps {
  title: string;
  /** A short type label, e.g. "code", "document", "preview". */
  kind?: string;
  children: React.ReactNode;
  /** Action buttons rendered in the header (copy, download, open). */
  actions?: React.ReactNode;
}

/**
 * Clementine ArtifactFrame — a titled container for a substantial generated output
 * (a document, a code file, a rendered preview) lifted out of the chat stream.
 *
 * Header carries the title, a kind badge, and actions; the body holds the artifact.
 * Tokens: artifact.* . See specs/artifact-frame/index.md.
 */
export const ArtifactFrame = forwardRef<HTMLDivElement, ArtifactFrameProps>(
  ({ title, kind, children, actions }, ref) => {
    return (
      <Paper ref={ref} withBorder radius="md" style={{ overflow: 'hidden', background: 'var(--cds-surface-elevated)' }}>
        <Group
          justify="space-between"
          px="sm"
          py={8}
          wrap="nowrap"
          style={{ background: 'var(--cds-surface-subtle)', borderBottom: '1px solid var(--cds-border-default)' }}
        >
          <Group gap={8} wrap="nowrap">
            <Text size="sm" fw={600}>{title}</Text>
            {kind && <Badge size="xs" variant="light" color="gray">{kind}</Badge>}
          </Group>
          {actions && <Group gap={4} wrap="nowrap">{actions}</Group>}
        </Group>
        <div style={{ padding: 'var(--mantine-spacing-sm)' }}>{children}</div>
      </Paper>
    );
  },
);

ArtifactFrame.displayName = 'ArtifactFrame';
