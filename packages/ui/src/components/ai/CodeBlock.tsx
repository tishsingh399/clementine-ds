import { Paper, Group, Text, ActionIcon, CopyButton, Tooltip } from '@mantine/core';
import { forwardRef } from 'react';

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

/**
 * Tray 4 · AI — a copyable code block for model-generated code, with a filename/language
 * header and a copy button. For large/reusable output, wrap in an ArtifactFrame.
 * Tokens: code-block.* . Spec: specs/ai/code-block/index.md
 */
export const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ code, language, filename }, ref) => (
    <Paper ref={ref} withBorder radius="md" style={{ overflow: 'hidden', background: 'var(--tds-surface-elevated)' }}>
      <Group
        justify="space-between"
        px="sm"
        py={6}
        wrap="nowrap"
        style={{ background: 'var(--tds-surface-subtle)', borderBottom: '1px solid var(--tds-border-default)' }}
      >
        <Text size="xs" ff="monospace" c="dimmed">{filename ?? language ?? 'code'}</Text>
        <CopyButton value={code}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow>
              <ActionIcon size="sm" variant="subtle" color="gray" onClick={copy} aria-label="Copy code">⧉</ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </Group>
      <pre
        style={{
          margin: 0, padding: 12, fontSize: 12, overflowX: 'auto',
          fontFamily: 'var(--mantine-font-family-monospace)', whiteSpace: 'pre',
          color: 'var(--tds-text-primary)',
        }}
      >
        {code}
      </pre>
    </Paper>
  ),
);

CodeBlock.displayName = 'CodeBlock';
