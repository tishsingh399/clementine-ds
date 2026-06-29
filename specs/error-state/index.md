---
component: error-state
ds_version: clementine-ds@0.1.0 (2026-06-11 verified)
status: AI-Ready
last_verified: 2026-06-11

category: Component
required_aria: ["role=alert"]

semantic_parts:
  root: the padded container on an error-subtle wash
  icon: the error glyph
  title: the headline
  description: what went wrong
  action: optional retry slot

token_contract:
  - error-state.bg
  - error-state.icon
  - error-state.title
  - error-state.description
  - error-state.radius

interaction_states: [default, with-retry]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ErrorState.tsx
    underlying_library: custom (Mantine primitives + tokens)
    exports: [ErrorState, ErrorStateProps]
  storybook:
    path: apps/storybook/stories/ErrorState.stories.tsx
  tokens:
    component: packages/tokens/src/components/error-state.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: ERRORSTATE

> **Implementation:** [`packages/ui/src/components/ErrorState.tsx`](../../packages/ui/src/components/ErrorState.tsx).

A centered failure state with a cause and an optional retry.

| Token | Resolves through | Light |
|---|---|---|
| `error-state.bg` | `{feedback.error-subtle}` | `#fef2f2` |
| `error-state.icon` | `{feedback.error}` | `#dc2626` |
| `error-state.title` | `{text.primary}` | `#1a1a18` |
| `error-state.description` | `{text.secondary}` | `#6b6b66` |
| `error-state.radius` | `{radius.lg}` | `8px` |

**Do:** Say what failed in plain language; Offer a retry or next step.
**Don’t:** Expose raw stack traces; Use color as the only error signal.
