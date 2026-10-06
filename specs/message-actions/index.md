---
component: message-actions
ds_version: clementine-ds@0.1.0 (2026-10-06 verified)
status: AI-Ready
last_verified: 2026-10-06
verified_commit: 015819c0
verified_by: [contract, honesty, token-parity, runtime-tokens, painted-dom]

category: AI Surface
tray: 4
required_aria: [aria-label]
model_baseline: claude-opus-4-8

semantic_parts:
  root: the action row
  action: one icon action

token_contract:
  - message-actions.fg
  - message-actions.fg-hover

interaction_states: [default, hover]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/MessageActions.tsx
    underlying_library: custom
    exports: [MessageActions, MessageActionsProps]
  storybook:
    path: apps/storybook/stories/ai/MessageActions.stories.tsx
  tokens:
    component: packages/tokens/src/components/message-actions.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: MESSAGEACTIONS

> **Implementation:** [`packages/ui/src/components/ai/MessageActions.tsx`](../../packages/ui/src/components/ai/MessageActions.tsx).

The action row on a Message — copy, edit, regenerate, branch. Only handlers you pass render.

| Token | Resolves through | Light |
|---|---|---|
| `message-actions.fg` | `{text.secondary}` | `#6b6b66` |
| `message-actions.fg-hover` | `{text.primary}` | `#1a1a18` |

**Do:** Label every icon; pair with Tooltip; Show on hover/focus, keep keyboard-reachable.
**Don't:** Hide critical actions behind hover only; Ship unlabeled icons.
