---
component: presence-indicator
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Enterprise
required_aria: [aria-label]

semantic_parts:
  avatar: a member
  dot: presence dot

token_contract:
  - presence-indicator.online
  - presence-indicator.away
  - presence-indicator.busy
  - presence-indicator.offline
  - presence-indicator.ring

interaction_states: [online, away, busy, offline]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/PresenceIndicator.tsx
    underlying_library: custom
    exports: [PresenceIndicator, PresenceIndicatorProps, PresenceUser, Presence]
  storybook:
    path: apps/storybook/stories/PresenceIndicator.stories.tsx
  tokens:
    component: packages/tokens/src/components/presence-indicator.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [data-table, faceted-search]
pages_used_in: [console, settings]
---

# AGENTIC DOCUMENTATION: PRESENCEINDICATOR

> **Implementation:** [`packages/ui/src/components/PresenceIndicator.tsx`](../../packages/ui/src/components/PresenceIndicator.tsx).

Who is here, as a stack of avatars each with a presence dot.

| Token | Resolves through | Light |
|---|---|---|
| `presence-indicator.online` | `{feedback.success}` | `#16a34a` |
| `presence-indicator.away` | `{feedback.warning}` | `#f97316` |
| `presence-indicator.busy` | `{feedback.error}` | `#dc2626` |
| `presence-indicator.offline` | `{text.tertiary}` | `#a3a39e` |
| `presence-indicator.ring` | `{surface.default}` | `#fafaf8` |

**Do:** Pair dot with the person name (tooltip); Cap the stack with a +N.
**Don't:** Convey presence by color alone; Show stale presence as live.
