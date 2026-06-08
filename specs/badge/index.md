---
component: badge
ds_version: clementine-ds@HEAD (2026-06-08 verified)
status: Draft
last_verified: 2026-06-08

category: Component
required_aria: []

semantic_parts:
  root:  Outer <span> — owns padding, radius, fill
  label: Text content

token_contract:
  - surface.subtle
  - text.primary
  - feedback.success-subtle
  - feedback.error-subtle
  - feedback.warning-subtle
  - risk.critical-subtle
  - risk.high-subtle
  - risk.medium-subtle
  - risk.low-subtle

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: false
  no_invented_styles: false

sources:
  react:
    path: packages/ui/src/components/Badge.tsx
    underlying_library: mantine
    exports: [Badge]
  storybook:
    path: apps/storybook/stories/Badge.stories.tsx
  tokens:
    primitives: packages/tokens/src/primitives.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [data-table, status-list, page-header]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: BADGE

> **Status:** Draft. Spec stub — needs token reconciliation and full state table. See [AGENTS.md](../../AGENTS.md) for the workflow to promote to `AI-Ready`.

## 1. Purpose & Intent

Non-interactive label that communicates status, severity, or count. Never clickable — if it needs to be tappable, use Button.

## 2. Required Contract

### 2.1 Required ARIA

None — Badge is presentational. If it conveys status critical to the surrounding context, the parent should expose that via its own label.

### 2.2 Token Bindings (to verify)

| Intent | Token | Resolves (light) |
|---|---|---|
| neutral | `surface.subtle` | `#f3f3f0` |
| success | `feedback.success-subtle` | `#f0fdf4` |
| error | `feedback.error-subtle` | `#fef2f2` |
| warning | `feedback.warning-subtle` | `#fff7ed` |
| risk critical | `risk.critical-subtle` | `#fef2f2` |
| risk high | `risk.high-subtle` | `#fff7ed` |
| risk medium | `risk.medium-subtle` | `#ffedd5` |
| risk low | `risk.low-subtle` | `#f0fdf4` |

## 3. Open Questions

- Confirm whether risk-tier badges should also bind a `border` token for contrast in dark mode
- Confirm text token (text.primary vs a tier-specific text-on-subtle)
