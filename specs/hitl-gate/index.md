---
component: hitl-gate
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: [role, aria-label]
model_baseline: claude-opus-4-8
prompt_version: tools@2026-06-10

semantic_parts:
  root:    Caution-styled container (role=group)
  title:   What needs approval
  preview: The action awaiting the decision
  actions: Approve / Deny / Edit

token_contract:
  - hitl.bg
  - hitl.border
  - hitl.title
  - hitl.body
  - hitl.approve-bg
  - hitl.approve-destructive-bg
  - hitl.deny-bg
  - hitl.radius

interaction_states: [pending, approved, denied]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/HITLGate.tsx
    underlying_library: mantine
    exports: [HITLGate, HITLGateProps, HITLStatus]
  storybook:
    path: apps/storybook/stories/ai/HITLGate.stories.tsx
  tokens:
    component: packages/tokens/src/components/hitl-gate.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [tool-use, wizard]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: HITL GATE

> **Implementation:** [`packages/ui/src/components/ai/HITLGate.tsx`](../../packages/ui/src/components/ai/HITLGate.tsx).

A human-in-the-loop checkpoint that pauses an agent before a consequential action runs (write, delete, send, spend). Caution-styled on `feedback.warning` with Approve / Deny / Edit. The gated action's preview goes in the body.

| Part | Token | Light |
|---|---|---|
| container | `hitl.bg` → `{feedback.warning-subtle}` | `#fff7ed` |
| border | `hitl.border` → `{feedback.warning}` | `#ea580c` |
| approve | `hitl.approve-bg` → `{action.primary}` | `#2563eb` |
| approve (destructive) | `hitl.approve-destructive-bg` → `{action.destructive}` | `#dc2626` |

**Do** require a gate for destructive/irreversible actions; show what will happen. **Don't** rely on color alone for "destructive" — set `destructive` AND use the verb ("Revoke").
