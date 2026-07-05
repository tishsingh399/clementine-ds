---
component: password-input
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [aria-label]

semantic_parts:
  root: the input
  toggle: show/hide visibility button
  label: field label

token_contract:
  - password-input.bg
  - password-input.border
  - password-input.border-focus
  - password-input.fg
  - password-input.placeholder
  - password-input.radius

interaction_states: [default, focus, disabled, error]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/PasswordInput.tsx
    underlying_library: mantine
    exports: [PasswordInput, PasswordInputProps]
  storybook:
    path: apps/storybook/stories/PasswordInput.stories.tsx
  tokens:
    component: packages/tokens/src/components/password-input.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [forms]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: PASSWORDINPUT

> **Implementation:** [`packages/ui/src/components/PasswordInput.tsx`](../../packages/ui/src/components/PasswordInput.tsx) — wraps Mantine `PasswordInput`.

A masked text input with a visibility toggle, for passwords and secrets.

| Token | Resolves through | Light |
|---|---|---|
| `password-input.bg` | `{surface.elevated}` | `#ffffff` |
| `password-input.border` | `{border.strong}` | `#737370` |
| `password-input.border-focus` | `{focus.ring}` | `#f5631a` |
| `password-input.fg` | `{text.primary}` | `#1a1a18` |
| `password-input.placeholder` | `{text.tertiary}` | `#737370` |
| `password-input.radius` | `{radius.md}` | `6px` |

**Do:** Offer a show/hide toggle; Pair with clear strength/criteria text; Never log or echo the value.
**Don't:** Disable paste; Show the secret by default.
