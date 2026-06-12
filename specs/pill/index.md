---
component: pill
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [aria-label]

semantic_parts:
  root: the pill
  label: text
  remove: remove button

token_contract:
  - pill.bg
  - pill.fg
  - pill.remove
  - pill.radius

interaction_states: [default, removable]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Pill.tsx
    underlying_library: mantine
    exports: [Pill, PillGroup, PillProps]
  storybook:
    path: apps/storybook/stories/Pill.stories.tsx
  tokens:
    component: packages/tokens/src/components/pill.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: PILL

> **Implementation:** [`packages/ui/src/components/Pill.tsx`](../../packages/ui/src/components/Pill.tsx).

A compact, often-removable token representing a selected value or applied filter.

| Token | Resolves through | Light |
|---|---|---|
| `pill.bg` | `{surface.subtle}` | `#f3f3f0` |
| `pill.fg` | `{text.primary}` | `#1a1a18` |
| `pill.remove` | `{text.secondary}` | `#6b6b66` |
| `pill.radius` | `{radius.xl}` | `99px` |

**Do:** Make remove keyboard-reachable + labelled; Truncate long values.
**Don't:** Use for status (Badge) or actions (Button).
