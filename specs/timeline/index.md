---
component: timeline
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role]

semantic_parts:
  root: the rail
  item: a timeline event
  bullet: the node marker
  line: the connector

token_contract:
  - timeline.line
  - timeline.bullet
  - timeline.bullet-active
  - timeline.fg-title
  - timeline.fg-body

interaction_states: [pending, active, complete]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Timeline.tsx
    underlying_library: mantine
    exports: [Timeline, TimelineProps]
  storybook:
    path: apps/storybook/stories/Timeline.stories.tsx
  tokens:
    component: packages/tokens/src/components/timeline.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [data-display]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: TIMELINE

> **Implementation:** [`packages/ui/src/components/Timeline.tsx`](../../packages/ui/src/components/Timeline.tsx) — wraps Mantine `Timeline`.

Show a sequence of events over time — an access request lifecycle, an activity log, a process trail.

| Token | Resolves through | Light |
|---|---|---|
| `timeline.line` | `{border.default}` | `#e5e5e0` |
| `timeline.bullet` | `{surface.subtle}` | `#f3f3f0` |
| `timeline.bullet-active` | `{action.primary}` | `#2563eb` |
| `timeline.fg-title` | `{text.primary}` | `#1a1a18` |
| `timeline.fg-body` | `{text.secondary}` | `#6b6b66` |

**Do:** Order newest- or oldest-first consistently; Mark completed vs upcoming with bullet AND label; Keep each item title scannable.
**Don't:** Mix orderings; Encode state by bullet color alone.
