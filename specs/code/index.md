---
component: code
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: []

semantic_parts:
  root: inline or block monospace

token_contract:
  - code.bg
  - code.fg
  - code.radius

interaction_states: [inline, block]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Code.tsx
    underlying_library: mantine
    exports: [Code, CodeProps]
  storybook:
    path: apps/storybook/stories/Code.stories.tsx
  tokens:
    component: packages/tokens/src/components/code.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: CODE

> **Implementation:** [`packages/ui/src/components/Code.tsx`](../../packages/ui/src/components/Code.tsx) — wraps Mantine `Code`.

Monospace formatting for code, commands, and literal values — inline or as a block.

| Token | Resolves through | Light |
|---|---|---|
| `code.bg` | `{surface.subtle}` | `#f3f3f0` |
| `code.fg` | `{text.primary}` | `#1a1a18` |
| `code.radius` | `{radius.sm}` | `4px` |

**Do:** Use inline for short literals, block for multi-line; Keep blocks short; lift big output into an ArtifactFrame.
**Don't:** Use for emphasis; Put paragraphs of prose in Code.
