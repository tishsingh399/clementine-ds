# Trace explorer (pattern: LLM tracing tools)

Story: **Worked examples/Trace explorer** · [`TraceExplorer.stories.tsx`](../../apps/storybook/stories/examples/TraceExplorer.stories.tsx)

Filters on the left, a traces table, and the open trace below: a span tree beside the selected span's metrics and payloads.

| Region | Component | Why this one |
|---|---|---|
| Time window | `TimeRangePicker` | Same control as dashboards. Traces are time-scoped. |
| Query bar | `SearchField` | Plain text for now. A tokenised `key:value` bar is an open gap. |
| Filter sidebar | `FacetedFilter` | Grouped checkboxes with counts. That's exactly this pattern. |
| Traces list | `Table highlightOnHover` | Rows of runs, with status as a `Badge` whose text says "1 error", not just a colour. |
| Span tree | `TraceTree` (`spans`, `selectedId`, `onSelect`) | Nested spans **with timing**. Not `Tree` (no time axis), `ReasoningTrace` (narrated thoughts) or `PlanSteps` (a plan, not measurements). |
| Span header | `Text` + `Badge` (type) | Repeats the selected span's name and kind. |
| Latency / tokens / cost | `CostMeter` | It exists. Agents often rebuild it from `Badge`s. |
| Input / output | `Tabs` + two `JsonViewer`s with `aria-label` | Pass parsed objects, not `JSON.stringify` output. Use `CodeBlock` only when the user should copy raw text. |

**Agent checklist**
- `TraceSpan.start` is ms from trace start, not a timestamp.
- The selected span drives the detail pane. Keep `selectedId` in state; don't read it from the DOM.
