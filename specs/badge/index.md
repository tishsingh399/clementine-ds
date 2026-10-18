---
component: badge
ds_version: clementine-ds@0.1.0 (2026-10-06 verified)
status: AI-Ready
last_verified: 2026-10-06
verified_commit: 015819c0
verified_by: [contract, honesty, token-parity, runtime-tokens, painted-dom]

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
| neutral | `surface.subtle` | `#efeeec` |
| success | `feedback.success-subtle` | `#ddf5e2` |
| error | `feedback.error-subtle` | `#fee8e5` |
| warning | `feedback.warning-subtle` | `#ffebcf` |
| risk critical | `risk.critical-subtle` | `#fee8e5` |
| risk high | `risk.high-subtle` | `#ffe9de` |
| risk medium | `risk.medium-subtle` | `#ffebcf` |
| risk low | `risk.low-subtle` | `#ddf5e2` |

## 3. Open Questions

- Future contrast pass: confirm whether risk-tier badges should add a border token
  for dense dark-mode surfaces.
- Future API pass: decide whether arbitrary Mantine `color` values should remain
  accepted or whether Badge should expose only named Clementine intents.
