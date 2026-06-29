---
component: character-counter
ds_version: clementine-ds@0.1.0 (2026-06-11 verified)
status: AI-Ready
last_verified: 2026-06-11

category: Component
required_aria: ["aria-live=polite"]

semantic_parts:
  root: the count text
  over: the over-limit color

token_contract:
  - character-counter.fg
  - character-counter.over

interaction_states: [default, near-limit, over-limit]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/CharacterCounter.tsx
    underlying_library: custom (Mantine primitives + tokens)
    exports: [CharacterCounter, CharacterCounterProps]
  storybook:
    path: apps/storybook/stories/CharacterCounter.stories.tsx
  tokens:
    component: packages/tokens/src/components/character-counter.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: CHARACTERCOUNTER

> **Implementation:** [`packages/ui/src/components/CharacterCounter.tsx`](../../packages/ui/src/components/CharacterCounter.tsx).

A live character count for text inputs, with an over-limit state.

| Token | Resolves through | Light |
|---|---|---|
| `character-counter.fg` | `{text.secondary}` | `#6b6b66` |
| `character-counter.over` | `{feedback.error}` | `#dc2626` |

**Do:** Show current and max ("12 / 280"); Bold near the limit; turn red when over.
**Don’t:** Signal over-limit by color alone (bold + value also change); Hide the limit until exceeded.
