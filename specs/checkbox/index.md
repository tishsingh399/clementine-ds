---
component: checkbox
ds_version: clementine-ds@0.1.0 (2026-07-02 verified)
status: AI-Ready
last_verified: 2026-07-02

category: Component
required_aria: [aria-checked, aria-disabled, aria-describedby]

semantic_parts:
  root:    Native <input type="checkbox"> wrapper
  box:     The visible square that shows checked/indeterminate/unchecked
  check:   The checkmark glyph
  label:   The text label (clickable target)
  description: Optional helper text under the label

token_contract:
  - checkbox.bg.unchecked
  - checkbox.bg.checked
  - checkbox.bg.indeterminate
  - checkbox.bg.disabled
  - checkbox.check
  - checkbox.border.default
  - checkbox.border.focus
  - checkbox.border.error
  - checkbox.fg.label
  - checkbox.fg.description
  - checkbox.fg.error
  - checkbox.radius

interaction_states: [default, hover, focus, checked, indeterminate, disabled, error]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Checkbox.tsx
    underlying_library: mantine
    exports: [Checkbox]
  storybook:
    path: apps/storybook/stories/Checkbox.stories.tsx
  tokens:
    primitives: packages/tokens/src/primitives.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json
    component: packages/tokens/src/components/checkbox.json

patterns_used_in: [form, filter-list, settings-row]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: CHECKBOX

> **Status:** AI-Ready. Mantine owns the native checkbox/indeterminate ARIA; Storybook covers unchecked, checked, indeterminate, disabled, disabled-checked, description, and error states.

## 1. Purpose & Intent

Binary or tri-state form input. Use for non-exclusive selection (multi-select) or for opt-in/opt-out toggles inside a form. For exclusive choice use Radio. For settings outside a form use Switch.

**Checkbox must:**
- be a native `<input type="checkbox">` element
- expose `aria-checked` (including `"mixed"` for indeterminate)
- have a clickable label (the label is part of the hit area)

## 2. Verified Contract

- Indeterminate state is represented through Mantine's native checkbox wrapper and covered in Storybook.
- Error state is represented by the component-tier `checkbox.border.error` and `checkbox.fg.error` contract.
- Descriptive helper copy uses the `description` part and remains attached to the checkbox row.
