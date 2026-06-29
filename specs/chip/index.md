---
component: chip
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role, aria-checked]

semantic_parts:
  root: the toggle
  label: chip text
  group: ChipGroup wrapper (single/multi)

token_contract:
  - chip.bg
  - chip.bg-checked
  - chip.fg
  - chip.fg-checked
  - chip.border
  - chip.border-checked
  - chip.radius

interaction_states: [unchecked, checked, hover, focus, disabled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Chip.tsx
    underlying_library: mantine
    exports: [Chip, ChipGroup, ChipProps]
  storybook:
    path: apps/storybook/stories/Chip.stories.tsx
  tokens:
    component: packages/tokens/src/components/chip.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: CHIP

> **Implementation:** [`packages/ui/src/components/Chip.tsx`](../../packages/ui/src/components/Chip.tsx) — wraps Mantine `Chip`.

A compact, toggleable selection — filter chips and multi-choice pickers. Distinct from Badge (read-only status).

| Token | Resolves through | Light |
|---|---|---|
| `chip.bg` | `{surface.subtle}` | `#f3f3f0` |
| `chip.bg-checked` | `{action.primary}` | `#2563eb` |
| `chip.fg` | `{text.primary}` | `#1a1a18` |
| `chip.fg-checked` | `{text.on-action}` | `#ffffff` |
| `chip.border` | `{border.default}` | `#e5e5e0` |
| `chip.border-checked` | `{action.primary}` | `#2563eb` |
| `chip.radius` | `{radius.xl}` | `99px` |

**Do:** Use ChipGroup for single/multi selection; Keep labels to 1-2 words; Show selected state with fill AND the checked affordance.
**Don't:** Use chips for status (that is Badge); Rely on color alone for selected; Overflow a row with 20 chips — group or filter.
