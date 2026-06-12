import { forwardRef } from 'react';

export interface FieldLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  optional?: boolean;
}

/**
 * Clementine FieldLabel — A form field label with optional required or optional markers.
 * Tokens: field-label.* . Spec: specs/field-label/index.md
 */
export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ children, htmlFor, required, optional }, ref) => (
    <label ref={ref} htmlFor={htmlFor}
      style={{ color: 'var(--tds-text-primary)', fontSize: 14, fontWeight: 600, display: 'inline-flex', gap: 4, alignItems: 'baseline' }}>
      {children}
      {required && <span aria-hidden style={{ color: 'var(--tds-feedback-error)' }}>*</span>}
      {required && <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0 0 0 0)', border: 0 }}>(required)</span>}
      {!required && optional && <span style={{ color: 'var(--tds-text-secondary)', fontWeight: 400, fontSize: 13 }}>(optional)</span>}
    </label>
  )
);

FieldLabel.displayName = 'FieldLabel';
