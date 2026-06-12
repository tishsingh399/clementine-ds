---
component: fab
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [aria-label]

semantic_parts:
  root: the floating button
  icon: the glyph

token_contract:
  - fab.bg
  - fab.fg
  - fab.shadow
  - fab.radius

interaction_states: [default, hover, focus]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Fab.tsx
    underlying_library: mantine
    exports: [Fab, FabProps]
  storybook:
    path: apps/storybook/stories/Fab.stories.tsx
  tokens:
    component: packages/tokens/src/components/fab.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: FAB

> **Implementation:** [`packages/ui/src/components/Fab.tsx`](../../packages/ui/src/components/Fab.tsx).

A floating action button for the single primary action on a surface (e.g. New).

| Token | Resolves through | Light |
|---|---|---|
| `fab.bg` | `{action.primary}` | `#2563eb` |
| `fab.fg` | `{text.on-action}` | `#ffffff` |
| `fab.shadow` | `{shadow.lg}` | `0 8px 24px rgba(0,0,0,0.16)` |
| `fab.radius` | `{radius.xl}` | `99px` |

**Do:** One FAB per screen; set aria-label; Keep it out of the way of content; Use a clear, single-purpose icon.
**Don't:** Stack multiple FABs; Use for secondary actions.
