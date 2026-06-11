---
component: undo-bar
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: [role, aria-live]
model_baseline: claude-opus-4-8

semantic_parts:
  root: the bar
  message: what happened
  action: undo

token_contract:
  - undo.bg
  - undo.fg

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/UndoBar.tsx
    underlying_library: custom
    exports: [UndoBar, UndoBarProps]
  storybook:
    path: apps/storybook/stories/ai/UndoBar.stories.tsx
  tokens:
    component: packages/tokens/src/components/undo-bar.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: UNDOBAR

> **Implementation:** [`packages/ui/src/components/ai/UndoBar.tsx`](../../../packages/ui/src/components/ai/UndoBar.tsx).

A transient bar confirming an agent action and offering to reverse it — reversibility as a core safety affordance.

| Token | Resolves through | Light |
|---|---|---|
| `undo.bg` | `{text.primary}` | `#1a1a18` |
| `undo.fg` | `{text.on-action}` | `#ffffff` |

**Do:** Name what happened + offer Undo; Auto-dismiss after a grace period; Make Undo keyboard-reachable.
**Don't:** Offer Undo for irreversible actions; Dismiss before the user can react.
