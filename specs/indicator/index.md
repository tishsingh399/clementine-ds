---
component: indicator
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [aria-label]

semantic_parts:
  root: the wrapped element
  dot: the overlay dot/count

token_contract:
  - indicator.bg
  - indicator.fg

interaction_states: [dot, count, processing]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Indicator.tsx
    underlying_library: mantine
    exports: [Indicator, IndicatorProps]
  storybook:
    path: apps/storybook/stories/Indicator.stories.tsx
  tokens:
    component: packages/tokens/src/components/indicator.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: INDICATOR

> **Implementation:** [`packages/ui/src/components/Indicator.tsx`](../../packages/ui/src/components/Indicator.tsx) — wraps Mantine `Indicator`.

A small dot or count overlaid on another element (avatar, icon, tab) to flag new or pending items.

| Token | Resolves through | Light |
|---|---|---|
| `indicator.bg` | `{feedback.error}` | `#dc2626` |
| `indicator.fg` | `{text.on-action}` | `#ffffff` |

**Do:** Give counts an accessible label ("3 unread"); Cap large counts ("9+"); Keep the dot from covering meaningful content.
**Don't:** Encode meaning in the dot color alone; Use for long text (that is Badge).
