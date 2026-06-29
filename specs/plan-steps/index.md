---
component: plan-steps
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: [role]
model_baseline: claude-opus-4-8

semantic_parts:
  root: the plan
  step: a task
  marker: status glyph

token_contract:
  - plan-steps.pending
  - plan-steps.active
  - plan-steps.done
  - plan-steps.error
  - plan-steps.fg

interaction_states: [pending, active, done, error]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/PlanSteps.tsx
    underlying_library: custom
    exports: [PlanSteps, PlanStepsProps, PlanStep, PlanStepStatus]
  storybook:
    path: apps/storybook/stories/ai/PlanSteps.stories.tsx
  tokens:
    component: packages/tokens/src/components/plan-steps.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: PLANSTEPS

> **Implementation:** [`packages/ui/src/components/ai/PlanSteps.tsx`](../../packages/ui/src/components/ai/PlanSteps.tsx).

An agent's task decomposition with live per-step status. Distinct from Stepper (a user-driven form flow).

| Token | Resolves through | Light |
|---|---|---|
| `plan-steps.pending` | `{text.tertiary}` | `#a3a39e` |
| `plan-steps.active` | `{action.primary}` | `#2563eb` |
| `plan-steps.done` | `{feedback.success}` | `#16a34a` |
| `plan-steps.error` | `{feedback.error}` | `#dc2626` |
| `plan-steps.fg` | `{text.primary}` | `#1a1a18` |

**Do:** Show status by glyph + text; Update live as steps complete; Surface errors on the failing step.
**Don't:** Use color alone for status; Hide which step is active.
