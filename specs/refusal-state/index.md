---
component: refusal-state
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: []
model_baseline: claude-opus-4-8

semantic_parts:
  root: the card
  reason: why
  suggestion: what to try instead

token_contract:
  - refusal-state.bg
  - refusal-state.border
  - refusal-state.fg
  - refusal-state.suggestion

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/RefusalState.tsx
    underlying_library: custom
    exports: [RefusalState, RefusalStateProps]
  storybook:
    path: apps/storybook/stories/ai/RefusalState.stories.tsx
  tokens:
    component: packages/tokens/src/components/refusal-state.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: REFUSALSTATE

> **Implementation:** [`packages/ui/src/components/ai/RefusalState.tsx`](../../packages/ui/src/components/ai/RefusalState.tsx).

A clear, non-dead-end refusal — "I can't do X; here's why, try Y." Styled NEUTRALLY, not as an error.

| Token | Resolves through | Light |
|---|---|---|
| `refusal-state.bg` | `{surface.subtle}` | `#f3f3f0` |
| `refusal-state.border` | `{border.default}` | `#e5e5e0` |
| `refusal-state.fg` | `{text.primary}` | `#1a1a18` |
| `refusal-state.suggestion` | `{text.link}` | `#2563eb` |

**Do:** Give a clear reason + a forward path; Style neutrally (not alarming red); Keep it short and honest.
**Don't:** Dead-end the user; Style a refusal as an error; Be preachy.
