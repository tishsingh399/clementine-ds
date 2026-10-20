# Doc page (pattern: team wiki pages)

Story: **Worked examples/Doc page** · [`DocPage.stories.tsx`](../../apps/storybook/stories/examples/DocPage.stories.tsx)

A runbook page with a page tree, byline, callout, steps, a table and comments.

| Region | Component | Why this one |
|---|---|---|
| Page tree | `Tree data={pages}` | Hierarchy with expand/collapse and keyboard support built in. It starts collapsed because `useTree` isn't exported yet (gap). |
| Path | `Breadcrumbs` | Space › parent › page. |
| Title | `Title order={1}` | A document page gets the `h1`. |
| Status lozenge | `Badge variant="light" color="green"` | Short status text. |
| Byline | `Avatar` + `Text c="dimmed"` | Owner, updated date and read time on one line. |
| Callout / info panel | `Alert intent="warning" title=…` | **Not** a `Card` with a coloured left border. `Alert` carries role and intent tokens. |
| Steps | `List type="ordered"` | Real `<ol>`. |
| Reference table | `Table` > `TableThead`/`TableTbody` > `TableTr` > `TableTh`/`TableTd` | The `nesting:` in specs/table forbids `TableTd` directly under `Table`. |
| Comments | `CommentThread` | Includes the reply box. |

**Agent checklist**
- Constrain reading width (`maxWidth: 760`) for long-form text.
- "On this page" navigation is an open gap. Don't hand-roll one from `Anchor`s in a `Stack` without a spec.
