---
component: checkbox
ds_version: clementine-ds@HEAD (2026-06-08 verified)
status: Draft
last_verified: 2026-06-08

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
  aria_correct: false
  structure_correct: true
  states_complete: false
  tokens_valid: false
  no_invented_styles: false

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

> **Status:** Draft. Needs ARIA verification + full state coverage in Storybook.

## 1. Purpose & Intent

Binary or tri-state form input. Use for non-exclusive selection (multi-select) or for opt-in/opt-out toggles inside a form. For exclusive choice use Radio. For settings outside a form use Switch.

**Checkbox must:**
- be a native `<input type="checkbox">` element
- expose `aria-checked` (including `"mixed"` for indeterminate)
- have a clickable label (the label is part of the hit area)

## 2. Open Items

- Verify Mantine's default ARIA output covers `aria-checked="mixed"` for indeterminate
- Confirm error state binds `feedback.error` for both border and helper text
- Add Storybook stories for: indeterminate, error
