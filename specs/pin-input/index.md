---
component: pin-input
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [aria-label]

semantic_parts:
  root: the group
  cell: a single digit field

token_contract:
  - pin-input.bg
  - pin-input.border
  - pin-input.border-focus
  - pin-input.fg
  - pin-input.radius

interaction_states: [default, focus, filled, error]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/PinInput.tsx
    underlying_library: mantine
    exports: [PinInput, PinInputProps]
  storybook:
    path: apps/storybook/stories/PinInput.stories.tsx
  tokens:
    component: packages/tokens/src/components/pin-input.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [forms]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: PININPUT

> **Implementation:** [`packages/ui/src/components/PinInput.tsx`](../../packages/ui/src/components/PinInput.tsx) — wraps Mantine `PinInput`.

A segmented input for short codes — OTP / MFA / verification PINs.

| Token | Resolves through | Light |
|---|---|---|
| `pin-input.bg` | `{surface.elevated}` | `#ffffff` |
| `pin-input.border` | `{border.strong}` | `#737370` |
| `pin-input.border-focus` | `{focus.ring}` | `#f5631a` |
| `pin-input.fg` | `{text.primary}` | `#1a1a18` |
| `pin-input.radius` | `{radius.md}` | `6px` |

**Do:** Auto-advance between cells; allow paste of the full code; Set inputmode/type for numeric codes; Label the whole group.
**Don't:** Block paste; Use for long inputs.
