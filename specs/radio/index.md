---
component: radio
ds_version: clementine-ds@0.1.0 (2026-06-08 verified)
status: Draft
last_verified: 2026-06-08

category: Component
required_aria: [role, aria-checked, aria-disabled]

semantic_parts:
  group:  Outer wrapper that owns the role="radiogroup"
  root:   Native <input type="radio">
  circle: Visible outer ring
  dot:    Inner filled circle (checked state)
  label:  Text label (clickable)

token_contract:
  - radio.bg.unchecked
  - radio.bg.disabled
  - radio.dot.checked
  - radio.border.default
  - radio.border.checked
  - radio.border.focus
  - radio.fg.label

interaction_states: [default, hover, focus, checked, disabled]

checks:
  aria_correct: false
  structure_correct: true
  states_complete: false
  tokens_valid: false
  no_invented_styles: false

sources:
  react:
    path: packages/ui/src/components/Radio.tsx
    underlying_library: mantine
    exports: [Radio]
  storybook:
    path: apps/storybook/stories/Radio.stories.tsx
  tokens:
    primitives: packages/tokens/src/primitives.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json
    component: packages/tokens/src/components/radio.json

patterns_used_in: [form, segmented-choice]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: RADIO

> **Status:** Draft. Verify `role="radiogroup"` is emitted on the parent and arrow-key navigation works as expected.

## 1. Purpose & Intent

Mutually exclusive choice within a group. For non-exclusive selection use Checkbox.

**Radio must:**
- be a native `<input type="radio">`
- be inside a wrapper with `role="radiogroup"` and `aria-labelledby`
- support arrow-key navigation between options
- have a clickable label
