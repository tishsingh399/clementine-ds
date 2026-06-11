import { Badge, type BadgeProps as MantineBadgeProps } from '@mantine/core';
import { forwardRef } from 'react';

export interface DisclosureBadgeProps extends Omit<MantineBadgeProps, 'children'> {
  /** Disclosure text. Defaults to "AI-generated". */
  label?: string;
}

/**
 * Tray 7 · Trust — a small, consistent marker that content was produced or assisted by AI.
 *
 * Disclosure is non-negotiable for AI output; this gives it one reusable, recognizable form.
 * Tokens: disclosure.* . See specs/trust/disclosure-badge/index.md.
 */
export const DisclosureBadge = forwardRef<HTMLDivElement, DisclosureBadgeProps>(
  ({ label = 'AI-generated', variant = 'light', color = 'gray', size = 'sm', ...props }, ref) => {
    return (
      <Badge ref={ref} variant={variant} color={color} size={size} {...props}>
        ✦ {label}
      </Badge>
    );
  },
);

DisclosureBadge.displayName = 'DisclosureBadge';
