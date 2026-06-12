import { Paper, Group, Text, Collapse, UnstyledButton } from '@mantine/core';
import { forwardRef, useState } from 'react';

export interface ReasoningTraceProps {
  children: React.ReactNode;
  label?: string;
  defaultOpen?: boolean;
  /** Currently producing thought — shows "Thinking…" and sets aria-busy. */
  streaming?: boolean;
  /** Completed duration in ms — renders "Thought for 1.2s". */
  durationMs?: number;
}

/**
 * Clementine ReasoningTrace — a collapsible, de-emphasized view of the model's
 * intermediate "thinking".
 *
 * Collapsed by default; the toggle is a real button with `aria-expanded`. Content is
 * dimmed (text.secondary) so it reads as secondary to the answer. Tokens: reasoning.* .
 * See specs/ai/reasoning-trace/index.md.
 */
export const ReasoningTrace = forwardRef<HTMLDivElement, ReasoningTraceProps>(
  ({ children, label, defaultOpen = false, streaming = false, durationMs }, ref) => {
    const [open, setOpen] = useState(defaultOpen);
    const heading =
      label ?? (streaming ? 'Thinking…' : durationMs != null ? `Thought for ${(durationMs / 1000).toFixed(1)}s` : 'Reasoning');
    return (
      <Paper ref={ref} radius="md" p="xs" style={{ background: 'var(--tds-surface-subtle)' }} aria-busy={streaming}>
        <UnstyledButton onClick={() => setOpen((o) => !o)} aria-expanded={open} style={{ width: '100%' }}>
          <Group gap={6} wrap="nowrap">
            <Text size="xs" c="dimmed" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {open ? '▾' : '▸'} {heading}
            </Text>
          </Group>
        </UnstyledButton>
        <Collapse in={open}>
          <Text
            size="xs"
            c="dimmed"
            mt={6}
            style={{ whiteSpace: 'pre-wrap', borderLeft: '2px solid var(--tds-border-default)', paddingLeft: 8 }}
          >
            {children}
          </Text>
        </Collapse>
      </Paper>
    );
  },
);

ReasoningTrace.displayName = 'ReasoningTrace';
