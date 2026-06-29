---
component: empty-state
ds_version: clementine-ds@0.1.0 (2026-06-11 verified)
status: AI-Ready
last_verified: 2026-06-11

category: Component
required_aria: ["role=status"]

semantic_parts:
  root: the padded, centered container
  icon: a decorative glyph (aria-hidden)
  title: the headline
  description: supporting text
  action: optional CTA slot

token_contract:
  - empty-state.bg
  - empty-state.icon
  - empty-state.title
  - empty-state.description
  - empty-state.radius

interaction_states: [default, with-action]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/EmptyState.tsx
    underlying_library: custom (Mantine primitives + tokens)
    exports: [EmptyState, EmptyStateProps]
  storybook:
    path: apps/storybook/stories/EmptyState.stories.tsx
  tokens:
    component: packages/tokens/src/components/empty-state.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: EMPTYSTATE

> **Implementation:** [`packages/ui/src/components/EmptyState.tsx`](../../packages/ui/src/components/EmptyState.tsx).

A centered placeholder for no-data or cleared-filter views, with an optional next action.

| Token | Resolves through | Light |
|---|---|---|
| `empty-state.bg` | `{surface.subtle}` | `#f3f3f0` |
| `empty-state.icon` | `{text.tertiary}` | `#a3a39e` |
| `empty-state.title` | `{text.primary}` | `#1a1a18` |
| `empty-state.description` | `{text.secondary}` | `#6b6b66` |
| `empty-state.radius` | `{radius.lg}` | `8px` |

**Do:** Pair a short title with a clear next action; Keep the icon muted and decorative.
**Don’t:** Blame the user for empty data; Use for error or loading conditions.
