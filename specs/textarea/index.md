---
component: textarea
ds_version: clementine-ds@0.1.0 (2026-07-02 verified)
status: AI-Ready
last_verified: 2026-07-02

category: Component
required_aria: [aria-invalid, aria-describedby, aria-required, aria-disabled]

semantic_parts:
  label:    <label> tied to the textarea via for/id
  root:     Outer wrapper that owns border + focus ring
  textarea: Native <textarea>
  counter:  Optional character counter (bottom right)
  helper:   Helper or error text

token_contract:
  - textarea.bg.default
  - textarea.bg.disabled
  - textarea.fg.value
  - textarea.fg.placeholder
  - textarea.fg.disabled
  - textarea.border.default
  - textarea.border.focus
  - textarea.border.error
  - textarea.ring
  - textarea.radius

interaction_states: [default, hover, focus, filled, disabled, error]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

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
    component: packages/tokens/src/components/textarea.json

patterns_used_in: [form, comment-box, note-editor]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: TEXTAREA

> **Status:** AI-Ready. Default is fixed rows with user-controlled vertical resize; `autosize` is opt-in for comment/composer surfaces with bounded `minRows`/`maxRows`.

## 1. Purpose & Intent

Multi-line free-text input. For single-line use TextInput. For rich content use a rich-text editor (not in this DS).

**Textarea must:**
- have an associated `<label>`
- expose `aria-invalid` and `aria-describedby` on error
- preserve user-controlled resize (`resize: vertical`) unless explicitly disabled

## 2. Verified Contract

- Use fixed rows by default.
- Use `autosize` only when the surrounding layout can absorb vertical growth.
- Character counters are optional and should appear only when `maxLength` is set.
