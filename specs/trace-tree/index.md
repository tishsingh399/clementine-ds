---
component: trace-tree
ds_version: clementine-ds@0.1.0 (2026-10-20 verified)
status: AI-Ready
last_verified: 2026-10-20
verified_commit: a12ce8a6
verified_by: [contract, honesty, token-parity, runtime-tokens, painted-dom]

category: Component
required_aria: [role=tree, role=treeitem, aria-level, aria-expanded, aria-selected]

semantic_parts:
  root:     the tree (role=tree)
  row:      one span (treeitem) — chevron, type badge, name, duration
  type:     span kind badge (agent, llm, tool, retrieval)
  duration: formatted span duration
  track:    the shared time axis behind the bar
  bar:      the span's position and length on the axis
  guide:    indent guide for leaf spans

slots: {}

token_contract:
  - trace-tree.fg
  - trace-tree.row-bg-selected
  - trace-tree.track
  - trace-tree.bar
  - trace-tree.bar-error
  - trace-tree.duration
  - trace-tree.guide

interaction_states: [default, expanded, collapsed, selected, error]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/TraceTree.tsx
    underlying_library: custom (Mantine primitives + tokens)
    exports: [TraceTree, TraceTreeProps, TraceSpan, visibleSpanRows, formatDuration]
  storybook:
    path: apps/storybook/stories/TraceTree.stories.tsx
  tokens:
    component: packages/tokens/src/components/trace-tree.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [agent-run-inspector, distributed-tracing]
pages_used_in: [trace-explorer, agent-chat]
---

# AGENTIC DOCUMENTATION: TRACETREE

> **Implementation:** [`packages/ui/src/components/TraceTree.tsx`](../../packages/ui/src/components/TraceTree.tsx). Worked example: [`docs/worked-examples/trace-explorer.md`](../../docs/worked-examples/trace-explorer.md).

Nested spans of one trace (an agent run, an LLM pipeline, a distributed request), each with a waterfall bar on a shared time axis. Selecting a span drives a detail pane.

## Contract
- **Data, not children** (`slots: {}`). Pass `spans: TraceSpan[]` with `start` (ms from trace start), `duration` (ms), optional `type`, `status` and `children`.
- Selection is controlled: `selectedId` + `onSelect`. Render the selected span's input/output in a `JsonViewer` beside or below the tree.
- `status: 'error'` paints the bar red **and** adds a "⚠ error" label.

## Not this component
- `Tree`: plain hierarchies (files, orgs) with no time axis.
- `ReasoningTrace`: the model's narrated steps inside a chat message.
- `PlanSteps`: an ordered plan before or while it runs, not measured spans.
- `Timeline`: events over calendar time, not nested durations.

## Accessibility
WAI-ARIA tree with one tab stop (roving tabindex). `↑`/`↓` move, `→` expands or moves to the first child, `←` collapses or moves to the parent, `Home`/`End` jump, `Enter`/`Space` select. The bar is decorative (`aria-hidden`). The duration is text.

| Token | Resolves through | Light |
|---|---|---|
| `trace-tree.fg` | `{text.primary}` | `#2a2926` |
| `trace-tree.row-bg-selected` | `{action.selected-subtle}` | `#e5eeff` |
| `trace-tree.track` | `{surface.subtle}` | `#efeeec` |
| `trace-tree.bar` | `{action.primary}` | `#305eb7` |
| `trace-tree.bar-error` | `{feedback.error}` | `#c1332f` |
| `trace-tree.duration` | `{text.secondary}` | `#65635e` |
| `trace-tree.guide` | `{border.default}` | `#d5d3d0` |

**Do:** Keep `type` to a small fixed vocabulary; show cost and token counts in the detail pane, not the row.
**Don't:** Use it for flat lists of runs (use `Table`); encode status only in bar colour.
