---
component: session-list
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: [aria-current]
model_baseline: claude-opus-4-8

semantic_parts:
  item: a session row
  title: conversation title
  meta: timestamp

token_contract:
  - session-list.item-bg-hover
  - session-list.fg
  - session-list.meta

interaction_states: [default, hover, active]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/SessionList.tsx
    underlying_library: custom
    exports: [SessionList, SessionListProps, SessionItem]
  storybook:
    path: apps/storybook/stories/ai/SessionList.stories.tsx
  tokens:
    component: packages/tokens/src/components/session-list.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: SESSIONLIST

> **Implementation:** [`packages/ui/src/components/ai/SessionList.tsx`](../../../packages/ui/src/components/ai/SessionList.tsx).

Past conversations — searchable and resumable, with the active one marked.

| Token | Resolves through | Light |
|---|---|---|
| `session-list.item-bg-hover` | `{surface.subtle}` | `#f3f3f0` |
| `session-list.fg` | `{text.primary}` | `#1a1a18` |
| `session-list.meta` | `{text.tertiary}` | `#a3a39e` |

**Do:** Mark the active session (aria-current); Truncate long titles; show recency; Make rows keyboard-activatable.
**Don't:** Lose the active indicator; Hide timestamps for long histories.
