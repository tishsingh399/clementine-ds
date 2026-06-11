---
component: hover-card
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: []

semantic_parts:
  target: the hovered element
  dropdown: the floating card

token_contract:
  - hover-card.bg
  - hover-card.border
  - hover-card.shadow
  - hover-card.radius

interaction_states: [closed, open]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/HoverCard.tsx
    underlying_library: mantine
    exports: [HoverCard, HoverCardProps]
  storybook:
    path: apps/storybook/stories/HoverCard.stories.tsx
  tokens:
    component: packages/tokens/src/components/hover-card.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [data-display]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: HOVERCARD

> **Implementation:** [`packages/ui/src/components/HoverCard.tsx`](../../packages/ui/src/components/HoverCard.tsx) — wraps Mantine `HoverCard`.

Reveal supplementary, non-interactive detail on hover/focus — a richer Tooltip (avatar preview, definition, stats).

| Token | Resolves through | Light |
|---|---|---|
| `hover-card.bg` | `{surface.elevated}` | `#ffffff` |
| `hover-card.border` | `{border.default}` | `#e5e5e0` |
| `hover-card.shadow` | `{shadow.lg}` | `0 8px 24px rgba(0,0,0,0.16)` |
| `hover-card.radius` | `{radius.md}` | `6px` |

**Do:** Open on hover AND focus; small open delay; Keep content read-only and brief; Provide the same info elsewhere for touch/SR.
**Don't:** Put buttons/links inside (use Popover); Rely on it as the only path to the info.
