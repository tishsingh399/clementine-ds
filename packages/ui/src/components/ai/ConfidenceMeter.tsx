import { Group, Text } from '@mantine/core';
import { forwardRef } from 'react';

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface ConfidenceMeterProps {
  level: ConfidenceLevel;
  /** Show the text label alongside the bars (default true). */
  label?: boolean;
}

const LEVELS: Record<ConfidenceLevel, { fill: string; filled: number; text: string }> = {
  high:   { fill: 'var(--tds-feedback-success)', filled: 3, text: 'High confidence' },
  medium: { fill: 'var(--tds-feedback-warning)', filled: 2, text: 'Medium confidence' },
  low:    { fill: 'var(--tds-feedback-error)',   filled: 1, text: 'Low confidence' },
};

/**
 * Tray 4 · AI — communicates how confident the model is in an answer, with bars AND a label
 * (never color alone). Tokens: confidence.* . Spec: specs/ai/confidence-meter/index.md
 */
export const ConfidenceMeter = forwardRef<HTMLDivElement, ConfidenceMeterProps>(
  ({ level, label = true }, ref) => {
    const m = LEVELS[level];
    return (
      <Group ref={ref} gap={6} align="center" role="img" aria-label={m.text}>
        <Group gap={3}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{ width: 14, height: 6, borderRadius: 2, background: i < m.filled ? m.fill : 'var(--tds-surface-subtle)' }}
            />
          ))}
        </Group>
        {label && <Text size="xs" c="dimmed">{m.text}</Text>}
      </Group>
    );
  },
);

ConfidenceMeter.displayName = 'ConfidenceMeter';
