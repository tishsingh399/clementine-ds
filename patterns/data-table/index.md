# Pattern · Data table

> Tray 3 · composes Table primitives + `Checkbox`, `Badge`, `Menu`, `Pagination`, `Skeleton`, `Alert`.

## Intent
Display many rows of structured records with sort, selection, row actions, and paging — the workhorse of an enterprise console.

## Anatomy
| Region | Built from |
|---|---|
| Column headers (sortable) | header cell + sort affordance, `aria-sort` |
| Row selection | `Checkbox` in a leading column + a "select all" header checkbox |
| Cell content | `Text`, `Badge` (status/risk), `Avatar` |
| Row actions | `Menu` ("⋯") per row |
| Loading | `Skeleton` rows matching column widths |
| Empty | [empty-state pattern](../empty-state/index.md) |
| Error | `Alert intent="error"` above the table |
| Paging | `Pagination` + a results count |

## Rules
1. One sort column at a time; reflect it with `aria-sort` AND a visible caret.
2. Selection is keyboard-reachable; "select all" selects the **filtered** set, and says so.
3. Destructive bulk actions route through a confirm ([confirm-dialog](../confirm-dialog/index.md)).
4. Never block the whole table on one slow cell — skeleton the rows, stream them in.
5. Keep row height stable between skeleton and loaded to avoid layout shift.
