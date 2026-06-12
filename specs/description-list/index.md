---
component: description-list
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: []

semantic_parts:
  root: the dl
  term: dt
  detail: dd

token_contract:
  - description-list.term
  - description-list.detail

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/DescriptionList.tsx
    underlying_library: custom (Mantine primitives + tokens)
    exports: [DescriptionList, DescriptionListProps, DescriptionItem]
  storybook:
    path: apps/storybook/stories/DescriptionList.stories.tsx
  tokens:
    component: packages/tokens/src/components/description-list.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: DESCRIPTIONLIST

> **Implementation:** [`packages/ui/src/components/DescriptionList.tsx`](../../packages/ui/src/components/DescriptionList.tsx).

Term/detail pairs for record metadata and key-value summaries; renders semantic dl/dt/dd.

| Token | Resolves through | Light |
|---|---|---|
| `description-list.term` | `{text.secondary}` | `#6b6b66` |
| `description-list.detail` | `{text.primary}` | `#1a1a18` |

**Do:** Use real dl/dt/dd; Keep terms short + consistent.
**Don't:** Fake it with a two-column table when it is metadata; Mix unrelated pairs.
