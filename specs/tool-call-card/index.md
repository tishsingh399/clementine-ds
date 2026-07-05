---
component: tool-call-card
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: [aria-expanded]
model_baseline: claude-opus-4-8
prompt_version: tools@2026-06-10

semantic_parts:
  root:    Bordered card
  header:  Tool name + status badge (toggle)
  args:    Collapsible code block of arguments
  result:  Tool output

token_contract:
  - tool-call.bg
  - tool-call.border
  - tool-call.name
  - tool-call.args-bg
  - tool-call.status.pending
  - tool-call.status.running
  - tool-call.status.success
  - tool-call.status.error
  - tool-call.radius

interaction_states: [pending, running, success, error]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/ToolCallCard.tsx
    underlying_library: mantine
    exports: [ToolCallCard, ToolCallCardProps, ToolCallStatus]
  storybook:
    path: apps/storybook/stories/ai/ToolCallCard.stories.tsx
  tokens:
    component: packages/tokens/src/components/tool-call-card.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat, tool-use]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: TOOL CALL CARD

> **Implementation:** [`packages/ui/src/components/ai/ToolCallCard.tsx`](../../packages/ui/src/components/ai/ToolCallCard.tsx).

A transparent record of a tool/function the agent invoked: name + status badge in the header, expandable arguments (as code) and result. Status is carried by a labelled `Badge` (text), not color alone.

| Status | Token | Light |
|---|---|---|
| pending | `tool-call.status.pending` → `{text.tertiary}` | `#737370` |
| running | `tool-call.status.running` → `{action.primary}` | `#2563eb` |
| success | `tool-call.status.success` → `{feedback.success}` | `#16a34a` |
| error | `tool-call.status.error` → `{feedback.error}` | `#dc2626` |

**Do** show the tool name so the user knows *what* is happening. **Don't** hide a destructive tool call — pair it with a [HITLGate](../hitl-gate/index.md).
