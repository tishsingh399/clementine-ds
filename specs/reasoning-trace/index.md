---
component: reasoning-trace
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: [aria-expanded, aria-busy]
model_baseline: claude-opus-4-8
prompt_version: reasoning@2026-06-10

semantic_parts:
  root:    Container (subtle surface)
  toggle:  Disclosure button (aria-expanded)
  body:    Dimmed, collapsible thinking text

token_contract:
  - reasoning.bg
  - reasoning.fg
  - reasoning.label
  - reasoning.rule
  - reasoning.radius

interaction_states: [collapsed, expanded, streaming]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/ReasoningTrace.tsx
    underlying_library: mantine
    exports: [ReasoningTrace, ReasoningTraceProps]
  storybook:
    path: apps/storybook/stories/ai/ReasoningTrace.stories.tsx
  tokens:
    component: packages/tokens/src/components/reasoning-trace.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: REASONING TRACE

> **Implementation:** [`packages/ui/src/components/ai/ReasoningTrace.tsx`](../../packages/ui/src/components/ai/ReasoningTrace.tsx).

A collapsible, de-emphasized view of the model's intermediate thinking. Collapsed by default; the toggle is a real button with `aria-expanded`. Content is dimmed so it reads as secondary to the answer.

| Part | Token | Light |
|---|---|---|
| container | `reasoning.bg` → `{surface.subtle}` | `#f3f3f0` |
| body text | `reasoning.fg` → `{text.secondary}` | `#6b6b66` |
| heading | `reasoning.label` → `{text.tertiary}` | `#a3a39e` |
| left rule | `reasoning.rule` → `{border.default}` | `#e5e5e0` |

**Do** keep it collapsed by default and label it ("Thought for 1.2s"). **Don't** present reasoning as the answer, or surface raw chain-of-thought the model shouldn't expose.
