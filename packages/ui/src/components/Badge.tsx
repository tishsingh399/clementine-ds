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

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ risk, color, variant, ...props }, ref) => {
    const resolvedColor = risk ? riskColorMap[risk] : color;
    const resolvedVariant = risk ? riskVariantMap[risk] : variant;

    return (
      <MantineBadge
        ref={ref}
        color={resolvedColor}
        variant={resolvedVariant}
        {...props}
      />
    );
  },
);

Badge.displayName = 'Badge';
