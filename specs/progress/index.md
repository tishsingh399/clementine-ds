---
component: progress
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role, aria-valuenow, aria-valuemin, aria-valuemax, aria-label]

semantic_parts:
  track: The unfilled background
  bar:   The filled portion
  label: Optional value/description

token_contract:
  - progress.track
  - progress.bar
  - progress.bar-success
  - progress.bar-warning
  - progress.bar-error
  - progress.radius

interaction_states: [determinate, complete]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Progress.tsx
    underlying_library: mantine
    exports: [Progress, ProgressProps]
  storybook:
    path: apps/storybook/stories/Progress.stories.tsx
  tokens:
    primitives: packages/tokens/src/primitives.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json
    component: packages/tokens/src/components/progress.json

patterns_used_in: [upload, import, quota]
pages_used_in: [settings, dashboard]
---

# AGENTIC DOCUMENTATION: PROGRESS

> **Implementation:** [`packages/ui/src/components/Progress.tsx`](../../packages/ui/src/components/Progress.tsx) — wraps Mantine `Progress`.

## 1. Purpose & Intent

A determinate bar showing how far a known task has progressed (upload, import, quota used). For unknown-duration work, use Skeleton or a spinner instead.

**Progress must:** expose `role="progressbar"` with `aria-valuenow/min/max` · carry an `aria-label` or a visible label · reinforce status color with text — never color alone (WCAG 1.4.1).

## 2. Token bindings

| Part | State | Token | Resolves (light) |
|---|---|---|---|
| track | — | `progress.track` → `{surface.subtle}` | `#f3f3f0` |
| bar | default | `progress.bar` → `{action.primary}` | `#2563eb` |
| bar | success | `progress.bar-success` → `{feedback.success}` | `#16a34a` |
| bar | warning | `progress.bar-warning` → `{feedback.warning}` | `#f97316` |
| bar | error | `progress.bar-error` → `{feedback.error}` | `#dc2626` |
| corners | — | `progress.radius` → `{radius.xl}` | `99px` |

## 3. States
`determinate` (0–100%) and `complete` (100%, often paired with a success cue). 

## 4. Do / Don't
**Do** pair quota warnings with text ("85% of seats used"). **Don't** use a determinate bar for indeterminate work, and don't signal error with red fill alone.
