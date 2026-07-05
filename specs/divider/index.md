---
component: divider
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role, aria-orientation]

semantic_parts:
  line: the rule
  label: optional inline label

token_contract:
  - divider.line
  - divider.label

interaction_states: [default, labelled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Divider.tsx
    underlying_library: mantine
    exports: [Divider, DividerProps]
  storybook:
    path: apps/storybook/stories/Divider.stories.tsx
  tokens:
    component: packages/tokens/src/components/divider.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: DIVIDER

> **Implementation:** [`packages/ui/src/components/Divider.tsx`](../../packages/ui/src/components/Divider.tsx) — wraps Mantine `Divider`.

A thin rule that separates content groups, optionally with a centered or aligned label.

| Token | Resolves through | Light |
|---|---|---|
| `divider.line` | `{border.default}` | `#e5e5e0` |
| `divider.label` | `{text.tertiary}` | `#737370` |

**Do:** Use spacing first; reach for a line only when grouping is ambiguous; Label it when the split has meaning ("or").
**Don't:** Stack multiple dividers; Use as a decorative flourish.
