---
component: date-input
ds_version: clementine-ds@HEAD (2026-06-11 verified)
status: AI-Ready
last_verified: 2026-06-11

category: Component
required_aria: [aria-invalid, aria-describedby, aria-expanded on popover trigger]

semantic_parts:
  label: associated <label>
  input: the text field (free-typed, parsed)
  popover: the calendar dropdown
  helper: helper or error text

token_contract:
  - date-input.bg
  - date-input.fg
  - date-input.placeholder
  - date-input.border
  - date-input.border-focus
  - date-input.border-error
  - date-input.ring
  - date-input.popover-bg
  - date-input.radius

interaction_states: [default, focus, open, filled, error, disabled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/DateInput.tsx
    underlying_library: mantine-dates
    exports: [DateInput, DateInputProps]
  storybook:
    path: apps/storybook/stories/DateInput.stories.tsx
  tokens:
    component: packages/tokens/src/components/date-input.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [forms, form-field]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: DATE-INPUT

> **Implementation:** [`packages/ui/src/components/DateInput.tsx`](../../packages/ui/src/components/DateInput.tsx) — wraps `@mantine/dates` DateInput: a TextInput that parses free-typed dates and offers a calendar popover.

## 1. Purpose & Intent

Date entry as a form field. The user can type ("11 jun 2026", "06/11/2026") or pick from the popover. Belongs inside a [FormField](../../patterns/form-field/index.md) like every other input.

**DateInput must:**
- accept free typing and parse leniently; show the canonical format on blur
- expose `aria-invalid` + `aria-describedby` on parse/validation errors
- keep the TextInput sizing/border/focus behavior 1:1 with [TextInput](../text-input/index.md)

## 2. When to use / not

- ✅ Known dates the user can type (birthdate, document date)
- ❌ Browsy/range selection → [DatePicker](../date-picker/index.md)

## 3. Agent notes

1. Pair with FormField for label + helper wiring; never use a bare placeholder as the label.
2. `valueFormat` controls display; parsing stays lenient regardless.
3. The popover reuses date-picker day styling — only the input chrome is owned here.
