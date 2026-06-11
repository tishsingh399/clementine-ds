---
component: loading-state
ds_version: clementine-ds@HEAD (2026-06-11 verified)
status: AI-Ready
last_verified: 2026-06-11

category: Component
required_aria: ["role=status", "aria-live=polite"]

semantic_parts:
  root: the centered container
  spinner: the animated indicator
  label: the status text

token_contract:
  - loading-state.spinner
  - loading-state.label
  - loading-state.bg

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/LoadingState.tsx
    underlying_library: custom (Mantine primitives + tokens)
    exports: [LoadingState, LoadingStateProps]
  storybook:
    path: apps/storybook/stories/LoadingState.stories.tsx
  tokens:
    component: packages/tokens/src/components/loading-state.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: LOADINGSTATE

> **Implementation:** [`packages/ui/src/components/LoadingState.tsx`](../../packages/ui/src/components/LoadingState.tsx).

A centered spinner with a label for a loading region.

| Token | Resolves through | Light |
|---|---|---|
| `loading-state.spinner` | `{action.primary}` | `#2563eb` |
| `loading-state.label` | `{text.secondary}` | `#6b6b66` |
| `loading-state.bg` | `{surface.default}` | `#fafaf8` |

**Do:** Give the spinner a text label; Keep it centered in the region it replaces.
**Don’t:** Block the whole screen for small loads; Use color as the only cue.
