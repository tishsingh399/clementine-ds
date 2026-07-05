---
component: inline-message
ds_version: clementine-ds@0.1.0 (2026-06-11 verified)
status: AI-Ready
last_verified: 2026-06-11

category: Component
required_aria: []

semantic_parts:
  root: the inline row
  icon: the status glyph (shape differs per status)
  text: the high-contrast message

token_contract:
  - inline-message.fg
  - inline-message.info
  - inline-message.success
  - inline-message.warning
  - inline-message.error

interaction_states: [info, success, warning, error]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/InlineMessage.tsx
    underlying_library: custom (Mantine primitives + tokens)
    exports: [InlineMessage, InlineMessageProps]
  storybook:
    path: apps/storybook/stories/InlineMessage.stories.tsx
  tokens:
    component: packages/tokens/src/components/inline-message.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: INLINEMESSAGE

> **Implementation:** [`packages/ui/src/components/InlineMessage.tsx`](../../packages/ui/src/components/InlineMessage.tsx).

A compact inline status line (icon + text) for info, success, warning, or error.

| Token | Resolves through | Light |
|---|---|---|
| `inline-message.fg` | `{text.primary}` | `#1a1a18` |
| `inline-message.info` | `{text.secondary}` | `#6b6b66` |
| `inline-message.success` | `{feedback.success}` | `#16a34a` |
| `inline-message.warning` | `{feedback.warning}` | `#ea580c` |
| `inline-message.error` | `{feedback.error}` | `#dc2626` |

**Do:** Keep messages to one line where possible; Let the glyph shape and wording carry the status.
**Don’t:** Rely on the icon color alone (WCAG 1.4.1); Use for long-form content.
