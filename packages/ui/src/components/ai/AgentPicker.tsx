import { Select, type SelectProps } from '@mantine/core';
import { forwardRef } from 'react';

export interface AgentPickerProps extends Omit<SelectProps, 'data'> {
  /** Available agents as value/label pairs (or plain ids). */
  agents: SelectProps['data'];
}

/**
 * Tray 4 · AI — choose or route between agents. Distinct from ModelSelector (which picks a
 * model). Tokens: agent-picker.* . Spec: specs/agent-picker/index.md
 */
export const AgentPicker = forwardRef<HTMLInputElement, AgentPickerProps>(({ agents, ...props }, ref) => (
  <Select
    ref={ref}
    data={agents}
    leftSection={<span aria-hidden>🤖</span>}
    allowDeselect={false}
    checkIconPosition="right"
    {...props}
  />
));

AgentPicker.displayName = 'AgentPicker';
