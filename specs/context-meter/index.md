---
component: context-meter
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: [role, aria-valuenow]
model_baseline: claude-opus-4-8

semantic_parts:
  track: unfilled budget
  fill: used budget
  label: used / total

token_contract:
  - context-meter.track
  - context-meter.fill
  - context-meter.fill-warning
  - context-meter.label

interaction_states: [default, warning]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/ContextMeter.tsx
    underlying_library: custom
    exports: [ContextMeter, ContextMeterProps]
  storybook:
    path: apps/storybook/stories/ai/ContextMeter.stories.tsx
  tokens:
    component: packages/tokens/src/components/context-meter.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: CONTEXTMETER

> **Implementation:** [`packages/ui/src/components/ai/ContextMeter.tsx`](../../packages/ui/src/components/ai/ContextMeter.tsx).

Shows how much of the context window is consumed (used / total), warning as it nears the limit.

| Token | Resolves through | Light |
|---|---|---|
| `context-meter.track` | `{surface.subtle}` | `#f3f3f0` |
| `context-meter.fill` | `{action.primary}` | `#2563eb` |
| `context-meter.fill-warning` | `{feedback.warning}` | `#f97316` |
| `context-meter.label` | `{text.tertiary}` | `#a3a39e` |

**Do:** Warn before the limit; show the numbers; Use role=meter with aria values.
**Don't:** Surprise the user at the hard limit; Show the bar without the figures.
