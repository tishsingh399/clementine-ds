---
component: notification-center
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Enterprise
required_aria: []

semantic_parts:
  root: the panel
  item: a notification
  unread: unread marker

token_contract:
  - notification-center.bg
  - notification-center.unread-bg
  - notification-center.title
  - notification-center.body
  - notification-center.dot
  - notification-center.meta

interaction_states: [read, unread]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/NotificationCenter.tsx
    underlying_library: custom
    exports: [NotificationCenter, NotificationCenterProps, NotificationItem]
  storybook:
    path: apps/storybook/stories/NotificationCenter.stories.tsx
  tokens:
    component: packages/tokens/src/components/notification-center.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [data-table, faceted-search]
pages_used_in: [console, settings]
---

# AGENTIC DOCUMENTATION: NOTIFICATIONCENTER

> **Implementation:** [`packages/ui/src/components/NotificationCenter.tsx`](../../packages/ui/src/components/NotificationCenter.tsx).

A panel of system/activity notifications, unread first, each markable.

| Token | Resolves through | Light |
|---|---|---|
| `notification-center.bg` | `{surface.elevated}` | `#ffffff` |
| `notification-center.unread-bg` | `{surface.subtle}` | `#f3f3f0` |
| `notification-center.title` | `{text.primary}` | `#1a1a18` |
| `notification-center.body` | `{text.secondary}` | `#6b6b66` |
| `notification-center.dot` | `{action.primary}` | `#2563eb` |
| `notification-center.meta` | `{text.tertiary}` | `#a3a39e` |

**Do:** Show unread distinctly (dot + weight); Group/sort by recency; Let users mark read / clear.
**Don't:** Rely on color alone for unread; Lose notifications silently.
