# Metrics dashboard (pattern: observability dashboards)

Story: **Worked examples/Metrics dashboard** · [`MetricsDashboard.stories.tsx`](../../apps/storybook/stories/examples/MetricsDashboard.stories.tsx)

A service-health dashboard: a shared time window, dashboard variables, collapsible rows and panels of charts, stats and tables. One panel shows a failed query.

| Region | Component | Why this one |
|---|---|---|
| Time window | `TimeRangePicker` | One per page, top right, driving every panel. Takes no children: configure it with props. |
| Auto-refresh | `Select` (`aria-label="Auto-refresh"`) | An interval is a single choice. |
| Dashboard variables | `Select` with `label` in a `Group` | Visible labels, because these are real filters. |
| Rows ("Overview", "Compute") | `Accordion multiple variant="separated"` | Several rows open at once, and each row is a heading the user can collapse. |
| KPIs | `Stat` in a `Group` | `Stat` pairs the delta arrow with text. Don't build KPIs from `Title` + `Badge`. |
| Chart panel | `Card` + `Text` title + `AreaChart` | Series colours come from the theme (`blue.6`, `green.6` → chart tokens). Never hex. |
| Failed panel | `InlineMessage status="error"` inside the panel's `Card` | The error stays local and the page keeps working. Not a page-level `Alert`, and not `ErrorState` (that's for whole empty regions). |
| Pods table | `Table` with `StatusDot label="…"` | `StatusDot` renders its own text, so pass `label` and don't add a second text cell. |

**Agent checklist**
- Don't give each panel its own time picker.
- Panels are `Card`s in a wrapping `Group`. There's no draggable grid yet (gap list).
