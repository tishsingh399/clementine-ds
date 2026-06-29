---
component: autocomplete
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role, aria-expanded, aria-controls, aria-activedescendant, aria-autocomplete]

semantic_parts:
  input:   The text field (role=combobox)
  popover: The suggestion list (role=listbox)
  option:  A suggestion (role=option)
  label:   Field label
  error:   Validation message

token_contract:
  - autocomplete.bg
  - autocomplete.border
  - autocomplete.border-focus
  - autocomplete.fg
  - autocomplete.placeholder
  - autocomplete.popover-bg
  - autocomplete.option-bg-hover
  - autocomplete.radius

interaction_states: [default, focus, typing, open, disabled, error]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Autocomplete.tsx
    underlying_library: mantine
    exports: [Autocomplete, AutocompleteProps]
  storybook:
    path: apps/storybook/stories/Autocomplete.stories.tsx
  tokens:
    primitives: packages/tokens/src/primitives.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json
    component: packages/tokens/src/components/autocomplete.json

patterns_used_in: [forms, search, assignee-picker]
pages_used_in: [settings, list-view]
---

# AGENTIC DOCUMENTATION: AUTOCOMPLETE

> **Implementation:** [`packages/ui/src/components/Autocomplete.tsx`](../../packages/ui/src/components/Autocomplete.tsx) — wraps Mantine `Autocomplete` (combobox pattern, free text allowed).

## 1. Purpose & Intent

A text input that suggests matching options as you type but still allows free text. Use **Select** when the value must be one of the options; use **Autocomplete** when free text is valid.

**Autocomplete must:** expose `role="combobox"` with `aria-expanded` on the input · point `aria-controls` at the listbox · track the highlighted option with `aria-activedescendant` · be fully keyboard operable (↑/↓, Enter, Esc).

## 2. Token bindings

| Part | State | Token | Resolves (light) |
|---|---|---|---|
| input fill | default | `autocomplete.bg` → `{surface.elevated}` | `#ffffff` |
| input border | default | `autocomplete.border` → `{border.default}` | `#e5e5e0` |
| input border | focus | `autocomplete.border-focus` → `{focus.ring}` | `#ff8040` |
| value text | default | `autocomplete.fg` → `{text.primary}` | `#1a1a18` |
| placeholder | default | `autocomplete.placeholder` → `{text.tertiary}` | `#a3a39e` |
| listbox fill | open | `autocomplete.popover-bg` → `{surface.elevated}` | `#ffffff` |
| option | hover/active | `autocomplete.option-bg-hover` → `{surface.subtle}` | `#f3f3f0` |
| corners | — | `autocomplete.radius` → `{radius.md}` | `6px` |

## 3. States
`default` · `focus` (ring) · `typing` (filtering) · `open` (listbox shown) · `disabled` · `error` (message + red border).

## 4. Do / Don't
**Do** debounce large data sets; show an empty state when nothing matches. **Don't** use for must-be-valid values (use Select), and don't hide the typed value's meaning behind color alone.
