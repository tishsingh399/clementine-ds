---
component: modal
ds_version: clementine-ds@0.1.0 (2026-10-06 verified)
status: AI-Ready
last_verified: 2026-10-06
verified_commit: 015819c0
verified_by: [contract, honesty, token-parity, runtime-tokens, painted-dom]

category: Component
required_aria: [role, aria-modal, aria-labelledby, aria-describedby]

semantic_parts:
  overlay:  Backdrop layer (dims the page underneath)
  dialog:   The modal container — owns elevation, radius, focus trap
  header:   Title row + close button
  body:     Main content
  description: Supporting text under the title (ModalDescription, modal.fg.secondary)
  footer:   Decision row (ModalFooter), Cancel first, then the committing action

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

## 2.1 Parts and sizes

| Part | Code | Painted from |
|---|---|---|
| Title | `title` prop | `modal.fg.title`, font-size `lg` (18px), weight 600 |
| Close button | header, automatic | named "Close dialog" for screen readers; focus ring `modal.ring` |
| Description | `ModalDescription` | `modal.fg.secondary`, font-size `sm` (14px) |
| Footer | `ModalFooter` | spacing `md` between buttons, `lg` above; buttons are Clementine `Button` at `md` (40px) |

Width follows Mantine's `size` prop: `md` (440px) is the default; use `lg` or `xl` only for forms that need it. Elevation is `shadow.xl`.

Footer order follows the Clementine Figma specimen: Cancel (outline) first, then the action that commits, labelled with what it does ("Revoke session", not "Confirm"). A destructive action uses `color="red"`.

**Gaps, recorded rather than invented:**
- Clementine has no font-weight tokens; the title uses 600, as `FieldLabel` does.
- Figma has no Modal component set, only a specimen frame on the overview page (`1:1647`), whose body text overflows its 360px frame.

## 2.2 Behaviour verified in a real browser

Measured with Playwright against the `Default` and `ConfirmDestructive` stories, light and dark:
`aria-modal="true"`; `aria-labelledby` resolves to the title; `aria-describedby` resolves; focus moves into the dialog on open and stays inside across Tab presses; Esc closes; focus returns to the trigger; every painted colour matches its token; description text 5.36:1 light, 5.62:1 dark.
