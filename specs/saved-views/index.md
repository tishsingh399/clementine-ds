---
component: saved-views
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Enterprise
required_aria: [aria-current]

semantic_parts:
  view: a saved view
  active: the current view
  save: save-view action

token_contract:
  - saved-views.active-fg
  - saved-views.fg

interaction_states: [default, active]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/SavedViews.tsx
    underlying_library: custom
    exports: [SavedViews, SavedViewsProps, SavedView]
  storybook:
    path: apps/storybook/stories/SavedViews.stories.tsx
  tokens:
    component: packages/tokens/src/components/saved-views.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [data-table, faceted-search]
pages_used_in: [console, settings]
---

# AGENTIC DOCUMENTATION: SAVEDVIEWS

> **Implementation:** [`packages/ui/src/components/SavedViews.tsx`](../../packages/ui/src/components/SavedViews.tsx).

Switch between saved filter/column configurations, and save the current one.

| Token | Resolves through | Light |
|---|---|---|
| `saved-views.active-fg` | `{action.primary}` | `#2563eb` |
| `saved-views.fg` | `{text.secondary}` | `#6b6b66` |

**Do:** Mark the active view (aria-current); Let users save the current config.
**Don't:** Lose the active indicator; Overwrite a shared view without confirm.
