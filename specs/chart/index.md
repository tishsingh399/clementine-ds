---
component: chart
ds_version: clementine-ds@HEAD (2026-06-11 verified)
status: AI-Ready
last_verified: 2026-06-11

category: Component
required_aria: [img role or table fallback, accessible series labels]

semantic_parts:
  plot: the drawing area
  grid: gridlines
  axis: x/y axis labels
  series: a data series (line/area/bar geometry)
  tooltip: hover detail card
  legend: series key

token_contract:
  - chart.grid
  - chart.axis-fg
  - chart.label-fg
  - chart.tooltip-bg
  - chart.tooltip-fg
  - chart.series-1
  - chart.series-2
  - chart.series-3
  - chart.series-4
  - chart.series-5

interaction_states: [default, hover, empty]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Chart.tsx
    underlying_library: mantine-charts (recharts)
    exports: [AreaChart, LineChart, BarChart, AreaChartProps, LineChartProps, BarChartProps]
  storybook:
    path: apps/storybook/stories/Chart.stories.tsx
  tokens:
    component: packages/tokens/src/components/chart.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [cost-latency-transparency]
pages_used_in: [dashboard]
---

# AGENTIC DOCUMENTATION: CHART

> **Implementation:** [`packages/ui/src/components/Chart.tsx`](../../packages/ui/src/components/Chart.tsx) — Area / Line / Bar from `@mantine/charts` over one shared contract. Only the mark geometry differs; axes, grid, tooltip and the 5-color series palette are identical.

## 1. Purpose & Intent

Dashboard time-series and category comparison. One spec covers the family on purpose: an agent choosing Area vs Line vs Bar is choosing geometry, not a new visual language.

**Chart must:**
- draw series colors ONLY from `chart.series-1..5` (5 max — more series means the chart needs rethinking, not more colors)
- keep gridlines lighter than axis text (`chart.grid` < `chart.axis-fg`)
- provide an accessible fallback: `aria-label` summarizing the trend, or a data table for complex charts
- render an [EmptyState](../empty-state/index.md) when there is no data — never an empty grid

## 2. Choosing geometry

| Use | When |
|---|---|
| AreaChart | cumulative or volume-over-time, 1–3 series |
| LineChart | trends/comparisons, up to 5 series |
| BarChart | discrete categories, ranked values |

## 3. Agent notes

1. Series prop: `{ name, color: 'blue.6' }` — agents map series-N tokens to their resolved Mantine color keys (series-1 → blue.6, series-2 → green.6, series-3 → orange.5, series-4 → red.6, series-5 → orange.5/risk).
2. Don't invent a 6th series color. Split the chart instead.
3. Sparkline is a separate, smaller contract: [sparkline](../sparkline/index.md).
