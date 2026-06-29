---
component: conversation-thread
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: [role, aria-live]
model_baseline: claude-opus-4-8

semantic_parts:
  root: the scroll container
  divider: day/section divider

token_contract:
  - conversation-thread.bg
  - conversation-thread.divider

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/ConversationThread.tsx
    underlying_library: custom
    exports: [ConversationThread, ConversationThreadProps]
  storybook:
    path: apps/storybook/stories/ai/ConversationThread.stories.tsx
  tokens:
    component: packages/tokens/src/components/conversation-thread.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: CONVERSATIONTHREAD

> **Implementation:** [`packages/ui/src/components/ai/ConversationThread.tsx`](../../packages/ui/src/components/ai/ConversationThread.tsx).

The scrollable container for a conversation — holds Message turns with consistent spacing and an aria-live log region.

| Token | Resolves through | Light |
|---|---|---|
| `conversation-thread.bg` | `{surface.default}` | `#fafaf8` |
| `conversation-thread.divider` | `{border.default}` | `#e5e5e0` |

**Do:** Announce new turns politely (aria-live); Group with day dividers for long histories; Keep newest in view.
**Don't:** Steal focus on each new message; Reflow the whole thread on append.
