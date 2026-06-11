---
component: popover
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [aria-haspopup, aria-expanded, role]

semantic_parts:
  target: the trigger
  dropdown: the floating panel
  root: the controller

token_contract:
  - popover.bg
  - popover.border
  - popover.shadow
  - popover.radius

interaction_states: [closed, open]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Popover.tsx
    underlying_library: mantine
    exports: [Popover, PopoverTarget, PopoverDropdown, PopoverProps]
  storybook:
    path: apps/storybook/stories/Popover.stories.tsx
  tokens:
    component: packages/tokens/src/components/popover.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: POPOVER

> **Implementation:** [`packages/ui/src/components/Popover.tsx`](../../packages/ui/src/components/Popover.tsx) — wraps Mantine `Popover`.

A floating panel anchored to a trigger, for rich content a Tooltip cannot hold (mini-forms, details, pickers).

| Token | Resolves through | Light |
|---|---|---|
| `popover.bg` | `{surface.elevated}` | `#ffffff` |
| `popover.border` | `{border.default}` | `#e5e5e0` |
| `popover.shadow` | `{shadow.lg}` | `0 8px 24px rgba(0,0,0,0.16)` |
| `popover.radius` | `{radius.md}` | `6px` |

**Do:** Move focus into the dropdown; close on Escape + outside click; Anchor near the trigger; flip when space is tight; Keep content scoped — escalate big content to a Modal/Drawer.
**Don't:** Put critical-only info inside (it is dismissible); Nest popovers; Trap the user with no close path.
