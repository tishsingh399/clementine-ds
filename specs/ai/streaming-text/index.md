---
component: streaming-text
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: [aria-live, aria-busy]
model_baseline: claude-opus-4-8
prompt_version: chat@2026-06-10

semantic_parts:
  text:  The revealed output so far
  caret: Blinking cursor while streaming

token_contract:
  - streaming.fg
  - streaming.caret
  - streaming.duration

interaction_states: [streaming, done]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/StreamingText.tsx
    underlying_library: none
    exports: [StreamingText, StreamingTextProps]
  storybook:
    path: apps/storybook/stories/ai/StreamingText.stories.tsx
  tokens:
    component: packages/tokens/src/components/streaming-text.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: STREAMING TEXT

> **Implementation:** [`packages/ui/src/components/ai/StreamingText.tsx`](../../../packages/ui/src/components/ai/StreamingText.tsx). Pairs with the `useStreaming` hook ([behaviors](../../../behaviors/README.md)).

Progressively-revealed model output with a blinking caret while streaming. `aria-live="polite"` so screen readers announce updates without interruption; the caret animation is disabled under `prefers-reduced-motion`.

| Part | Token | Light |
|---|---|---|
| text | `streaming.fg` → `{text.primary}` | `#1a1a18` |
| caret | `streaming.caret` → `{action.primary}` | `#2563eb` |
| caret cycle | `streaming.duration` → `{motion.duration-stream}` | `1200ms` |

**Do** announce politely and stop the caret when done. **Don't** animate the caret when the user prefers reduced motion (built-in guard).
