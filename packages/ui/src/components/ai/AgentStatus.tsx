import { Group, Text, Loader } from '@mantine/core';
import { forwardRef } from 'react';

export type AgentState = 'idle' | 'thinking' | 'tool' | 'waiting' | 'done' | 'error' | 'refused';

export interface AgentStatusProps {
  state: AgentState;
  label?: string;
}

const MAP: Record<AgentState, { color: string; text: string; busy?: boolean }> = {
  idle:     { color: 'var(--tds-text-tertiary)',    text: 'Idle' },
  thinking: { color: 'var(--tds-action-primary)',   text: 'Thinking…', busy: true },
  tool:     { color: 'var(--tds-action-primary)',   text: 'Calling tool…', busy: true },
  waiting:  { color: 'var(--tds-feedback-warning)', text: 'Waiting on you' },
  done:     { color: 'var(--tds-feedback-success)', text: 'Done' },
  error:    { color: 'var(--tds-feedback-error)',   text: 'Error' },
  refused:  { color: 'var(--tds-text-tertiary)',    text: 'Declined' },
};

/**
 * Tray 4 · AI — the agent's current state (idle / thinking / calling tool / waiting / done /
 * error / refused), shown with an indicator AND text. Tokens: agent-status.* .
 * Spec: specs/ai/agent-status/index.md
 */
export const AgentStatus = forwardRef<HTMLDivElement, AgentStatusProps>(({ state, label }, ref) => {
  const m = MAP[state];
  return (
    <Group ref={ref} gap={6} align="center" role="status" aria-live="polite">
      {m.busy ? <Loader size={12} color={m.color} /> : <span style={{ width: 8, height: 8, borderRadius: 99, background: m.color }} aria-hidden />}
      <Text size="sm" style={{ color: 'var(--tds-text-secondary)' }}>{label ?? m.text}</Text>
    </Group>
  );
});

AgentStatus.displayName = 'AgentStatus';
