---
component: sparkline
ds_version: clementine-ds@HEAD (2026-06-11 verified)
status: AI-Ready
last_verified: 2026-06-11

category: Component
required_aria: [img role with trend summary label]

semantic_parts:
  line: the trend stroke
  fill: optional area under the stroke

token_contract:
  - sparkline.stroke
  - sparkline.fill
  - sparkline.stroke-trend-up
  - sparkline.stroke-trend-down

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Sparkline.tsx
    underlying_library: mantine-charts (recharts)
    exports: [Sparkline, SparklineProps]
  storybook:
    path: apps/storybook/stories/Sparkline.stories.tsx
  tokens:
    component: packages/tokens/src/components/sparkline.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: [dashboard]
---

# AGENTIC DOCUMENTATION: SPARKLINE

> **Implementation:** [`packages/ui/src/components/Sparkline.tsx`](../../packages/ui/src/components/Sparkline.tsx) — axis-less inline trend from `@mantine/charts`, sized for table cells and [Stat](../stat/index.md) cards.

## 1. Purpose & Intent

Shape-of-the-trend at a glance — no axes, no labels, no tooltip. If the reader needs values, it's a [Chart](../chart/index.md).

**Sparkline must:**
- carry an `aria-label` summarizing the trend ("Revenue up 12% over 30 days") — the SVG alone is invisible to AT
- default to `sparkline.stroke`; use `stroke-trend-up`/`stroke-trend-down` ONLY when the up/down judgment is part of the message
- never exceed ~48px height — taller means you want a Chart

## 2. Agent notes

1. Pair with a [Stat](../stat/index.md) for the number + trend combination; don't add text inside the sparkline.
2. Trend colors imply judgment (green=good). For neutral metrics where down is fine (latency!), keep the neutral stroke.
