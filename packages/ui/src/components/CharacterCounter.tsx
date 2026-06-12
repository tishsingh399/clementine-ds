import { forwardRef } from 'react';

export interface CharacterCounterProps {
  value: number;
  max: number;
}

/**
 * Clementine CharacterCounter — A live character count for text inputs, with an over-limit state.
 * Tokens: character-counter.* . Spec: specs/character-counter/index.md
 */
export const CharacterCounter = forwardRef<HTMLSpanElement, CharacterCounterProps>(
  ({ value, max }, ref) => {
    const over = value > max;
    const near = !over && value >= max * 0.9;
    return (
      <span ref={ref} aria-live="polite"
        style={{ fontSize: 12, fontWeight: near || over ? 600 : 400, color: over ? 'var(--tds-feedback-error)' : 'var(--tds-text-secondary)' }}>
        {value + ' / ' + max}
      </span>
    );
  }
);

CharacterCounter.displayName = 'CharacterCounter';
