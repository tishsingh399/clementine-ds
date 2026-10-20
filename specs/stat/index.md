---
component: stat
ds_version: clementine-ds@0.1.0 (2026-10-06 verified)
status: AI-Ready
last_verified: 2026-10-19
verified_commit: 015819c0
verified_by: [contract, honesty, token-parity, runtime-tokens, painted-dom]

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
| `stat.value` | `{text.primary}` | `#2a2926` |
| `stat.label` | `{text.tertiary}` | `#6e6b65` |
| `stat.delta-up` | `{text.success}` | `#267542` |
| `stat.delta-down` | `{feedback.error}` | `#c1332f` |

> 2026-10-17: `stat.delta-up` moved from `feedback.success` to `text.success`. Small text needs a text token; `feedback.*` is for fills and icons, and failed AA as text. Stat.tsx reads its own `--cds-stat-*` vars.

**Do:** Pair the trend arrow with text + color; Keep labels short; Right-size the value type.
**Don't:** Show a delta with color/arrow but no number; Cram units ambiguously.
