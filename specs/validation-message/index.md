---
component: validation-message
ds_version: clementine-ds@0.1.0 (2026-06-11 verified)
status: AI-Ready
last_verified: 2026-06-11

category: Component
required_aria: ["role=alert on error", "id for aria-describedby"]

semantic_parts:
  root: the inline row
  icon: the status glyph (shape per status)
  text: the high-contrast message

token_contract:
  - validation-message.fg
  - validation-message.error
  - validation-message.warning
  - validation-message.success

interaction_states: [error, warning, success]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ValidationMessage.tsx
    underlying_library: custom (Mantine primitives + tokens)
    exports: [ValidationMessage, ValidationMessageProps]
  storybook:
    path: apps/storybook/stories/ValidationMessage.stories.tsx
  tokens:
    component: packages/tokens/src/components/validation-message.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: VALIDATIONMESSAGE

> **Implementation:** [`packages/ui/src/components/ValidationMessage.tsx`](../../packages/ui/src/components/ValidationMessage.tsx).

Inline field validation feedback for error, warning, or success.

| Token | Resolves through | Light |
|---|---|---|
| `validation-message.fg` | `{text.primary}` | `#1a1a18` |
| `validation-message.error` | `{feedback.error}` | `#dc2626` |
| `validation-message.warning` | `{feedback.warning}` | `#f97316` |
| `validation-message.success` | `{feedback.success}` | `#16a34a` |

**Do:** Tie error messages to the field via aria-describedby; Lead with the glyph and plain wording.
**Don’t:** Signal validity by color alone; Write vague messages like "invalid".
