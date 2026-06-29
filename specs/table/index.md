---
component: table
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role, scope]

semantic_parts:
  root: the table
  header: column headers (th, scope=col)
  row: a data row
  cell: a data cell

token_contract:
  - table.header-bg
  - table.header-fg
  - table.row-bg
  - table.row-bg-striped
  - table.row-bg-hover
  - table.border
  - table.fg

interaction_states: [default, hover, striped]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Table.tsx
    underlying_library: mantine
    exports: [Table, TableProps]
  storybook:
    path: apps/storybook/stories/Table.stories.tsx
  tokens:
    component: packages/tokens/src/components/table.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [data-display]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: TABLE

> **Implementation:** [`packages/ui/src/components/Table.tsx`](../../packages/ui/src/components/Table.tsx) — wraps Mantine `Table`.

Display structured records in rows and columns; the workhorse of an enterprise console.

| Token | Resolves through | Light |
|---|---|---|
| `table.header-bg` | `{surface.subtle}` | `#f3f3f0` |
| `table.header-fg` | `{text.secondary}` | `#6b6b66` |
| `table.row-bg` | `{surface.elevated}` | `#ffffff` |
| `table.row-bg-striped` | `{surface.default}` | `#fafaf8` |
| `table.row-bg-hover` | `{surface.subtle}` | `#f3f3f0` |
| `table.border` | `{border.default}` | `#e5e5e0` |
| `table.fg` | `{text.primary}` | `#1a1a18` |

**Do:** Use th with scope for headers; caption the table; Right-align numerals; keep row height stable; Pair with Pagination + a results count.
**Don't:** Use tables for page layout; Pack 12 columns into a phone width; Lose the header on scroll for long tables.
