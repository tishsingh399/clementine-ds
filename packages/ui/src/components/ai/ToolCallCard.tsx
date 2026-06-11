import { Paper, Group, Text, Code, Badge, Loader, Collapse, UnstyledButton } from '@mantine/core';
import { forwardRef, useState } from 'react';

export type ToolCallStatus = 'pending' | 'running' | 'success' | 'error';

export interface ToolCallCardProps {
  name: string;
  args?: Record<string, unknown> | string;
  result?: React.ReactNode;
  status?: ToolCallStatus;
  defaultOpen?: boolean;
}

const statusMeta: Record<ToolCallStatus, { color: string; label: string }> = {
  pending: { color: 'gray',  label: 'Pending' },
  running: { color: 'blue',  label: 'Running' },
  success: { color: 'green', label: 'Done' },
  error:   { color: 'red',   label: 'Error' },
};

/**
 * Clementine ToolCallCard — a transparent record of a tool/function the agent invoked.
 *
 * Header shows the tool name + a status badge (pending/running/success/error); the body
 * expands to reveal arguments (as code) and the result. Tokens: tool-call.* .
 * See specs/ai/tool-call-card/index.md.
 */
export const ToolCallCard = forwardRef<HTMLDivElement, ToolCallCardProps>(
  ({ name, args, result, status = 'success', defaultOpen = false }, ref) => {
    const [open, setOpen] = useState(defaultOpen);
    const meta = statusMeta[status];
    const argText = typeof args === 'string' ? args : args ? JSON.stringify(args, null, 2) : undefined;
    return (
      <Paper ref={ref} withBorder radius="md" p="xs" data-status={status} style={{ background: 'var(--tds-surface-elevated)' }}>
        <UnstyledButton onClick={() => setOpen((o) => !o)} aria-expanded={open} style={{ width: '100%' }}>
          <Group justify="space-between" wrap="nowrap">
            <Text size="sm" ff="monospace" fw={600}>⚙ {name}</Text>
            <Group gap={6} wrap="nowrap">
              {status === 'running' && <Loader size="xs" />}
              <Badge size="sm" color={meta.color} variant="light">{meta.label}</Badge>
            </Group>
          </Group>
        </UnstyledButton>
        <Collapse in={open}>
          {argText && <Code block mt={8} style={{ fontSize: 12 }}>{argText}</Code>}
          {result != null && <Text size="sm" mt={8}>{result}</Text>}
        </Collapse>
      </Paper>
    );
  },
);

ToolCallCard.displayName = 'ToolCallCard';
