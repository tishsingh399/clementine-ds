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

const tokenBgByIntent: Record<string, string> = {
  neutral: 'var(--cds-badge-bg-neutral)',
  success: 'var(--cds-badge-bg-success)',
  error: 'var(--cds-badge-bg-error)',
  warning: 'var(--cds-badge-bg-warning)',
};

const tokenBgByRisk: Record<RiskLevel, string> = {
  critical: 'var(--cds-badge-bg-risk-critical)',
  high: 'var(--cds-badge-bg-risk-high)',
  medium: 'var(--cds-badge-bg-risk-medium)',
  low: 'var(--cds-badge-bg-risk-low)',
};

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ risk, color, variant, style, ...props }, ref) => {
    const resolvedColor = risk ? riskColorMap[risk] : color;
    const resolvedVariant = risk ? riskVariantMap[risk] : variant;
    const intent = colorIntentMap[resolvedColor ?? 'gray'] ?? 'neutral';
    const backgroundColor = risk ? tokenBgByRisk[risk] : tokenBgByIntent[intent];

    return (
      <MantineBadge
        ref={ref}
        color={resolvedColor}
        variant={resolvedVariant}
        data-intent={risk ? undefined : intent}
        data-risk={risk}
        style={[
          { backgroundColor },
          style,
        ]}
        {...props}
      />
    );
  },
);

Badge.displayName = 'Badge';
