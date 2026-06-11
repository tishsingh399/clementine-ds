---
component: mention
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Enterprise
required_aria: []

semantic_parts:
  root: the inline reference

token_contract:
  - mention.bg
  - mention.fg

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Mention.tsx
    underlying_library: custom
    exports: [Mention, MentionProps]
  storybook:
    path: apps/storybook/stories/Mention.stories.tsx
  tokens:
    component: packages/tokens/src/components/mention.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [data-table, faceted-search]
pages_used_in: [console, settings]
---

# AGENTIC DOCUMENTATION: MENTION

> **Implementation:** [`packages/ui/src/components/Mention.tsx`](../../packages/ui/src/components/Mention.tsx).

An inline @reference to a user or entity within text.

| Token | Resolves through | Light |
|---|---|---|
| `mention.bg` | `{surface.subtle}` | `#f3f3f0` |
| `mention.fg` | `{text.link}` | `#2563eb` |

**Do:** Make it visually distinct + linkable; Resolve to a real profile when possible.
**Don't:** Style like plain text; Mention unresolved/unknown users silently.
