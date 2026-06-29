---
component: notification
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role, aria-live]

semantic_parts:
  root: the card
  accent: left status stripe
  title: headline
  body: message
  close: dismiss button

token_contract:
  - notification.bg
  - notification.border
  - notification.fg-title
  - notification.fg-body
  - notification.accent
  - notification.radius

interaction_states: [info, success, error, loading]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Notification.tsx
    underlying_library: mantine
    exports: [Notification, NotificationProps]
  storybook:
    path: apps/storybook/stories/Notification.stories.tsx
  tokens:
    component: packages/tokens/src/components/notification.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [data-display]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: NOTIFICATION

> **Implementation:** [`packages/ui/src/components/Notification.tsx`](../../packages/ui/src/components/Notification.tsx) — wraps Mantine `Notification`.

A self-contained status card for transient feedback — the visual a toast system renders. Distinct from Alert (inline, persistent).

| Token | Resolves through | Light |
|---|---|---|
| `notification.bg` | `{surface.elevated}` | `#ffffff` |
| `notification.border` | `{border.default}` | `#e5e5e0` |
| `notification.fg-title` | `{text.primary}` | `#1a1a18` |
| `notification.fg-body` | `{text.secondary}` | `#6b6b66` |
| `notification.accent` | `{action.primary}` | `#2563eb` |
| `notification.radius` | `{radius.md}` | `6px` |

**Do:** Announce via aria-live (polite for info, assertive for errors); Auto-dismiss info; let errors persist; Pair color with an icon + text.
**Don't:** Stack a wall of notifications; Auto-dismiss errors the user must act on; Carry critical-only info in a toast.
