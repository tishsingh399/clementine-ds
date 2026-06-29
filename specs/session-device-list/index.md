---
component: session-device-list
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Enterprise
required_aria: []

semantic_parts:
  item: a session/device
  current: the current device badge
  revoke: revoke action

token_contract:
  - session-device-list.bg
  - session-device-list.border
  - session-device-list.fg
  - session-device-list.meta
  - session-device-list.revoke

interaction_states: [default, current]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/SessionDeviceList.tsx
    underlying_library: custom
    exports: [SessionDeviceList, SessionDeviceListProps, DeviceSession]
  storybook:
    path: apps/storybook/stories/SessionDeviceList.stories.tsx
  tokens:
    component: packages/tokens/src/components/session-device-list.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [data-table, faceted-search]
pages_used_in: [console, settings]
---

# AGENTIC DOCUMENTATION: SESSIONDEVICELIST

> **Implementation:** [`packages/ui/src/components/SessionDeviceList.tsx`](../../packages/ui/src/components/SessionDeviceList.tsx).

Active sessions/devices for a principal, each revocable — a privileged-access staple.

| Token | Resolves through | Light |
|---|---|---|
| `session-device-list.bg` | `{surface.elevated}` | `#ffffff` |
| `session-device-list.border` | `{border.default}` | `#e5e5e0` |
| `session-device-list.fg` | `{text.primary}` | `#1a1a18` |
| `session-device-list.meta` | `{text.tertiary}` | `#a3a39e` |
| `session-device-list.revoke` | `{feedback.error}` | `#dc2626` |

**Do:** Mark the current device; protect it from revoke; Show location + last-active; Confirm revoke.
**Don't:** Let users revoke their current session by accident; Hide where/when a session was active.
