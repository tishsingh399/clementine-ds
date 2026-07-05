---
component: breadcrumbs
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [aria-label, aria-current]

semantic_parts:
  root: nav landmark
  item: a breadcrumb link
  current: the current page (aria-current)
  separator: visual divider

token_contract:
  - breadcrumbs.fg
  - breadcrumbs.fg-current
  - breadcrumbs.separator

interaction_states: [default, hover, current]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Breadcrumbs.tsx
    underlying_library: mantine
    exports: [Breadcrumbs, BreadcrumbsProps]
  storybook:
    path: apps/storybook/stories/Breadcrumbs.stories.tsx
  tokens:
    component: packages/tokens/src/components/breadcrumbs.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: BREADCRUMBS

> **Implementation:** [`packages/ui/src/components/Breadcrumbs.tsx`](../../packages/ui/src/components/Breadcrumbs.tsx) — wraps Mantine `Breadcrumbs`.

A hierarchical trail showing where the current page sits, with one-click jumps to ancestors.

| Token | Resolves through | Light |
|---|---|---|
| `breadcrumbs.fg` | `{text.secondary}` | `#6b6b66` |
| `breadcrumbs.fg-current` | `{text.primary}` | `#1a1a18` |
| `breadcrumbs.separator` | `{text.tertiary}` | `#737370` |

**Do:** Mark the last item as current (not a link); Keep labels short — match the page titles; Truncate the middle with an ellipsis on small screens.
**Don't:** Link the current page to itself; Use it as the only way back; Rely on the separator glyph alone for structure.
