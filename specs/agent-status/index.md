---
component: agent-status
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: [role, aria-live]
model_baseline: claude-opus-4-8

semantic_parts:
  indicator: dot or spinner
  label: state text

token_contract:
  - agent-status.idle
  - agent-status.busy
  - agent-status.waiting
  - agent-status.done
  - agent-status.error

interaction_states: [idle, thinking, tool, waiting, done, error, refused]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/AgentStatus.tsx
    underlying_library: custom
    exports: [AgentStatus, AgentStatusProps, AgentState]
  storybook:
    path: apps/storybook/stories/ai/AgentStatus.stories.tsx
  tokens:
    component: packages/tokens/src/components/agent-status.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: AGENTSTATUS

> **Implementation:** [`packages/ui/src/components/ai/AgentStatus.tsx`](../../packages/ui/src/components/ai/AgentStatus.tsx).

The agent's current state — idle / thinking / calling tool / waiting on you / done / error / refused — shown with an indicator AND text.

| Token | Resolves through | Light |
|---|---|---|
| `agent-status.idle` | `{text.tertiary}` | `#737370` |
| `agent-status.busy` | `{action.primary}` | `#2563eb` |
| `agent-status.waiting` | `{feedback.warning}` | `#ea580c` |
| `agent-status.done` | `{feedback.success}` | `#16a34a` |
| `agent-status.error` | `{feedback.error}` | `#dc2626` |

**Do:** Pair the indicator with text; Announce changes politely; Distinguish waiting-on-you clearly.
**Don't:** Use a bare color/spinner with no label; Conflate error with refusal.
