---
component: tags-input
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role, aria-expanded]

semantic_parts:
  root: the input
  pill: an entered tag
  label: field label

token_contract:
  - tags-input.bg
  - tags-input.border
  - tags-input.border-focus
  - tags-input.fg
  - tags-input.placeholder
  - tags-input.pill-bg
  - tags-input.pill-fg
  - tags-input.radius

interaction_states: [default, focus, disabled, error]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/TagsInput.tsx
    underlying_library: mantine
    exports: [TagsInput, TagsInputProps]
  storybook:
    path: apps/storybook/stories/TagsInput.stories.tsx
  tokens:
    component: packages/tokens/src/components/tags-input.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [forms]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: TAGSINPUT

> **Implementation:** [`packages/ui/src/components/TagsInput.tsx`](../../packages/ui/src/components/TagsInput.tsx) — wraps Mantine `TagsInput`.

Free-text entry of multiple values as pills (labels, keywords) — optionally with suggestions.

| Token | Resolves through | Light |
|---|---|---|
| `tags-input.bg` | `{surface.elevated}` | `#ffffff` |
| `tags-input.border` | `{border.strong}` | `#d4d4cf` |
| `tags-input.border-focus` | `{focus.ring}` | `#ff8040` |
| `tags-input.fg` | `{text.primary}` | `#1a1a18` |
| `tags-input.placeholder` | `{text.tertiary}` | `#a3a39e` |
| `tags-input.pill-bg` | `{surface.subtle}` | `#f3f3f0` |
| `tags-input.pill-fg` | `{text.primary}` | `#1a1a18` |
| `tags-input.radius` | `{radius.md}` | `6px` |

**Do:** Confirm a tag on Enter/comma; make pills removable; De-duplicate; optionally validate each tag; Offer suggestions when a known set exists.
**Don't:** Allow invalid/duplicate tags silently; Lose typed text on blur without adding.
