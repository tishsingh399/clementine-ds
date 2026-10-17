# Work item detail (pattern: issue tracker work item view)

Story: **Worked examples/Work item detail** · [`WorkItemDetail.stories.tsx`](../../apps/storybook/stories/examples/WorkItemDetail.stories.tsx)

Two columns: the work item's content and discussion on the left, its fields on the right.

| Region | Component | Why this one |
|---|---|---|
| Layout | `Flex` (content `flex: 1`, fields fixed `w={320}`) | Clementine has no app-shell or split-pane component yet (see the gap list). `Flex` is the honest primitive. |
| Path | `Breadcrumbs` | Project › sprint › key. |
| Title + description | `Title order={2}`, `Text` | Read-only here. A rich-text editor is out of scope. |
| Secondary actions | `Button variant="default" size="xs"` | They sit below the title and don't compete with a primary action. |
| Comments / History | `Tabs` + `CommentThread` / `ActivityFeed` | Two separate content panels, which is what `Tabs` is for. |
| **Fields panel** | `DescriptionList` with controls in `detail` | **Not a new component.** `detail` takes any node, so use `Select`, `DateInput` and `Avatar` + `Select` there. This is the most common place agents invent a "PropertyPanel". |
| Status / priority / assignee | `Select` with `aria-label` | The visible term isn't a `<label>`, so every control needs its own name. |
| Labels | `Badge` group | Read-only chips. Use `TagsInput` if they're editable. |
| Due date | `DateInput` | Not `TextInput type="date"`. |

**Agent checklist**
- Each inline control gets `aria-label` matching its term.
- Don't put the field panel in a `Card` inside a `Card`. One surface is enough.
