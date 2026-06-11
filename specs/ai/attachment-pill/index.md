---
component: attachment-pill
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: [aria-label]
model_baseline: claude-opus-4-8

semantic_parts:
  root: the pill
  name: file name
  meta: file size
  remove: remove button

token_contract:
  - attachment.bg
  - attachment.border
  - attachment.fg
  - attachment.meta
  - attachment.radius

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/AttachmentPill.tsx
    underlying_library: mantine
    exports: [AttachmentPill, AttachmentPillProps]
  storybook:
    path: apps/storybook/stories/ai/AttachmentPill.stories.tsx
  tokens:
    component: packages/tokens/src/components/attachment-pill.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: ATTACHMENTPILL

> **Implementation:** [`packages/ui/src/components/ai/AttachmentPill.tsx`](../../../packages/ui/src/components/ai/AttachmentPill.tsx).

A file attached to a prompt, shown as a removable pill in the Composer.

| Token | Resolves through | Light |
|---|---|---|
| `attachment.bg` | `{surface.subtle}` | `#f3f3f0` |
| `attachment.border` | `{border.default}` | `#e5e5e0` |
| `attachment.fg` | `{text.primary}` | `#1a1a18` |
| `attachment.meta` | `{text.secondary}` | `#6b6b66` |
| `attachment.radius` | `{radius.md}` | `6px` |

**Do:** Truncate long names with an ellipsis; show size; Make remove keyboard-reachable + labelled; Show type/size errors before send.
**Don't:** Hide that a file is attached; Make remove unreachable by keyboard.
