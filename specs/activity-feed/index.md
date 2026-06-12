---
component: activity-feed
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Enterprise
required_aria: []

semantic_parts:
  item: an activity
  actor: who
  action: what
  meta: when

token_contract:
  - activity-feed.actor
  - activity-feed.action
  - activity-feed.meta

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ActivityFeed.tsx
    underlying_library: custom
    exports: [ActivityFeed, ActivityFeedProps, ActivityItem]
  storybook:
    path: apps/storybook/stories/ActivityFeed.stories.tsx
  tokens:
    component: packages/tokens/src/components/activity-feed.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [data-table, faceted-search]
pages_used_in: [console, settings]
---

# AGENTIC DOCUMENTATION: ACTIVITYFEED

> **Implementation:** [`packages/ui/src/components/ActivityFeed.tsx`](../../packages/ui/src/components/ActivityFeed.tsx).

A chronological stream of who-did-what-when (audit-adjacent, human-readable).

| Token | Resolves through | Light |
|---|---|---|
| `activity-feed.actor` | `{text.primary}` | `#1a1a18` |
| `activity-feed.action` | `{text.primary}` | `#1a1a18` |
| `activity-feed.meta` | `{text.tertiary}` | `#a3a39e` |

**Do:** Attribute each item to an actor + time; Order consistently (newest first).
**Don't:** Drop attribution; Mix orderings.
