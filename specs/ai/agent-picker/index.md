---
component: agent-picker
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: [role, aria-expanded]
model_baseline: claude-opus-4-8

semantic_parts:
  trigger: current agent
  dropdown: agent options

token_contract:
  - agent-picker.bg
  - agent-picker.border
  - agent-picker.fg
  - agent-picker.icon

interaction_states: [default, open, disabled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/AgentPicker.tsx
    underlying_library: custom
    exports: [AgentPicker, AgentPickerProps]
  storybook:
    path: apps/storybook/stories/ai/AgentPicker.stories.tsx
  tokens:
    component: packages/tokens/src/components/agent-picker.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: AGENTPICKER

> **Implementation:** [`packages/ui/src/components/ai/AgentPicker.tsx`](../../../packages/ui/src/components/ai/AgentPicker.tsx).

Choose or route between agents. Distinct from ModelSelector (which picks a model).

| Token | Resolves through | Light |
|---|---|---|
| `agent-picker.bg` | `{surface.elevated}` | `#ffffff` |
| `agent-picker.border` | `{border.default}` | `#e5e5e0` |
| `agent-picker.fg` | `{text.primary}` | `#1a1a18` |
| `agent-picker.icon` | `{text.secondary}` | `#6b6b66` |

**Do:** Show the active agent clearly; Pair with AgentCard detail on selection.
**Don't:** Offer agents the user can't use; Switch agents silently mid-task.
