---
component: textarea
ds_version: tina-ds@HEAD (2026-06-08 verified)
status: Draft
last_verified: 2026-06-08

category: Component
required_aria: [aria-invalid, aria-describedby, aria-required, aria-disabled]

semantic_parts:
  label:    <label> tied to the textarea via for/id
  root:     Outer wrapper that owns border + focus ring
  textarea: Native <textarea>
  counter:  Optional character counter (bottom right)
  helper:   Helper or error text

token_contract:
  - surface.elevated
  - text.primary
  - text.secondary
  - border.strong
  - border.focus
  - focus.ring
  - feedback.error

interaction_states: [default, hover, focus, filled, disabled, error]

checks:
  aria_correct: false
  structure_correct: true
  states_complete: false
  tokens_valid: false
  no_invented_styles: false

sources:
  react:
    path: packages/ui/src/components/Textarea.tsx
    underlying_library: mantine
    exports: [Textarea]
  storybook:
    path: apps/storybook/stories/Textarea.stories.tsx
  tokens:
    primitives: packages/tokens/src/primitives.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [form, comment-box, note-editor]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: TEXTAREA

> **Status:** Draft. Auto-resize behavior needs an explicit decision.

## 1. Purpose & Intent

Multi-line free-text input. For single-line use TextInput. For rich content use a rich-text editor (not in this DS).

**Textarea must:**
- have an associated `<label>`
- expose `aria-invalid` and `aria-describedby` on error
- preserve user-controlled resize (`resize: vertical`) unless explicitly disabled

## 2. Open Items

- Default: fixed rows + user-resize, or auto-grow to content?
- Character counter: always shown, or only when `maxLength` is set?
