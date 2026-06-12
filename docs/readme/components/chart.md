# Chart (Area · Line · Bar)

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/chart/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Chart.tsx) | [Storybook](https://clementine-ds-storybook.vercel.app/?path=/story/components-chart--area) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/chart.json)

## Overview

The dashboard chart family — AreaChart, LineChart, BarChart — over one shared contract: same axes, grid, tooltip, and 5-color series palette. Choosing a geometry is not choosing a new visual language.

Status: `AI-Ready`. Token contract closed at 10 component-tier tokens. Dependency-gated: `@mantine/charts` (recharts).

## Choosing geometry

| Use | When |
|---|---|
| AreaChart | cumulative / volume over time, 1–3 series |
| LineChart | trends and comparisons, up to 5 series |
| BarChart | discrete categories, ranked values |

## The series palette

Five colors, semantic-bound, closed:

| Token | Resolves through | Light |
|---|---|---|
| `chart.series-1` | `action.primary` | `#2563eb` |
| `chart.series-2` | `feedback.success` | `#16a34a` |
| `chart.series-3` | `feedback.warning` | `#f97316` |
| `chart.series-4` | `feedback.error` | `#dc2626` |
| `chart.series-5` | `risk.medium` | `#f97316` |

More than 5 series means the chart needs rethinking, not a 6th color.

## Accessibility

- `aria-label` summarizing the trend, or a data-table fallback for complex charts
- Empty data renders EmptyState — never a bare grid

## Related

- [Sparkline](./sparkline.md) · [Stat](./stat.md) · [EmptyState](./empty-state.md)
