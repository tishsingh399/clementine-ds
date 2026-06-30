---
component: badge
ds_version: clementine-ds@0.1.0 (2026-06-08 verified)
status: AI-Ready
last_verified: 2026-06-30

category: Component
required_aria: []

semantic_parts:
  root:  Outer <span> — owns padding, radius, fill
  label: Text content

token_contract:
  - badge.bg.neutral
  - badge.bg.success
  - badge.bg.error
  - badge.bg.warning
  - badge.bg.risk-critical
  - badge.bg.risk-high
  - badge.bg.risk-medium
  - badge.bg.risk-low
  - badge.fg.default
  - badge.radius

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

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
    component: packages/tokens/src/components/badge.json

patterns_used_in: [data-table, status-list, page-header]
pages_used_in: []
---

# Agentic Documentation: Badge

> **Status:** AI-Ready. Badge paints known Clementine intents through `badge.*`
> component tokens at runtime. See [AGENTS.md](../../AGENTS.md) for the token
> cascade workflow.

## 1. Purpose & Intent

Non-interactive label that communicates status, severity, or count. Never clickable — if it needs to be tappable, use Button.

## 2. Required Contract

### 2.1 Required ARIA

None — Badge is presentational. If it conveys status critical to the surrounding context, the parent should expose that via its own label.

### 2.2 Token Bindings

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

- Future contrast pass: confirm whether risk-tier badges should add a border token
  for dense dark-mode surfaces.
- Future API pass: decide whether arbitrary Mantine `color` values should remain
  accepted or whether Badge should expose only named Clementine intents.
