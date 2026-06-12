import { Stack, Group, Text } from '@mantine/core';
import { forwardRef } from 'react';

export type PlanStepStatus = 'pending' | 'active' | 'done' | 'error';

export interface PlanStep {
  label: string;
  status: PlanStepStatus;
}

export interface PlanStepsProps {
  steps: PlanStep[];
}

const MARK: Record<PlanStepStatus, { glyph: string; color: string }> = {
  pending: { glyph: '○', color: 'var(--tds-text-tertiary)' },
  active:  { glyph: '◐', color: 'var(--tds-action-primary)' },
  done:    { glyph: '●', color: 'var(--tds-feedback-success)' },
  error:   { glyph: '✕', color: 'var(--tds-feedback-error)' },
};

/**
 * Tray 4 · AI — an agent's task decomposition with live per-step status (pending / active /
 * done / error). Distinct from Stepper (user-driven form flow). Tokens: plan.* .
 * Spec: specs/ai/plan-steps/index.md
 */
export const PlanSteps = forwardRef<HTMLDivElement, PlanStepsProps>(({ steps }, ref) => (
  <Stack ref={ref} gap={8}>
    {steps.map((s, i) => {
      const m = MARK[s.status];
      return (
        <Group key={i} gap={8} align="center">
          <span style={{ color: m.color, fontSize: 13, width: 16, textAlign: 'center' }} aria-hidden>{m.glyph}</span>
          <Text size="sm" style={{ color: s.status === 'pending' ? 'var(--tds-text-tertiary)' : 'var(--tds-text-primary)' }}>
            {s.label}
          </Text>
        </Group>
      );
    })}
  </Stack>
));

PlanSteps.displayName = 'PlanSteps';
