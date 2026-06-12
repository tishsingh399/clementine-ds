import { Paper, Stack, Group, Text, Anchor } from '@mantine/core';
import { forwardRef } from 'react';

export interface RefusalStateProps {
  /** Why the request can't be completed. */
  reason: string;
  /** A constructive next step ("here's what you can do instead"). */
  suggestion?: React.ReactNode;
}

/**
 * Tray 4 · AI — a clear, non-dead-end refusal: "I can't do X — here's why, try Y." Styled
 * NEUTRALLY (not as an error), per content/error-and-refusal-microcopy. Tokens: refusal.* .
 * Spec: specs/ai/refusal-state/index.md
 */
export const RefusalState = forwardRef<HTMLDivElement, RefusalStateProps>(({ reason, suggestion }, ref) => (
  <Paper ref={ref} withBorder radius="md" p="sm" style={{ background: 'var(--tds-surface-subtle)', borderColor: 'var(--tds-border-default)' }}>
    <Stack gap={6}>
      <Group gap={8} wrap="nowrap" align="center">
        <span aria-hidden>⊘</span>
        <Text fw={600} size="sm">I can't complete this</Text>
      </Group>
      <Text size="sm" c="dimmed">{reason}</Text>
      {suggestion && <Text size="sm">Try: {suggestion}</Text>}
    </Stack>
  </Paper>
));

RefusalState.displayName = 'RefusalState';
