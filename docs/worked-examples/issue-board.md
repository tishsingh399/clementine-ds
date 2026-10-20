# Issue board (pattern: issue tracker boards)

Story: **Worked examples/Issue board** · [`IssueBoard.stories.tsx`](../../apps/storybook/stories/examples/IssueBoard.stories.tsx)

A sprint board: work items as cards in status columns, a view switcher, saved filters and a ⌘K menu.

| Region | Component | Why this one |
|---|---|---|
| Breadcrumb + page title | `Breadcrumbs` + `Anchor`, `Title order={2}` | One `h2` per screen. Breadcrumbs carry the project path, not the title. |
| ⌘K hint | `Text` + `Kbd` | `Kbd` is the house look for keys. Don't style a `Badge` as a key. |
| Board / List toggle | `SegmentedControl` | Two or three mutually exclusive views. `Tabs` would imply separate content panels. |
| Primary action | `Button` | Only one filled button per header. |
| Saved filters | `SavedViews` | Named, persisted filters. Not `Tabs`, which switch content, and not `Chip`, which is a multi-select. |
| Board | `KanbanBoard` > `KanbanColumn` > `Card` | `nesting:` allows exactly this. Don't wrap cards in `Stack`. The column renders the list and the count. |
| WIP limit on "In progress" | `KanbanColumn limit={2}` | Over the limit, the count turns warning **and** says "over limit". |
| Column add button | `IconButton` in `actions` with `aria-label` | Icon-only buttons need a name. |
| Card body | `Text` (ID, title), `Badge` (label), `Avatar` (assignee) | Keep cards to these 3–4 things. Detail goes in a drawer or detail page. |
| Move a card | `Menu` on the card → "Move to <status>" | No drag-and-drop yet. The menu is keyboard-accessible today. |
| Command menu | `CommandPalette` with `items` built from state | Commands are data. The app binds ⌘K and owns `opened`. |

**Agent checklist**
- Pass `aria-label` to `KanbanBoard`: it's a required prop.
- Derive column contents from one `issues` array filtered by status. Don't keep one array per column.
- `shortcut` on a `CommandItem` is display-only. Bind the real key in the app.
