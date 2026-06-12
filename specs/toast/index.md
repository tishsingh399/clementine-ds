---
component: toast
ds_version: clementine-ds@HEAD (2026-06-11 verified)
status: AI-Ready
last_verified: 2026-06-11

category: Component
required_aria: [role, aria-live]

semantic_parts:
  outlet: the fixed stack region (mounted once in ClementineDSProvider)
  root: a single toast card
  icon: intent icon
  title: optional bold lead
  description: message body
  close: dismiss button

token_contract:
  - toast.bg
  - toast.fg
  - toast.description-fg
  - toast.border
  - toast.icon-success
  - toast.icon-error
  - toast.icon-warning
  - toast.icon-info
  - toast.radius

interaction_states: [entering, visible, exiting]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Toast.tsx
    underlying_library: mantine-notifications
    exports: [toast, ToastOptions]
  storybook:
    path: apps/storybook/stories/Toast.stories.tsx
  tokens:
    component: packages/tokens/src/components/toast.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [optimistic-correctable, reversibility]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: TOAST

> **Implementation:** [`packages/ui/src/components/Toast.tsx`](../../packages/ui/src/components/Toast.tsx) — imperative `toast.*` helpers over `@mantine/notifications`. The `<Notifications />` outlet mounts ONCE inside ClementineDSProvider; never mount a second one.

## 1. Purpose & Intent

Transient, non-blocking status: "Saved", "Copied", "Deleted — Undo". Self-dismissing, stacked bottom-right, max 5 visible.

**Toast must:**
- announce via `aria-live="polite"` (errors via `role="alert"`)
- auto-dismiss (default 4s; errors 8s) with a visible close button
- carry the undo affordance for reversible destructive actions (`toast.undo`) — this is the pattern that replaces ConfirmDialog when undo is possible

## 2. Toast vs Alert

| | Toast | Alert |
|---|---|---|
| Position | overlay stack | inline in layout |
| Lifetime | seconds | until resolved |
| Use for | action feedback | persistent state |

## 3. Agent notes

1. Fire with helpers — `toast.success('Saved')`, `toast.error(...)`, `toast.undo('Deleted 3 items', { message: <UndoButton/> })`. Never render Notification components inline; that's [Alert](../alert/index.md) or InlineMessage.
2. Intent maps to icon tokens only; bg stays neutral (`toast.bg`) so stacks don't become a rainbow.
3. Never put a required decision in a toast — it disappears. Decisions go to [ConfirmDialog](../../patterns/confirm-dialog/index.md).
