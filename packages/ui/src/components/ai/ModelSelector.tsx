import { Select, type SelectProps } from '@mantine/core';
import { forwardRef } from 'react';

export interface ModelSelectorProps extends Omit<SelectProps, 'data'> {
  /** Available model ids. */
  models: string[];
}

/**
 * Tray 4 · AI — pick the active model for a surface. The chosen model + prompt version
 * should be recorded with feedback (see governance/model-prompt-registry.json).
 * Tokens: model-selector.* . Spec: specs/ai/model-selector/index.md
 */
export const ModelSelector = forwardRef<HTMLInputElement, ModelSelectorProps>(
  ({ models, ...props }, ref) => (
    <Select
      ref={ref}
      data={models}
      leftSection={<span aria-hidden>✦</span>}
      checkIconPosition="right"
      allowDeselect={false}
      {...props}
    />
  ),
);

ModelSelector.displayName = 'ModelSelector';
