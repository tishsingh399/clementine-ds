---
component: color-input
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [aria-label]

semantic_parts:
  root: the input
  swatch: preview swatch
  field: hex field

token_contract:
  - color-input.bg
  - color-input.border
  - color-input.border-focus
  - color-input.fg
  - color-input.radius

interaction_states: [default, focus, disabled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ColorInput.tsx
    underlying_library: mantine
    exports: [ColorInput, ColorInputProps]
  storybook:
    path: apps/storybook/stories/ColorInput.stories.tsx
  tokens:
    component: packages/tokens/src/components/color-input.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: COLORINPUT

> **Implementation:** [`packages/ui/src/components/ColorInput.tsx`](../../packages/ui/src/components/ColorInput.tsx).

Pick a color via a swatch preview plus an editable hex field.

| Token | Resolves through | Light |
|---|---|---|
| `color-input.bg` | `{surface.elevated}` | `#ffffff` |
| `color-input.border` | `{border.strong}` | `#d4d4cf` |
| `color-input.border-focus` | `{focus.ring}` | `#ff8040` |
| `color-input.fg` | `{text.primary}` | `#1a1a18` |
| `color-input.radius` | `{radius.md}` | `6px` |

**Do:** Show the hex value as text; Offer a defined swatch palette; Validate hex input.
**Don't:** Rely on the swatch alone; Use color as the sole carrier of meaning.
