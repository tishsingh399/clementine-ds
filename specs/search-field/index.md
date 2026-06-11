---
component: search-field
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role, aria-label]

semantic_parts:
  root: the input
  icon: search affordance
  clear: clear button

token_contract:
  - search-field.bg
  - search-field.border
  - search-field.border-focus
  - search-field.fg
  - search-field.placeholder
  - search-field.icon
  - search-field.radius

interaction_states: [empty, typing, focus, disabled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/SearchField.tsx
    underlying_library: mantine
    exports: [SearchField, SearchFieldProps]
  storybook:
    path: apps/storybook/stories/SearchField.stories.tsx
  tokens:
    component: packages/tokens/src/components/search-field.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: SEARCHFIELD

> **Implementation:** [`packages/ui/src/components/SearchField.tsx`](../../packages/ui/src/components/SearchField.tsx).

A TextInput preset for search: type=search, a leading search affordance, and a clearable value.

| Token | Resolves through | Light |
|---|---|---|
| `search-field.bg` | `{surface.elevated}` | `#ffffff` |
| `search-field.border` | `{border.strong}` | `#d4d4cf` |
| `search-field.border-focus` | `{focus.ring}` | `#ff8040` |
| `search-field.fg` | `{text.primary}` | `#1a1a18` |
| `search-field.placeholder` | `{text.tertiary}` | `#a3a39e` |
| `search-field.icon` | `{text.secondary}` | `#6b6b66` |
| `search-field.radius` | `{radius.md}` | `6px` |

**Do:** Debounce queries; pair with typeahead/faceted results; Offer a clear control; Announce result counts.
**Don't:** Search on every keystroke without debounce; Hide what was searched.
