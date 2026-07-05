---
component: status-dot
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: []

semantic_parts:
  dot: the colored dot
  label: the text status

token_contract:
  - status-dot.online
  - status-dot.offline
  - status-dot.busy
  - status-dot.away
  - status-dot.label

interaction_states: [online, offline, busy, away, neutral]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/StatusDot.tsx
    underlying_library: custom (Mantine primitives + tokens)
    exports: [StatusDot, StatusDotProps, StatusKind]
  storybook:
    path: apps/storybook/stories/StatusDot.stories.tsx
  tokens:
    component: packages/tokens/src/components/status-dot.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: STATUSDOT

> **Implementation:** [`packages/ui/src/components/StatusDot.tsx`](../../packages/ui/src/components/StatusDot.tsx).

A small colored dot plus a text label for presence or health state.

| Token | Resolves through | Light |
|---|---|---|
| `status-dot.online` | `{feedback.success}` | `#16a34a` |
| `status-dot.offline` | `{text.tertiary}` | `#737370` |
| `status-dot.busy` | `{feedback.error}` | `#dc2626` |
| `status-dot.away` | `{feedback.warning}` | `#ea580c` |
| `status-dot.label` | `{text.primary}` | `#1a1a18` |

**Do:** Always pair the dot with a text label; Keep the color set consistent across the app.
**Don't:** Use the dot color as the only signal (WCAG 1.4.1); Invent new status colors.
