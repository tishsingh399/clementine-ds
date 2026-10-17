---
component: kanban-board
ds_version: clementine-ds@0.1.0 (2026-10-17 verified)
status: AI-Ready
last_verified: 2026-10-17
verified_by: [contract, slots, freshness, token-lint, storybook-browser]

category: Component
required_aria: [role=group, aria-label, aria-labelledby]

semantic_parts:
  root:    the board (horizontal scroller, role=group, named by aria-label)
  column:  one stage — a section labelled by its header
  header:  column title, optional icon, count and actions
  count:   item count, or "n / limit" with WIP limit
  card:    one work item inside a column
  actions: header buttons (add, column menu)
  empty:   message when a column has no cards

slots:
  column:  [KanbanColumn]
  card:    [Card]
  actions: [IconButton, Menu]

nesting:
  KanbanBoard:  [KanbanColumn]
  KanbanColumn: [Card]

token_contract:
  - kanban-board.column-bg
  - kanban-board.column-border
  - kanban-board.header-fg
  - kanban-board.count
  - kanban-board.over-limit
  - kanban-board.empty

interaction_states: [default, empty, over-limit]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/KanbanBoard.tsx
    underlying_library: custom (Mantine primitives + tokens)
    exports: [KanbanBoard, KanbanColumn, KanbanBoardProps, KanbanColumnProps]
  storybook:
    path: apps/storybook/stories/KanbanBoard.stories.tsx
  tokens:
    component: packages/tokens/src/components/kanban-board.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [work-tracking]
pages_used_in: [issue-board]
---

# AGENTIC DOCUMENTATION: KANBANBOARD

> **Implementation:** [`packages/ui/src/components/KanbanBoard.tsx`](../../packages/ui/src/components/KanbanBoard.tsx). Worked example: [`docs/worked-examples/issue-board.md`](../../docs/worked-examples/issue-board.md).

Columns of cards for work moving through stages: sprint boards, triage queues, review pipelines.

## Compose
```tsx
<KanbanBoard aria-label="Sprint 14">
  <KanbanColumn title="In progress" limit=3 actions={<IconButton aria-label="Add item" … />}>
    <Card padding="sm">…</Card>
  </KanbanColumn>
</KanbanBoard>
```
- `KanbanBoard` takes only `KanbanColumn`. `KanbanColumn` takes only `Card` (see `nesting`). Don't wrap cards in `div`s or `Stack`s. The column already renders the list.
- Pass `limit` for a WIP limit. Over the limit, the count shows "n / limit · over limit" in `kanban-board.over-limit`: text **and** colour.
- An empty column shows `emptyLabel`. Don't render a placeholder card.

## Moving cards
There's no drag-and-drop yet (shortcut in code). Put a `Menu` on each `Card` with "Move to → <column>". It's keyboard-accessible and it's how an agent should wire moves today.

## Accessibility
Each column is a `section` labelled by its title, and its cards are a `ul`. A screen reader announces "In progress, list, 3 items". The board scrolls sideways and needs no extra roles.

| Token | Resolves through | Light |
|---|---|---|
| `kanban-board.column-bg` | `{surface.subtle}` | `#f3f3f0` |
| `kanban-board.column-border` | `{border.default}` | `#e5e5e0` |
| `kanban-board.header-fg` | `{text.primary}` | `#1a1a18` |
| `kanban-board.count` | `{text.secondary}` | `#6b6b66` |
| `kanban-board.over-limit` | `{text.warning}` | `#c2410c` |
| `kanban-board.empty` | `{text.secondary}` | `#6b6b66` |

**Do:** Keep card content to ID, title, 1–2 badges and an avatar; put full detail in a `Drawer`.
**Don't:** Use a board for more than ~7 columns (use a `Table` grouped by status); show a WIP limit in colour alone.
