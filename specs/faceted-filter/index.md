---
component: faceted-filter
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Enterprise
required_aria: []

semantic_parts:
  group: a facet group
  option: a checkable facet
  count: result count

token_contract:
  - faceted-filter.group-label
  - faceted-filter.fg
  - faceted-filter.count

interaction_states: [default, checked]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/FacetedFilter.tsx
    underlying_library: custom
    exports: [FacetedFilter, FacetedFilterProps, FacetGroup, FacetOption]
  storybook:
    path: apps/storybook/stories/FacetedFilter.stories.tsx
  tokens:
    component: packages/tokens/src/components/faceted-filter.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [data-table, faceted-search]
pages_used_in: [console, settings]
---

# AGENTIC DOCUMENTATION: FACETEDFILTER

> **Implementation:** [`packages/ui/src/components/FacetedFilter.tsx`](../../packages/ui/src/components/FacetedFilter.tsx).

Grouped, checkable facets with counts for narrowing a result set.

| Token | Resolves through | Light |
|---|---|---|
| `faceted-filter.group-label` | `{text.tertiary}` | `#a3a39e` |
| `faceted-filter.fg` | `{text.primary}` | `#1a1a18` |
| `faceted-filter.count` | `{text.tertiary}` | `#a3a39e` |

**Do:** Show result counts per facet; Persist selections; allow clearing; Group related facets.
**Don't:** Hide how many results a facet yields; Reset filters silently.
