---
component: loader
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role, aria-label]

semantic_parts:
  root: the animated indicator

token_contract:
  - loader.color

interaction_states: [spinning]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Loader.tsx
    underlying_library: mantine
    exports: [Loader, LoaderProps]
  storybook:
    path: apps/storybook/stories/Loader.stories.tsx
  tokens:
    component: packages/tokens/src/components/loader.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: LOADER

> **Implementation:** [`packages/ui/src/components/Loader.tsx`](../../packages/ui/src/components/Loader.tsx) — wraps Mantine `Loader`.

An indeterminate spinner for work of unknown duration. For known progress, use Progress; for content placeholders, use Skeleton.

| Token | Resolves through | Light |
|---|---|---|
| `loader.color` | `{action.primary}` | `#2563eb` |

**Do:** Pair with aria-busy on the region and a text label; Respect prefers-reduced-motion; Keep it brief; escalate to Skeleton/Progress for longer waits.
**Don't:** Use as the only signal for a long operation; Animate when reduced motion is requested.
