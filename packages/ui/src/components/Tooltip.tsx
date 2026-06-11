import { Tooltip as MantineTooltip, type TooltipProps as MantineTooltipProps } from '@mantine/core';

export interface TooltipProps extends MantineTooltipProps {}

/**
 * Clementine Tooltip — short, supplementary text revealed on hover or keyboard focus.
 *
 * Defaults encode the spec: 200ms open delay (anti-flicker), immediate close, arrow on.
 * The bubble carries `role="tooltip"` and is linked to the trigger via `aria-describedby`.
 * Icon-only triggers must STILL set their own `aria-label` — the tooltip describes, it
 * does not name. See specs/tooltip/index.md.
 */
export function Tooltip({ openDelay = 200, closeDelay = 0, withArrow = true, ...props }: TooltipProps) {
  return <MantineTooltip openDelay={openDelay} closeDelay={closeDelay} withArrow={withArrow} {...props} />;
}

Tooltip.displayName = 'Tooltip';
