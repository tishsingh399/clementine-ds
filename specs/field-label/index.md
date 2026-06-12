---
component: field-label
ds_version: clementine-ds@HEAD (2026-06-11 verified)
status: AI-Ready
last_verified: 2026-06-11

category: Component
required_aria: ["htmlFor association", "visually-hidden (required) text"]

semantic_parts:
  root: the label element
  required: the required asterisk (with SR text)
  optional: the muted optional marker

token_contract:
  - field-label.fg
  - field-label.required
  - field-label.optional

interaction_states: [default, required, optional]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/FieldLabel.tsx
    underlying_library: custom (Mantine primitives + tokens)
    exports: [FieldLabel, FieldLabelProps]
  storybook:
    path: apps/storybook/stories/FieldLabel.stories.tsx
  tokens:
    component: packages/tokens/src/components/field-label.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: FIELDLABEL

> **Implementation:** [`packages/ui/src/components/FieldLabel.tsx`](../../packages/ui/src/components/FieldLabel.tsx).

A form field label with optional required or optional markers.

| Token | Resolves through | Light |
|---|---|---|
| `field-label.fg` | `{text.primary}` | `#1a1a18` |
| `field-label.required` | `{feedback.error}` | `#dc2626` |
| `field-label.optional` | `{text.secondary}` | `#6b6b66` |

**Do:** Associate via htmlFor and the control id; Mark required with the asterisk AND screen-reader text.
**Don’t:** Use color (red asterisk) as the only required cue; Hide labels for sighted users.
