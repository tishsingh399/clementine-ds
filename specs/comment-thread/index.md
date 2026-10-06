---
component: comment-thread
ds_version: clementine-ds@0.1.0 (2026-10-06 verified)
status: AI-Ready
last_verified: 2026-10-06
verified_commit: 015819c0
verified_by: [contract, honesty, token-parity, runtime-tokens, painted-dom]

category: Enterprise
required_aria: []

semantic_parts:
  comment: one comment
  composer: add-comment input

token_contract:
  - comment-thread.author
  - comment-thread.body
  - comment-thread.meta

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/CommentThread.tsx
    underlying_library: custom
    exports: [CommentThread, CommentThreadProps, Comment]
  storybook:
    path: apps/storybook/stories/CommentThread.stories.tsx
  tokens:
    component: packages/tokens/src/components/comment-thread.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [data-table, faceted-search]
pages_used_in: [console, settings]
---

# AGENTIC DOCUMENTATION: COMMENTTHREAD

> **Implementation:** [`packages/ui/src/components/CommentThread.tsx`](../../packages/ui/src/components/CommentThread.tsx).

A list of comments plus a composer for adding more.

| Token | Resolves through | Light |
|---|---|---|
| `comment-thread.author` | `{text.primary}` | `#1a1a18` |
| `comment-thread.body` | `{text.primary}` | `#1a1a18` |
| `comment-thread.meta` | `{text.tertiary}` | `#737370` |

**Do:** Attribute + timestamp each comment; Support @mentions; Disable submit on empty.
**Don't:** Lose draft text; Allow empty comments.
