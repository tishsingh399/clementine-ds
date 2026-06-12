# Sparkline

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/sparkline/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Sparkline.tsx) | [Storybook](https://clementine-ds-storybook.vercel.app/?path=/story/components-sparkline--default) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/sparkline.json)

## Overview

Axis-less inline trend for table cells and Stat cards. Shape-of-the-trend only — if the reader needs values, it's a Chart.

Status: `AI-Ready`. Token contract closed at 4 component-tier tokens. Dependency-gated: `@mantine/charts`.

## Rules

- Always carry an `aria-label` summarizing the trend — the SVG alone is invisible to assistive tech
- Trend colors (`stroke-trend-up`/`down`) imply judgment; for metrics where down is good (latency), keep the neutral stroke
- Max ~48px tall — taller wants a Chart

## Related

- [Chart](./chart.md) · [Stat](./stat.md)
