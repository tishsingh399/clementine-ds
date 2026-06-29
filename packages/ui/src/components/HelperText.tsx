import { Text } from '@mantine/core';
import { forwardRef } from 'react';

export interface HelperTextProps {
  id?: string;
  children: React.ReactNode;
}

/**
 * Clementine HelperText — Supporting hint text shown beneath a form control.
 * Tokens: helper-text.* . Spec: specs/helper-text/index.md
 */
export const HelperText = forwardRef<HTMLParagraphElement, HelperTextProps>(
  ({ id, children }, ref) => (
    <Text ref={ref} id={id} size="xs" style={{ color: 'var(--cds-text-secondary)', marginTop: 4 }}>{children}</Text>
  )
);

HelperText.displayName = 'HelperText';
