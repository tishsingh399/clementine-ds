---
component: text-input
ds_version: clementine-ds@0.1.0 (2026-06-08 verified)
status: Draft
last_verified: 2026-06-08

category: Component
required_aria: [aria-invalid, aria-describedby, aria-required, aria-disabled]

semantic_parts:
  label:       <label> tied to the input via for/id
  root:        Outer wrapper that owns the border + focus ring
  input:       Native <input type="text"> (or email, password, etc.)
  icon-leading: Optional leading icon
  icon-trailing: Optional trailing icon (clear button, status indicator)
  helper:      Helper or error text under the input

token_contract:
  - text-input.bg.default
  - text-input.bg.disabled
  - text-input.fg.value
  - text-input.fg.placeholder
  - text-input.fg.disabled
  - text-input.border.default
  - text-input.border.hover
  - text-input.border.focus
  - text-input.border.error
  - text-input.ring
  - text-input.radius

interaction_states: [default, hover, focus, filled, disabled, error, loading]

checks:
  aria_correct: false
  structure_correct: true
  states_complete: false
  tokens_valid: false
  no_invented_styles: false

sources:
  react:
    path: packages/ui/src/components/TextInput.tsx
    underlying_library: mantine
    exports: [TextInput]
  storybook:
    path: apps/storybook/stories/TextInput.stories.tsx
  tokens:
    primitives: packages/tokens/src/primitives.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json
    component: packages/tokens/src/components/text-input.json

patterns_used_in: [form, search-bar, filter-bar, table-row-editor]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: TEXT-INPUT

> **Status:** Draft. Needs full state coverage and error-text wiring (`aria-describedby` → helper id).

## 1. Purpose & Intent

Single-line free-text input. For multi-line use Textarea. For closed lists use Select. For sensitive values use `type="password"`.

**TextInput must:**
- have an associated `<label>` (visible by default; `aria-label` only as a last resort)
- expose `aria-invalid="true"` and `aria-describedby="<helperId>"` on error
- preserve native browser autofill / autocomplete behavior
