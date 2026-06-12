---
component: icon-button
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [aria-label]

semantic_parts:
  root: the button
  icon: the glyph

token_contract:
  - icon-button.fg
  - icon-button.bg-hover
  - icon-button.border-focus

interaction_states: [default, hover, focus, disabled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/IconButton.tsx
    underlying_library: mantine
    exports: [IconButton, IconButtonProps]
  storybook:
    path: apps/storybook/stories/IconButton.stories.tsx
  tokens:
    component: packages/tokens/src/components/icon-button.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: ICONBUTTON

> **Implementation:** [`packages/ui/src/components/IconButton.tsx`](../../packages/ui/src/components/IconButton.tsx).

An icon-only action for toolbars and row actions; always needs an aria-label and ideally a Tooltip.

| Token | Resolves through | Light |
|---|---|---|
| `icon-button.fg` | `{text.primary}` | `#1a1a18` |
| `icon-button.bg-hover` | `{surface.subtle}` | `#f3f3f0` |
| `icon-button.border-focus` | `{focus.ring}` | `#ff8040` |

**Do:** Always set aria-label; Pair with a Tooltip; Keep a 44x44 hit area.
**Don't:** Ship without an accessible name; Use an ambiguous icon alone.
