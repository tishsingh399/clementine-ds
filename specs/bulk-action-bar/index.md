---
component: bulk-action-bar
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Enterprise
required_aria: [role, aria-label]

semantic_parts:
  root: the bar
  count: selection count
  actions: bulk actions

token_contract:
  - bulk-action-bar.bg
  - bulk-action-bar.border
  - bulk-action-bar.fg

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/BulkActionBar.tsx
    underlying_library: custom
    exports: [BulkActionBar, BulkActionBarProps]
  storybook:
    path: apps/storybook/stories/BulkActionBar.stories.tsx
  tokens:
    component: packages/tokens/src/components/bulk-action-bar.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [data-table, faceted-search]
pages_used_in: [console, settings]
---

# AGENTIC DOCUMENTATION: BULKACTIONBAR

> **Implementation:** [`packages/ui/src/components/BulkActionBar.tsx`](../../packages/ui/src/components/BulkActionBar.tsx).

Appears when table rows are selected: shows the count and the bulk actions available.

| Token | Resolves through | Light |
|---|---|---|
| `bulk-action-bar.bg` | `{surface.subtle}` | `#f3f3f0` |
| `bulk-action-bar.border` | `{border.default}` | `#e5e5e0` |
| `bulk-action-bar.fg` | `{text.primary}` | `#1a1a18` |

**Do:** Show the count; offer Clear; Gate destructive bulk actions behind a confirm; Pair with undo.
**Don't:** Hide what is selected; Run destructive bulk actions with no confirm.
