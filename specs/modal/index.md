---
component: modal
ds_version: clementine-ds@0.1.0 (2026-07-02 verified)
status: AI-Ready
last_verified: 2026-07-02

category: Component
required_aria: [role, aria-modal, aria-labelledby, aria-describedby]

semantic_parts:
  overlay:  Backdrop layer (dims the page underneath)
  dialog:   The modal container — owns elevation, radius, focus trap
  header:   Title row + close button
  body:     Main content
  footer:   Action row (typically Buttons)

token_contract:
  - modal.bg
  - modal.overlay
  - modal.fg.title
  - modal.fg.body
  - modal.fg.secondary
  - modal.border.divider
  - modal.ring
  - modal.radius

interaction_states: [closed, opening, open, closing]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Modal.tsx
    underlying_library: mantine
    exports: [Modal]
  storybook:
    path: apps/storybook/stories/Modal.stories.tsx
  tokens:
    primitives: packages/tokens/src/primitives.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json
    component: packages/tokens/src/components/modal.json

patterns_used_in: [confirm-dialog, edit-form, image-viewer]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: MODAL

> **Status:** AI-Ready. Mantine owns dialog focus trap, Esc close, portal behavior, and rendered ARIA; Storybook covers closed/open, centered, and form-content states.

## 1. Purpose & Intent

Blocking overlay that interrupts the page to demand a decision or show critical content. Use sparingly — most flows belong inline.

**Modal must:**
- trap focus inside the dialog while open
- close on `Esc`
- restore focus to the trigger element on close
- have `role="dialog"` and `aria-modal="true"`
- have `aria-labelledby` pointing at the header's title id

## 2. Verified Contract

- Close button belongs in the header by default; footer actions are reserved for task decisions.
- Opening/closing motion follows Mantine's default transition unless a product surface explicitly overrides it.
- Focus restoration and Esc-to-close are delegated to Mantine and verified through rendered Storybook behavior.
