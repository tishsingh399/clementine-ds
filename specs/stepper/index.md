---
component: stepper
ds_version: clementine-ds@0.1.0 (2026-10-19 verified)
status: AI-Ready
last_verified: 2026-10-19
verified_commit: 015819c0
verified_by: [contract, honesty, token-parity, runtime-tokens, painted-dom]
verified_gaps: 2

category: Component
required_aria: [aria-current]

semantic_parts:
  root: the step row
  step: a single step
  completed: completed-state content
  separator: connector between steps

token_contract:
  - stepper.bg-completed
  - stepper.bg-active
  - stepper.bg-pending
  - stepper.fg-active
  - stepper.fg-pending
  - stepper.separator
  - stepper.border-focus

interaction_states: [pending, active, completed, disabled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Stepper.tsx
    underlying_library: mantine
    exports: [Stepper, StepperStep, StepperCompleted, StepperProps]
  storybook:
    path: apps/storybook/stories/Stepper.stories.tsx
  tokens:
    component: packages/tokens/src/components/stepper.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: STEPPER

> **Implementation:** [`packages/ui/src/components/Stepper.tsx`](../../packages/ui/src/components/Stepper.tsx) — wraps Mantine `Stepper`.

Ordered progress through a multi-step flow (wizard, onboarding, guided setup).

| Token | Resolves through | Light |
|---|---|---|
| `stepper.bg-completed` | `{action.primary}` | `#305eb7` |
| `stepper.bg-active` | `{action.primary}` | `#305eb7` |
| `stepper.bg-pending` | `{surface.subtle}` | `#efeeec` |
| `stepper.fg-active` | `{text.on-action}` | `#ffffff` |
| `stepper.fg-pending` | `{text.secondary}` | `#65635e` |
| `stepper.separator` | `{border.default}` | `#d5d3d0` |
| `stepper.border-focus` | `{focus.ring}` | `#e86800` |

**Do:** Show total + current position; mark active with aria-current="step"; Validate per step; preserve data on Back; Gate the final commit behind a Review step.
**Don't:** Hide the finish line; Lose entered data when going Back; Signal the active step by color alone.
