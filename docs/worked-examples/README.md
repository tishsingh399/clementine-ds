# Worked examples: building real app screens with Clementine

Seven kinds of app that agents are often asked to build, studied through public pages of widely used products in each category. Each one maps to a screen rebuilt with `@clementine-ds/ui` only. Every screen is a live Storybook story under **Worked examples/**, and each doc below explains which component goes in each region and why.

We copied structure and behaviour only. No branding, logos, copy or assets. Sample data is invented.

| Pattern source | Screen | Doc | Story |
|---|---|---|---|
| Issue tracker | Issue board | [issue-board.md](./issue-board.md) | `apps/storybook/stories/examples/IssueBoard.stories.tsx` |
| Issue tracker (work item view) | Work item detail | [work-item-detail.md](./work-item-detail.md) | `…/examples/WorkItemDetail.stories.tsx` |
| Observability dashboard | Metrics dashboard | [metrics-dashboard.md](./metrics-dashboard.md) | `…/examples/MetricsDashboard.stories.tsx` |
| LLM tracing tool | Trace explorer | [trace-explorer.md](./trace-explorer.md) | `…/examples/TraceExplorer.stories.tsx` |
| AI chat assistant | Agent chat | [agent-chat.md](./agent-chat.md) | `…/examples/AgentChat.stories.tsx` |
| Team wiki | Doc page | [doc-page.md](./doc-page.md) | `…/examples/DocPage.stories.tsx` |
| Docs + database workspace | Database view | [database-view.md](./database-view.md) | `…/examples/DatabaseView.stories.tsx` |

**What agents got wrong** while building these, as candidate spec rules: [agent-mistakes.md](./agent-mistakes.md).

## How we studied them

We read public pages only: live demo instances, product homepages, public docs and their screenshots, and published workspace pages. Products that need a sign-in were mapped from their public structure and from Clementine's existing AI specs. We don't name the products. The docs describe patterns, not anyone's app.

## Components added from these studies

| Component | Covers | Spec |
|---|---|---|
| `CommandPalette` | ⌘K launcher, in all seven app types | [specs/command-palette](../../specs/command-palette/index.md) |
| `KanbanBoard` + `KanbanColumn` | Board views in trackers and workspaces | [specs/kanban-board](../../specs/kanban-board/index.md) |
| `TimeRangePicker` | Shared time window on dashboards and tracing tools | [specs/time-range-picker](../../specs/time-range-picker/index.md) |
| `TraceTree` | Nested spans with waterfall: LLM traces, distributed traces, agent runs | [specs/trace-tree](../../specs/trace-tree/index.md) |
| `JsonViewer` | Collapsible payloads: trace I/O, tool calls, log fields | [specs/json-viewer](../../specs/json-viewer/index.md) |

## Gap lists

"Built" means a component above covers it. "Open" means Clementine still can't build it cleanly. "Not a gap" means an agent might think it's missing, but an existing component already covers it.

### Issue tracker (issue board)
| Pattern | Maps to | Status |
|---|---|---|
| Board with status columns, counts, add button | `KanbanBoard`, `KanbanColumn`, `IconButton` | Built |
| ⌘K command menu | `CommandPalette` | Built |
| Saved/filtered views tabs | `SavedViews` | Not a gap |
| Board ↔ list toggle | `SegmentedControl` | Not a gap |
| Issue properties side panel (status, priority, assignee) | `DescriptionList` with `Select`/`Avatar` in `detail` | Not a gap |
| Agent side panel (chat about this issue) | `Composer`, `Message`, `DiffView` | Not a gap |
| Drag cards between columns | none. Use the card `Menu` "Move to…" | **Open**: needs an accessible DnD choice |
| App shell: collapsible sidebar nav with sections and favourites | none exported (Mantine `AppShell`/`NavLink` aren't re-exported) | **Open** |
| Issue pager ("1 / 84 ↑ ↓") | `Pagination` is page-numbered, not prev/next-in-list | **Open** (small) |

### Issue tracker (work item detail)
| Pattern | Maps to | Status |
|---|---|---|
| Breadcrumb, title, description | `Breadcrumbs`, `Title`, `Text` | Not a gap |
| Field panel with inline edit | `DescriptionList` + `Select`/`DateInput`/`Avatar` | Not a gap |
| Comments / history tabs | `Tabs`, `CommentThread`, `ActivityFeed` | Not a gap |
| Board with WIP limits | `KanbanColumn limit` | Built |
| Swimlanes (rows across columns) | none | **Open** |
| JQL query bar with syntax help | `SearchField` (plain text only) | **Open** |
| Rich-text description editor | none | **Open** (out of scope for a DS kernel) |

### Observability dashboard
| Pattern | Maps to | Status |
|---|---|---|
| Time range picker with quick ranges + absolute | `TimeRangePicker` | Built |
| Refresh interval | `Select` | Not a gap |
| Dashboard variables (cluster, node) | labelled `Select`s in a `Group` | Not a gap |
| Collapsible rows of panels | `Accordion` (`variant="separated"`, `multiple`) | Not a gap |
| Panel: title + chart / stat / table | `Card` + `AreaChart` / `Stat` / `Table` | Not a gap |
| Panel query error inside the panel | `InlineMessage status="error"` | Not a gap |
| Log line stream with level colouring and expandable fields | `Table` + `JsonViewer` for fields | Partly built: no virtualised log list |
| Draggable / resizable panel grid | none | **Open** |
| Time-shift ‹ › and zoom-out buttons | `IconButton` beside `TimeRangePicker` (app computes the shift) | Not a gap |

### LLM tracing tool (trace explorer)
| Pattern | Maps to | Status |
|---|---|---|
| Span tree with type, duration, waterfall | `TraceTree` | Built |
| Input / output payloads | `JsonViewer` | Built |
| Latency / tokens / cost chips | `CostMeter` | Not a gap |
| Filter sidebar with counts | `FacetedFilter` | Not a gap |
| Traces table | `Table` | Not a gap |
| Histogram above the table | `BarChart` | Not a gap |
| Filter query bar (`level:error latency:>2s`) | `SearchField` (plain text) | **Open**: same as JQL |
| Resizable split between list and trace peek | none | **Open** |

### AI chat assistant
| Pattern | Maps to | Status |
|---|---|---|
| Thread of messages | `ConversationThread`, `Message` | Not a gap |
| Tool call card with args/result | `ToolCallCard` (+ `JsonViewer` beside it for big results) | Not a gap (see agent-mistakes #3) |
| Approval before a side-effecting action | `PermissionRequest` / `HITLGate` | Not a gap |
| Composer, model picker, context meter | `Composer`, `ModelSelector`, `ContextMeter` | Not a gap |
| Artifact side panel | `ArtifactFrame` + `CodeBlock` | Not a gap |
| Conversation list sidebar | `SessionList` | Not a gap |
| Command menu ("/" or ⌘K) | `CommandPalette` | Built |

### Team wiki (doc page)
| Pattern | Maps to | Status |
|---|---|---|
| Page tree sidebar | `Tree` | Not a gap, but `useTree` isn't exported, so agents can't pre-expand it (**Open**, small) |
| Breadcrumb, title, byline | `Breadcrumbs`, `Title`, `Avatar` + `Text` | Not a gap |
| Info / warning panel (callout) | `Alert` | Not a gap |
| Status lozenge ("Verified") | `Badge` | Not a gap |
| Tables, ordered lists | `Table`, `List` | Not a gap |
| Page comments | `CommentThread` | Not a gap |
| "On this page" table of contents | none (Mantine has `TableOfContents`, not re-exported) | **Open** |
| Inline comments on selected text | none | **Open** |

### Docs + database workspace (database view)
| Pattern | Maps to | Status |
|---|---|---|
| Database table with property chips | `Table` + `Badge` / `Avatar` / `Checkbox` | Not a gap |
| Board view of the same rows | `KanbanBoard` | Built |
| View switcher | `SegmentedControl` (or `SavedViews` for named views) | Not a gap |
| Open row as side peek with properties | `Drawer` + `DescriptionList` | Not a gap |
| Page icon + title + blocks | `Title` + content components | Not a gap |
| Inline-editable cells, add property column | none | **Open** |
| Block editor (slash menu, drag handles) | none | **Open** (out of scope) |

## What's still open, ranked by how many apps need it

1. **App shell + side nav** (all 7). Export a Clementine `AppShell`/`NavLink` pair with a spec.
2. **Structured query bar** (trackers, tracing tools, log explorers). A `SearchField` that tokenises `key:value` filters.
3. **Resizable split pane** (tracing tools, trackers, chat artifacts).
4. **Drag-and-drop for KanbanBoard** (trackers and workspaces), once an accessible library is chosen.
5. **TableOfContents** and **useTree** re-exports (wikis and workspaces): small, mostly re-export + spec.
