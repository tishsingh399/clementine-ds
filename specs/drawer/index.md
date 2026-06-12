---
component: drawer
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role, aria-modal, aria-labelledby]

semantic_parts:
  overlay: The scrim behind the panel
  panel:   The sliding container
  header:  Title row with close affordance
  title:   The drawer's accessible name
  body:    Scrollable content region
  close:   Close button (needs aria-label)

token_contract:
  - drawer.bg
  - drawer.overlay
  - drawer.border
  - drawer.fg.title
  - drawer.fg.body
  - drawer.radius

interaction_states: [closed, opening, open, closing]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Drawer.tsx
    underlying_library: mantine
    exports: [Drawer, DrawerProps]
  storybook:
    path: apps/storybook/stories/Drawer.stories.tsx
  tokens:
    primitives: packages/tokens/src/primitives.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json
    component: packages/tokens/src/components/drawer.json

patterns_used_in: [filters, detail-panel, create-edit]
pages_used_in: [list-view, dashboard]
---

# AGENTIC DOCUMENTATION: DRAWER

> **Implementation:** [`packages/ui/src/components/Drawer.tsx`](../../packages/ui/src/components/Drawer.tsx) — wraps Mantine `Drawer`. House default position is `right`.

## 1. Purpose & Intent

A panel that slides in from a screen edge for a secondary task — filters, record details, create/edit — while keeping the page behind it. Prefer a Drawer over a Modal when the task is *contextual* to that page.

**Drawer must:** trap focus while open · close on Escape and overlay click · restore focus to the trigger on close · label itself via `aria-labelledby` (the title) · give the close button an `aria-label`.

## 2. Required ARIA (Mantine wires these — keep them)

| Attribute | Where | Value |
|---|---|---|
| `role` | panel | `"dialog"` |
| `aria-modal` | panel | `"true"` |
| `aria-labelledby` | panel | the title id |

## 3. Token bindings

| Part | Token | Resolves (light) |
|---|---|---|
| panel fill | `drawer.bg` → `{surface.elevated}` | `#ffffff` |
| scrim | `drawer.overlay` → `{surface.overlay}` | `rgba(0,0,0,0.4)` |
| border | `drawer.border` → `{border.default}` | `#e5e5e0` |
| title | `drawer.fg.title` → `{text.primary}` | `#1a1a18` |
| body | `drawer.fg.body` → `{text.secondary}` | `#6b6b66` |
| corners | `drawer.radius` → `{radius.lg}` | `8px` |

## 4. States
`closed` → `opening` (slide+fade in) → `open` → `closing`. Honor `prefers-reduced-motion` by cross-fading instead of sliding.

## 5. Do / Don't
**Do** use for contextual side tasks; keep one drawer at a time. **Don't** stack drawers, or use a Drawer for a blocking confirm (that's a Modal).
