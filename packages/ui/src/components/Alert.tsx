import { Alert as MantineAlert, type AlertProps as MantineAlertProps } from '@mantine/core';
import { forwardRef } from 'react';

export type AlertIntent = 'info' | 'success' | 'warning' | 'error';

/** Intent → Mantine color. Each maps to the alert.* token group in semantic-light/dark. */
const intentColor: Record<AlertIntent, string> = {
  info: 'gray',
  success: 'green',
  warning: 'orange',
  error: 'red',
};

export interface AlertProps extends Omit<MantineAlertProps, 'color'> {
  /** Semantic intent — drives fill, border, and icon color via the alert.* tokens. */
  intent?: AlertIntent;
}

/**
 * Clementine Alert — inline contextual feedback (info / success / warning / error).
 *
 * Communicates with color AND an icon — never color alone (WCAG 1.4.1). Pass an `icon`
 * for the intent; the default `variant="light"` produces the subtle feedback fills.
 * See specs/alert/index.md.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ intent = 'info', variant = 'light', ...props }, ref) => {
    return <MantineAlert ref={ref} color={intentColor[intent]} variant={variant} {...props} />;
  },
);

Alert.displayName = 'Alert';
