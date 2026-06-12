---
component: helper-text
ds_version: clementine-ds@HEAD (2026-06-11 verified)
status: AI-Ready
last_verified: 2026-06-11

category: Component
required_aria: ["id for aria-describedby"]

semantic_parts:
  root: the hint paragraph

token_contract:
  - helper-text.fg

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/HelperText.tsx
    underlying_library: custom (Mantine primitives + tokens)
    exports: [HelperText, HelperTextProps]
  storybook:
    path: apps/storybook/stories/HelperText.stories.tsx
  tokens:
    component: packages/tokens/src/components/helper-text.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: HELPERTEXT

> **Implementation:** [`packages/ui/src/components/HelperText.tsx`](../../packages/ui/src/components/HelperText.tsx).

Supporting hint text shown beneath a form control.

| Token | Resolves through | Light |
|---|---|---|
| `helper-text.fg` | `{text.secondary}` | `#6b6b66` |

**Do:** Keep it short and persistent; Wire id to the control’s aria-describedby.
**Don’t:** Use for validation errors; Repeat the label verbatim.
