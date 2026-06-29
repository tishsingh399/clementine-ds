---
component: progress-circle
ds_version: clementine-ds@0.1.0 (2026-06-11 verified)
status: AI-Ready
last_verified: 2026-06-11

category: Component
required_aria: ["role=progressbar", "aria-valuenow/min/max"]

semantic_parts:
  root: the progressbar wrapper
  track: the unfilled ring
  indicator: the filled arc
  label: the center percentage

token_contract:
  - progress-circle.track
  - progress-circle.indicator
  - progress-circle.label

interaction_states: [0, 50, 100]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ProgressCircle.tsx
    underlying_library: custom (Mantine primitives + tokens)
    exports: [ProgressCircle, ProgressCircleProps]
  storybook:
    path: apps/storybook/stories/ProgressCircle.stories.tsx
  tokens:
    component: packages/tokens/src/components/progress-circle.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: PROGRESSCIRCLE

> **Implementation:** [`packages/ui/src/components/ProgressCircle.tsx`](../../packages/ui/src/components/ProgressCircle.tsx).

A circular determinate progress indicator with a center label.

| Token | Resolves through | Light |
|---|---|---|
| `progress-circle.track` | `{surface.subtle}` | `#f3f3f0` |
| `progress-circle.indicator` | `{action.primary}` | `#2563eb` |
| `progress-circle.label` | `{text.primary}` | `#1a1a18` |

**Do:** Show the numeric value in the center; Set aria-valuenow for assistive tech.
**Don’t:** Use for indeterminate states; Convey the value by color alone.
