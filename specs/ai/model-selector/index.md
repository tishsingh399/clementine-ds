---
component: model-selector
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: [role, aria-expanded]
model_baseline: claude-opus-4-8

semantic_parts:
  trigger: the current-model control
  dropdown: model options

token_contract:
  - model-selector.bg
  - model-selector.border
  - model-selector.fg
  - model-selector.icon
  - model-selector.radius

interaction_states: [default, open, disabled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/ModelSelector.tsx
    underlying_library: mantine
    exports: [ModelSelector, ModelSelectorProps]
  storybook:
    path: apps/storybook/stories/ai/ModelSelector.stories.tsx
  tokens:
    component: packages/tokens/src/components/model-selector.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: MODELSELECTOR

> **Implementation:** [`packages/ui/src/components/ai/ModelSelector.tsx`](../../../packages/ui/src/components/ai/ModelSelector.tsx).

Pick the active model for a surface; the chosen model + prompt version should be logged with feedback.

| Token | Resolves through | Light |
|---|---|---|
| `model-selector.bg` | `{surface.elevated}` | `#ffffff` |
| `model-selector.border` | `{border.default}` | `#e5e5e0` |
| `model-selector.fg` | `{text.primary}` | `#1a1a18` |
| `model-selector.icon` | `{text.secondary}` | `#6b6b66` |
| `model-selector.radius` | `{radius.md}` | `6px` |

**Do:** Show the active model clearly; Record model + prompt version with telemetry (see registry); Default to the policy-approved model.
**Don't:** Offer models the user is not entitled to; Switch silently mid-task.
