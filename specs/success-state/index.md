---
component: success-state
ds_version: clementine-ds@0.1.0 (2026-06-11 verified)
status: AI-Ready
last_verified: 2026-06-11

category: Component
required_aria: ["role=status"]

semantic_parts:
  root: the padded container on a success-subtle wash
  icon: the success glyph
  title: the headline
  description: confirmation detail
  action: optional next-step slot

token_contract:
  - success-state.bg
  - success-state.icon
  - success-state.title
  - success-state.description
  - success-state.radius

interaction_states: [default, with-action]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/SuccessState.tsx
    underlying_library: custom (Mantine primitives + tokens)
    exports: [SuccessState, SuccessStateProps]
  storybook:
    path: apps/storybook/stories/SuccessState.stories.tsx
  tokens:
    component: packages/tokens/src/components/success-state.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: SUCCESSSTATE

> **Implementation:** [`packages/ui/src/components/SuccessState.tsx`](../../packages/ui/src/components/SuccessState.tsx).

A centered confirmation state for a completed flow.

| Token | Resolves through | Light |
|---|---|---|
| `success-state.bg` | `{feedback.success-subtle}` | `#f0fdf4` |
| `success-state.icon` | `{feedback.success}` | `#16a34a` |
| `success-state.title` | `{text.primary}` | `#1a1a18` |
| `success-state.description` | `{text.secondary}` | `#6b6b66` |
| `success-state.radius` | `{radius.lg}` | `8px` |

**Do:** Confirm what happened and what is next; Keep it brief and positive.
**Don’t:** Use as a permanent banner; Rely on the green color alone.
