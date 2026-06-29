---
component: pagination
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [aria-label, aria-current]

semantic_parts:
  root:    The navigation landmark
  item:    A page button
  active:  The current page (aria-current)
  ellipsis: Truncation gap
  control: Previous / next buttons

token_contract:
  - pagination.item.fg
  - pagination.item.bg-active
  - pagination.item.fg-active
  - pagination.item.bg-hover
  - pagination.border
  - pagination.border-focus
  - pagination.radius

interaction_states: [default, hover, active, focus, disabled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Pagination.tsx
    underlying_library: mantine
    exports: [Pagination, PaginationProps]
  storybook:
    path: apps/storybook/stories/Pagination.stories.tsx
  tokens:
    primitives: packages/tokens/src/primitives.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json
    component: packages/tokens/src/components/pagination.json

patterns_used_in: [data-table, search-results, list-view]
pages_used_in: [list-view, audit-log]
---

# AGENTIC DOCUMENTATION: PAGINATION

> **Implementation:** [`packages/ui/src/components/Pagination.tsx`](../../packages/ui/src/components/Pagination.tsx) — wraps Mantine `Pagination`.

## 1. Purpose & Intent

Page navigation for long, chunked result sets. Pair with a results count ("Showing 1–20 of 240") so users know where they are.

**Pagination must:** render a `navigation` landmark with an `aria-label` · mark the current page with `aria-current="page"` · label each control for AT ("Go to page 3", "Next page") · keep a ≥ 24px hit area.

## 2. Token bindings

| Part | State | Token | Resolves (light) |
|---|---|---|---|
| page | default | `pagination.item.fg` → `{text.primary}` | `#1a1a18` |
| page | active fill | `pagination.item.bg-active` → `{action.primary}` | `#2563eb` |
| page | active text | `pagination.item.fg-active` → `{text.on-action}` | `#ffffff` |
| page | hover | `pagination.item.bg-hover` → `{surface.subtle}` | `#f3f3f0` |
| item | border | `pagination.border` → `{border.default}` | `#e5e5e0` |
| item | focus | `pagination.border-focus` → `{focus.ring}` | `#ff8040` |
| corners | — | `pagination.radius` → `{radius.md}` | `6px` |

## 3. States
`default` · `hover` · `active` (current page) · `focus` (ring) · `disabled` (prev on first page, next on last).

## 4. Do / Don't
**Do** show first/last edges for large sets; keep the active page obvious by fill + `aria-current`. **Don't** rely on color alone for the active page, and don't paginate fewer than ~2 pages of results.
