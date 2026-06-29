---
component: feedback-control
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Feedback
tray: 8
required_aria: [aria-pressed, aria-label]

semantic_parts:
  root:     Group of two toggles
  positive: Thumbs up
  negative: Thumbs down

token_contract:
  - feedback-control.idle
  - feedback-control.positive
  - feedback-control.negative

interaction_states: [idle, positive, negative]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/feedback/FeedbackControl.tsx
    underlying_library: mantine
    exports: [FeedbackControl, FeedbackControlProps, FeedbackValue]
  storybook:
    path: apps/storybook/stories/feedback/FeedbackControl.stories.tsx
  tokens:
    component: packages/tokens/src/components/feedback-control.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: FEEDBACK CONTROL

> **Implementation:** [`packages/ui/src/components/feedback/FeedbackControl.tsx`](../../packages/ui/src/components/feedback/FeedbackControl.tsx). The loop: [feedback/README.md](../../feedback/README.md).

Thumbs up/down on an AI response — the first link in the evaluation loop. Toggleable, exposes `aria-pressed`, each button labelled for AT.

| State | Token | Light |
|---|---|---|
| idle | `feedback-control.idle` → `{text.tertiary}` | `#a3a39e` |
| positive | `feedback-control.positive` → `{feedback.success}` | `#16a34a` |
| negative | `feedback-control.negative` → `{feedback.error}` | `#dc2626` |

**Do** capture model + prompt version with the rating (see registry). **Don't** block the UI on feedback, and keep it reversible.
