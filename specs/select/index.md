---
component: select
ds_version: clementine-ds@0.1.0 (2026-07-02 verified)
status: AI-Ready
last_verified: 2026-07-02

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
  - select.bg.trigger
  - select.bg.trigger-disabled
  - select.bg.popover
  - select.option.bg-default
  - select.option.bg-hover
  - select.option.bg-selected
  - select.option.fg-default
  - select.option.fg-selected
  - select.fg.value
  - select.fg.placeholder
  - select.border.default
  - select.border.focus
  - select.border.error
  - select.ring
  - select.radius

interaction_states: [default, hover, focus, open, disabled, error]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

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
    component: packages/tokens/src/components/select.json

patterns_used_in: [form, filter-bar, table-row-editor]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: SELECT

> **Status:** AI-Ready. Select is the Mantine single-value combobox/listbox pattern for closed lists. Searchable Select is allowed for filtering known options; freeform values belong in a future Combobox spec.

## 1. Purpose & Intent

Single-choice picker for a closed list of options. Use Select when the list is short to medium and known up front. For type-ahead / search use a Combobox (not yet specced).

## 2. Verified Contract

- Use Select for one value from a known list.
- Use `searchable` only to filter known options, not to accept arbitrary input.
- Storybook covers default, searchable, clearable, long-list, empty, error, and disabled states.
