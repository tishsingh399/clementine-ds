---
component: split-button
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [aria-haspopup, aria-expanded]

semantic_parts:
  primary: main action button
  trigger: dropdown toggle
  menu: secondary actions

token_contract:
  - split-button.bg
  - split-button.fg
  - split-button.divider
  - split-button.radius

interaction_states: [default, open]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/SplitButton.tsx
    underlying_library: custom (Mantine primitives + tokens)
    exports: [SplitButton, SplitButtonProps]
  storybook:
    path: apps/storybook/stories/SplitButton.stories.tsx
  tokens:
    component: packages/tokens/src/components/split-button.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: SPLITBUTTON

> **Implementation:** [`packages/ui/src/components/SplitButton.tsx`](../../packages/ui/src/components/SplitButton.tsx).

A primary action joined to a dropdown of related actions (Save / Save as…).

| Token | Resolves through | Light |
|---|---|---|
| `split-button.bg` | `{action.primary}` | `#2563eb` |
| `split-button.fg` | `{text.on-action}` | `#ffffff` |
| `split-button.divider` | `{border.default}` | `#e5e5e0` |
| `split-button.radius` | `{radius.md}` | `6px` |

**Do:** Make the primary action the most common one; Label the dropdown trigger.
**Don't:** Hide the primary action behind the menu; Put unrelated items in the menu.
