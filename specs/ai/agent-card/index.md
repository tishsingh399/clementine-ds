---
component: agent-card
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: []
model_baseline: claude-opus-4-8

semantic_parts:
  root: the card
  name: agent name
  capabilities: capability badges
  owner: owner line

token_contract:
  - agent-card.bg
  - agent-card.border
  - agent-card.name
  - agent-card.meta

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/AgentCard.tsx
    underlying_library: custom
    exports: [AgentCard, AgentCardProps]
  storybook:
    path: apps/storybook/stories/ai/AgentCard.stories.tsx
  tokens:
    component: packages/tokens/src/components/agent-card.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: AGENTCARD

> **Implementation:** [`packages/ui/src/components/ai/AgentCard.tsx`](../../../packages/ui/src/components/ai/AgentCard.tsx).

A profile card for an agent — identity, what it does, capabilities, and owner. Used in rosters and pickers.

| Token | Resolves through | Light |
|---|---|---|
| `agent-card.bg` | `{surface.elevated}` | `#ffffff` |
| `agent-card.border` | `{border.default}` | `#e5e5e0` |
| `agent-card.name` | `{text.primary}` | `#1a1a18` |
| `agent-card.meta` | `{text.secondary}` | `#6b6b66` |

**Do:** State capabilities + scope + owner; Keep the description concrete.
**Don't:** Overstate capabilities; Hide limits/scope.
