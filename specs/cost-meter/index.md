---
component: cost-meter
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: []
model_baseline: claude-opus-4-8

semantic_parts:
  root: the meter
  label: metric name
  value: metric value

token_contract:
  - cost-meter.label
  - cost-meter.value

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/CostMeter.tsx
    underlying_library: custom
    exports: [CostMeter, CostMeterProps]
  storybook:
    path: apps/storybook/stories/ai/CostMeter.stories.tsx
  tokens:
    component: packages/tokens/src/components/cost-meter.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: COSTMETER

> **Implementation:** [`packages/ui/src/components/ai/CostMeter.tsx`](../../packages/ui/src/components/ai/CostMeter.tsx).

Usage transparency for a run — tokens, estimated cost, and elapsed latency. Enterprise-critical (usage is billable + audited).

| Token | Resolves through | Light |
|---|---|---|
| `cost-meter.label` | `{text.tertiary}` | `#737370` |
| `cost-meter.value` | `{text.secondary}` | `#6b6b66` |

**Do:** Show tokens + cost + latency plainly; Keep estimates honest/labeled.
**Don't:** Hide cost where it is billed; Imply false precision.
