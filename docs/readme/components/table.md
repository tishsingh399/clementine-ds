# Table

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/table/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Table.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Table.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/table.json)

## Overview

Display structured records in rows and columns; the workhorse of an enterprise console.

Status: `AI-Ready`. Token contract closed at 7 component-tier tokens.

## When to use

- Many records with shared columns
- Sortable / selectable data sets
- Audit logs, user lists

## When not to use

- Key-value detail (use a description list)
- Layout (use a grid/flex)
- A handful of items (use a list)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the table |
| `header` | column headers (th, scope=col) |
| `row` | a data row |
| `cell` | a data cell |

## Usage guidelines

### Do
- Use th with scope for headers; caption the table
- Right-align numerals; keep row height stable
- Pair with Pagination + a results count

### Don't
- Use tables for page layout
- Pack 12 columns into a phone width
- Lose the header on scroll for long tables

## Accessibility

| Concern | Requirement |
|---|---|
| Semantics | Native table with th[scope] + caption |
| Sort | aria-sort on the active column header |
| Keyboard | Interactive cells are individually focusable |

## Token contract

7 component-tier tokens, defined in `packages/tokens/src/components/table.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `table.header-bg` | `{surface.subtle}` | `#f3f3f0` |
| `table.header-fg` | `{text.secondary}` | `#6b6b66` |
| `table.row-bg` | `{surface.elevated}` | `#ffffff` |
| `table.row-bg-striped` | `{surface.default}` | `#fafaf8` |
| `table.row-bg-hover` | `{surface.subtle}` | `#f3f3f0` |
| `table.border` | `{border.default}` | `#e5e5e0` |
| `table.fg` | `{text.primary}` | `#1a1a18` |

## Library notes

React: wrapper over Mantine `Table`.

```tsx
import { Table } from '@clementine-ds/ui';

<Table><TableThead><TableTr><TableTh>User</TableTh></TableTr></TableThead><TableTbody>…</TableTbody></Table>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
