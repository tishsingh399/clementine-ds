---
component: modal
ds_version: clementine-ds@HEAD (2026-06-08 verified)
status: Draft
last_verified: 2026-06-08

category: Component
required_aria: [role, aria-modal, aria-labelledby, aria-describedby]

semantic_parts:
  overlay:  Backdrop layer (dims the page underneath)
  dialog:   The modal container — owns elevation, radius, focus trap
  header:   Title row + close button
  body:     Main content
  footer:   Action row (typically Buttons)

token_contract:
  - surface.elevated
  - surface.overlay
  - text.primary
  - text.secondary
  - border.default
  - focus.ring

interaction_states: [closed, opening, open, closing]

checks:
  aria_correct: false
  structure_correct: true
  states_complete: false
  tokens_valid: false
  no_invented_styles: false

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

patterns_used_in: [confirm-dialog, edit-form, image-viewer]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: MODAL

> **Status:** Draft. Focus-trap and Esc-to-close behavior must be verified before promoting to `AI-Ready`.

## 1. Purpose & Intent

Blocking overlay that interrupts the page to demand a decision or show critical content. Use sparingly — most flows belong inline.

**Modal must:**
- trap focus inside the dialog while open
- close on `Esc`
- restore focus to the trigger element on close
- have `role="dialog"` and `aria-modal="true"`
- have `aria-labelledby` pointing at the header's title id

## 2. Open Items

- Confirm Mantine's focus trap restores focus correctly when triggered from inside a portal
- Add motion spec for opening / closing transitions
- Decide: should the close button be in the header, footer, or both?
