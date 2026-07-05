---
component: multi-select
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role, aria-expanded, aria-multiselectable]

semantic_parts:
  root: the input
  pill: a selected value chip
  popover: the option list
  option: a selectable option

token_contract:
  - multi-select.bg
  - multi-select.border
  - multi-select.border-focus
  - multi-select.fg
  - multi-select.placeholder
  - multi-select.pill-bg
  - multi-select.pill-fg
  - multi-select.option-bg-hover
  - multi-select.radius

interaction_states: [default, focus, open, disabled, error]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/MultiSelect.tsx
    underlying_library: mantine
    exports: [MultiSelect, MultiSelectProps]
  storybook:
    path: apps/storybook/stories/MultiSelect.stories.tsx
  tokens:
    component: packages/tokens/src/components/multi-select.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [forms]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: MULTISELECT

> **Implementation:** [`packages/ui/src/components/MultiSelect.tsx`](../../packages/ui/src/components/MultiSelect.tsx) — wraps Mantine `MultiSelect`.

Pick several values from a list; selections show as removable pills.

| Token | Resolves through | Light |
|---|---|---|
| `multi-select.bg` | `{surface.elevated}` | `#ffffff` |
| `multi-select.border` | `{border.strong}` | `#737370` |
| `multi-select.border-focus` | `{focus.ring}` | `#f5631a` |
| `multi-select.fg` | `{text.primary}` | `#1a1a18` |
| `multi-select.placeholder` | `{text.tertiary}` | `#737370` |
| `multi-select.pill-bg` | `{surface.subtle}` | `#f3f3f0` |
| `multi-select.pill-fg` | `{text.primary}` | `#1a1a18` |
| `multi-select.option-bg-hover` | `{surface.subtle}` | `#f3f3f0` |
| `multi-select.radius` | `{radius.md}` | `6px` |

**Do:** Make pills removable; support search for long lists; Show a clear empty/no-results state; Cap or scroll very long lists.
**Don't:** Use for single selection; Hide selected count behind color.
