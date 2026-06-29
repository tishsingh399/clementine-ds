---
component: list
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role]

semantic_parts:
  root: the list
  item: a list item
  marker: bullet/number

token_contract:
  - list.fg
  - list.marker

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/List.tsx
    underlying_library: mantine
    exports: [List, ListItem, ListProps]
  storybook:
    path: apps/storybook/stories/List.stories.tsx
  tokens:
    component: packages/tokens/src/components/list.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: LIST

> **Implementation:** [`packages/ui/src/components/List.tsx`](../../packages/ui/src/components/List.tsx).

Ordered or unordered lists with consistent markers and spacing.

| Token | Resolves through | Light |
|---|---|---|
| `list.fg` | `{text.primary}` | `#1a1a18` |
| `list.marker` | `{text.tertiary}` | `#a3a39e` |

**Do:** Use semantic ul/ol; Keep items parallel in structure.
**Don't:** Fake a list with divs; Nest deeply.
