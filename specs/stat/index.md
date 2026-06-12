---
component: stat
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: []

semantic_parts:
  label: metric name
  value: the number
  delta: trend change

token_contract:
  - stat.value
  - stat.label
  - stat.delta-up
  - stat.delta-down

interaction_states: [default, up, down]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Stat.tsx
    underlying_library: custom (Mantine primitives + tokens)
    exports: [Stat, StatProps]
  storybook:
    path: apps/storybook/stories/Stat.stories.tsx
  tokens:
    component: packages/tokens/src/components/stat.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: STAT

> **Implementation:** [`packages/ui/src/components/Stat.tsx`](../../packages/ui/src/components/Stat.tsx).

A KPI/metric tile: a label, a large value, and an optional trend delta.

| Token | Resolves through | Light |
|---|---|---|
| `stat.value` | `{text.primary}` | `#1a1a18` |
| `stat.label` | `{text.tertiary}` | `#a3a39e` |
| `stat.delta-up` | `{feedback.success}` | `#16a34a` |
| `stat.delta-down` | `{feedback.error}` | `#dc2626` |

**Do:** Pair the trend arrow with text + color; Keep labels short; Right-size the value type.
**Don't:** Show a delta with color/arrow but no number; Cram units ambiguously.
