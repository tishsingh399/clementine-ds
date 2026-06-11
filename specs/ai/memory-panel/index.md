---
component: memory-panel
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: [aria-label]
model_baseline: claude-opus-4-8

semantic_parts:
  root: the panel
  fact: a remembered fact
  remove: forget button

token_contract:
  - memory.bg
  - memory.border
  - memory.fg
  - memory.remove

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/MemoryPanel.tsx
    underlying_library: custom
    exports: [MemoryPanel, MemoryPanelProps, MemoryFact]
  storybook:
    path: apps/storybook/stories/ai/MemoryPanel.stories.tsx
  tokens:
    component: packages/tokens/src/components/memory-panel.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: MEMORYPANEL

> **Implementation:** [`packages/ui/src/components/ai/MemoryPanel.tsx`](../../../packages/ui/src/components/ai/MemoryPanel.tsx).

The persistent facts an agent holds about the user/context — viewable and deletable (user control over memory).

| Token | Resolves through | Light |
|---|---|---|
| `memory.bg` | `{surface.elevated}` | `#ffffff` |
| `memory.border` | `{border.default}` | `#e5e5e0` |
| `memory.fg` | `{text.primary}` | `#1a1a18` |
| `memory.remove` | `{text.secondary}` | `#6b6b66` |

**Do:** Make every fact deletable; Show what is remembered plainly; Confirm destructive clears.
**Don't:** Hide what the agent remembers; Make memory un-editable.
