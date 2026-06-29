---
component: number-input
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role, aria-valuenow]

semantic_parts:
  root: the input
  stepper: increment/decrement controls
  label: field label

token_contract:
  - number-input.bg
  - number-input.border
  - number-input.border-focus
  - number-input.fg
  - number-input.placeholder
  - number-input.radius

interaction_states: [default, focus, disabled, error]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/NumberInput.tsx
    underlying_library: mantine
    exports: [NumberInput, NumberInputProps]
  storybook:
    path: apps/storybook/stories/NumberInput.stories.tsx
  tokens:
    component: packages/tokens/src/components/number-input.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [forms]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: NUMBERINPUT

> **Implementation:** [`packages/ui/src/components/NumberInput.tsx`](../../packages/ui/src/components/NumberInput.tsx) — wraps Mantine `NumberInput`.

A numeric input with optional steppers, min/max, and formatting (seats, quotas, counts).

| Token | Resolves through | Light |
|---|---|---|
| `number-input.bg` | `{surface.elevated}` | `#ffffff` |
| `number-input.border` | `{border.strong}` | `#d4d4cf` |
| `number-input.border-focus` | `{focus.ring}` | `#ff8040` |
| `number-input.fg` | `{text.primary}` | `#1a1a18` |
| `number-input.placeholder` | `{text.tertiary}` | `#a3a39e` |
| `number-input.radius` | `{radius.md}` | `6px` |

**Do:** Set min/max/step to constrain input; Right-align numerals in tables; Show units in the label or suffix.
**Don't:** Use for non-numeric data; Hide validation errors.
