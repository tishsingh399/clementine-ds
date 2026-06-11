---
component: spoiler
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [aria-expanded]

semantic_parts:
  root: the content region
  control: show more/less toggle

token_contract:
  - spoiler.control

interaction_states: [collapsed, expanded]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Spoiler.tsx
    underlying_library: mantine
    exports: [Spoiler, SpoilerProps]
  storybook:
    path: apps/storybook/stories/Spoiler.stories.tsx
  tokens:
    component: packages/tokens/src/components/spoiler.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [data-display]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: SPOILER

> **Implementation:** [`packages/ui/src/components/Spoiler.tsx`](../../packages/ui/src/components/Spoiler.tsx) — wraps Mantine `Spoiler`.

Truncate long content to a max height with a show-more/less toggle.

| Token | Resolves through | Light |
|---|---|---|
| `spoiler.control` | `{text.link}` | `#2563eb` |

**Do:** Set a sensible max height; label the toggle clearly; Keep the toggle keyboard-operable.
**Don't:** Hide essential content behind it; Use for navigation.
