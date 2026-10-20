---
component: timeline
ds_version: clementine-ds@0.1.0 (2026-10-17 verified)
status: AI-Ready
last_verified: 2026-10-17
verified_commit: 015819c0
verified_by: [contract, honesty, token-parity, runtime-tokens, painted-dom]
verified_gaps: 2

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
| `timeline.line` | `{border.default}` | `#d5d3d0` |
| `timeline.bullet` | `{surface.subtle}` | `#efeeec` |
| `timeline.bullet-active` | `{action.primary}` | `#305eb7` |
| `timeline.fg-title` | `{text.primary}` | `#2a2926` |
| `timeline.fg-body` | `{text.secondary}` | `#65635e` |

**Do:** Order newest- or oldest-first consistently; Mark completed vs upcoming with bullet AND label; Keep each item title scannable.
**Don't:** Mix orderings; Encode state by bullet color alone.
