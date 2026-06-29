---
component: confidence-meter
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: [role, aria-label]
model_baseline: claude-opus-4-8

semantic_parts:
  root: the meter
  bar: a confidence segment
  label: the text level

token_contract:
  - confidence-meter.track
  - confidence-meter.high
  - confidence-meter.medium
  - confidence-meter.low
  - confidence-meter.label

interaction_states: [high, medium, low]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/ConfidenceMeter.tsx
    underlying_library: mantine
    exports: [ConfidenceMeter, ConfidenceMeterProps, ConfidenceLevel]
  storybook:
    path: apps/storybook/stories/ai/ConfidenceMeter.stories.tsx
  tokens:
    component: packages/tokens/src/components/confidence-meter.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: CONFIDENCEMETER

> **Implementation:** [`packages/ui/src/components/ai/ConfidenceMeter.tsx`](../../packages/ui/src/components/ai/ConfidenceMeter.tsx).

Communicates how confident the model is in an answer, with filled bars AND a text label.

| Token | Resolves through | Light |
|---|---|---|
| `confidence-meter.track` | `{surface.subtle}` | `#f3f3f0` |
| `confidence-meter.high` | `{feedback.success}` | `#16a34a` |
| `confidence-meter.medium` | `{feedback.warning}` | `#f97316` |
| `confidence-meter.low` | `{feedback.error}` | `#dc2626` |
| `confidence-meter.label` | `{text.secondary}` | `#6b6b66` |

**Do:** Pair the bars with a text label (never color alone); Map to a real confidence signal, not decoration; Prompt verification on low confidence.
**Don't:** Show confidence the model cannot actually measure; Use color as the only cue.
