---
component: message
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: [aria-busy]
model_baseline: claude-opus-4-8
prompt_version: chat@2026-06-10

semantic_parts:
  root:    The turn row (alignment by role)
  avatar:  Assistant/system identity
  bubble:  The content container
  meta:    Timestamp / status line

token_contract:
  - message.user.bg
  - message.user.fg
  - message.assistant.bg
  - message.assistant.fg
  - message.system.bg
  - message.system.fg
  - message.meta
  - message.radius

interaction_states: [sending, streaming, complete, error]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/Message.tsx
    underlying_library: mantine
    exports: [Message, MessageProps, MessageRole, MessageStatus]
  storybook:
    path: apps/storybook/stories/ai/Message.stories.tsx
  tokens:
    component: packages/tokens/src/components/message.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: MESSAGE

> **Implementation:** [`packages/ui/src/components/ai/Message.tsx`](../../../packages/ui/src/components/ai/Message.tsx).

A single turn in a chat thread. User turns align right on `action.primary`; assistant/system align left on a subtle surface. `status="streaming"` sets `aria-busy`; `error` shows a failure line.

| Part | State | Token | Light |
|---|---|---|---|
| bubble | user | `message.user.bg` / `.fg` | `#2563eb` / `#ffffff` |
| bubble | assistant | `message.assistant.bg` / `.fg` | `#f3f3f0` / `#1a1a18` |
| bubble | system | `message.system.bg` / `.fg` | `#fafaf8` / `#6b6b66` |
| meta | — | `message.meta` | `#a3a39e` |

**Do** keep each message one role/one author. **Don't** carry status by color alone — pair with the meta line ("Failed to send").
