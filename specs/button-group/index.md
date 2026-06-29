---
component: button-group
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role]

semantic_parts:
  root: the group
  button: a member button

token_contract:
  - button-group.divider

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ButtonGroup.tsx
    underlying_library: mantine
    exports: [ButtonGroup, ButtonGroupProps]
  storybook:
    path: apps/storybook/stories/ButtonGroup.stories.tsx
  tokens:
    component: packages/tokens/src/components/button-group.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: BUTTONGROUP

> **Implementation:** [`packages/ui/src/components/ButtonGroup.tsx`](../../packages/ui/src/components/ButtonGroup.tsx).

Joins a set of related buttons into one visually-connected control.

| Token | Resolves through | Light |
|---|---|---|
| `button-group.divider` | `{border.strong}` | `#d4d4cf` |

**Do:** Keep members the same size/variant; Limit to a few buttons.
**Don't:** Mix variants within a group; Cram many buttons.
