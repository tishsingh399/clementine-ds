# Database view (pattern: docs + database workspaces)

Story: **Worked examples/Database view** · [`DatabaseView.stories.tsx`](../../apps/storybook/stories/examples/DatabaseView.stories.tsx)

One set of rows shown as a table or a board, with a side peek for a row's properties.

| Region | Component | Why this one |
|---|---|---|
| View switch | `SegmentedControl` (Table / Board) | Same data, different view. Use `SavedViews` when views are named and stored. |
| Search | `SearchField` with `aria-label` | Filters rows. |
| Table view | `Table` with `Badge` (status), `Avatar` (owner), outline `Badge`s (tags), `Checkbox` | Property types map to existing components one-to-one. |
| Row title | `Button variant="subtle"` | Opening a row is an action, so it gets a button and keyboard focus. Not a clickable `TableTr`. |
| Board view | `KanbanBoard` > `KanbanColumn` > `Card` | The same rows grouped by status. |
| Row peek | `Drawer position="right"` + `DescriptionList` | Properties as term/detail, with editable ones as controls in `detail`. |
| Count | `Text size="xs" c="dimmed"` | Plain text. |

**Agent checklist**
- A read-only checkbox in a cell still needs `aria-label` naming its row.
- Don't make the whole `TableTr` clickable. Put the action on the title.
