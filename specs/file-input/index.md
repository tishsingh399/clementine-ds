---
component: file-input
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [aria-label]

semantic_parts:
  root: the trigger
  value: selected file name(s)
  label: field label

token_contract:
  - file-input.bg
  - file-input.border
  - file-input.border-focus
  - file-input.fg
  - file-input.placeholder
  - file-input.radius

interaction_states: [empty, selected, disabled, error]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/FileInput.tsx
    underlying_library: mantine
    exports: [FileInput, FileInputProps]
  storybook:
    path: apps/storybook/stories/FileInput.stories.tsx
  tokens:
    component: packages/tokens/src/components/file-input.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [forms]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: FILEINPUT

> **Implementation:** [`packages/ui/src/components/FileInput.tsx`](../../packages/ui/src/components/FileInput.tsx) — wraps Mantine `FileInput`.

A control to pick one or more files, showing the chosen file name(s).

| Token | Resolves through | Light |
|---|---|---|
| `file-input.bg` | `{surface.elevated}` | `#ffffff` |
| `file-input.border` | `{border.strong}` | `#737370` |
| `file-input.border-focus` | `{focus.ring}` | `#f5631a` |
| `file-input.fg` | `{text.primary}` | `#1a1a18` |
| `file-input.placeholder` | `{text.tertiary}` | `#737370` |
| `file-input.radius` | `{radius.md}` | `6px` |

**Do:** Show the selected file name; allow clearing; State accepted types + size limits; Validate type/size and surface errors.
**Don't:** Hide what was selected; Accept everything silently then fail on submit.
