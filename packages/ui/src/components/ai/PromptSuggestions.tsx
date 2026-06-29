import { Group, UnstyledButton } from '@mantine/core';
import { forwardRef } from 'react';

export interface PromptSuggestionsProps {
  /** Starter prompts shown above an empty Composer. */
  suggestions: string[];
  onSelect?: (suggestion: string) => void;
}

/**
 * Tray 4 · AI — starter-prompt chips for an empty conversation. Each must reflect a real,
 * supported capability (see content/prompt-scaffolding.md). Tokens: prompt-suggestions.* .
 * Spec: specs/prompt-suggestions/index.md
 */
export const PromptSuggestions = forwardRef<HTMLDivElement, PromptSuggestionsProps>(
  ({ suggestions, onSelect }, ref) => (
    <Group ref={ref} gap={8}>
      {suggestions.map((s, i) => (
        <UnstyledButton
          key={i}
          onClick={() => onSelect?.(s)}
          style={{
            padding: '6px 12px',
            borderRadius: 99,
            fontSize: 13,
            background: 'var(--cds-surface-subtle)',
            color: 'var(--cds-text-primary)',
            border: '1px solid var(--cds-border-default)',
          }}
        >
          {s}
        </UnstyledButton>
      ))}
    </Group>
  ),
);

PromptSuggestions.displayName = 'PromptSuggestions';
