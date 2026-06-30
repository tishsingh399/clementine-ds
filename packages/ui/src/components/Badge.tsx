import { Badge as MantineBadge, type BadgeProps as MantineBadgeProps } from '@mantine/core';
import { forwardRef } from 'react';

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low';

const riskColorMap: Record<RiskLevel, string> = {
  critical: 'red',
  high: 'orange',
  medium: 'orange',
  low: 'green',
};

const riskVariantMap: Record<RiskLevel, string> = {
  critical: 'filled',
  high: 'light',
  medium: 'light',
  low: 'light',
};

export interface BadgeProps extends MantineBadgeProps {
  risk?: RiskLevel;
}

const colorIntentMap: Record<string, string> = {
  gray: 'neutral',
  green: 'success',
  red: 'error',
  orange: 'warning',
};

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ risk, color, variant, ...props }, ref) => {
    const resolvedColor = risk ? riskColorMap[risk] : color;
    const resolvedVariant = risk ? riskVariantMap[risk] : variant;
    const intent = risk ? undefined : colorIntentMap[resolvedColor ?? 'gray'] ?? 'neutral';

    return (
      <MantineBadge
        ref={ref}
        color={resolvedColor}
        variant={resolvedVariant}
        data-intent={intent}
        data-risk={risk}
        {...props}
      />
    );
  },
);

Badge.displayName = 'Badge';
