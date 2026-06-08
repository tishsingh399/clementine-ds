---
component: select
ds_version: clementine-ds@HEAD (2026-06-08 verified)
status: Draft
last_verified: 2026-06-08

category: Component
required_aria: [role, aria-expanded, aria-controls, aria-activedescendant]

semantic_parts:
  root:        Trigger button that opens the popover
  value:       Display of the current selection
  caret:       Down chevron icon
  popover:     Floating list of options
  option:      Single option row
  empty-state: Shown when no options match

token_contract:
  - surface.elevated
  - surface.default
  - text.primary
  - text.secondary
  - border.default
  - border.strong
  - border.focus
  - focus.ring
  - action.primary

interaction_states: [default, hover, focus, open, disabled, error]

checks:
  aria_correct: false
  structure_correct: true
  states_complete: false
  tokens_valid: false
  no_invented_styles: false

sources:
  react:
    path: packages/ui/src/components/Select.tsx
    underlying_library: mantine
    exports: [Select]
  storybook:
    path: apps/storybook/stories/Select.stories.tsx
  tokens:
    primitives: packages/tokens/src/primitives.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [form, filter-bar, table-row-editor]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: SELECT

> **Status:** Draft. Combobox vs select pattern needs an explicit decision.

## 1. Purpose & Intent

Single-choice picker for a closed list of options. Use Select when the list is short to medium and known up front. For type-ahead / search use a Combobox (not yet specced).

## 2. Open Items

- Decide: ARIA pattern is `combobox` (text + listbox) or `listbox` (button + listbox)?
- Add Storybook stories for: empty, long-list (overflow), error
