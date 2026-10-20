---
component: search-field
ds_version: clementine-ds@0.1.0 (2026-10-06 verified)
status: AI-Ready
last_verified: 2026-10-06
verified_commit: 015819c0
verified_by: [contract, honesty, token-parity, runtime-tokens, painted-dom]

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
| `search-field.border` | `{border.strong}` | `#83807a` |
| `search-field.border-focus` | `{focus.ring}` | `#e86800` |
| `search-field.fg` | `{text.primary}` | `#2a2926` |
| `search-field.placeholder` | `{text.tertiary}` | `#6e6b65` |
| `search-field.icon` | `{text.secondary}` | `#65635e` |
| `search-field.radius` | `{radius.md}` | `6px` |

**Do:** Debounce queries; pair with typeahead/faceted results; Offer a clear control; Announce result counts.
**Don't:** Search on every keystroke without debounce; Hide what was searched.
