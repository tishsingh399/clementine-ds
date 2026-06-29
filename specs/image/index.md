---
component: image
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [alt]

semantic_parts:
  root: the img
  fallback: placeholder on load error

token_contract:
  - image.bg
  - image.radius

interaction_states: [loading, loaded, error]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Image.tsx
    underlying_library: mantine
    exports: [Image, ImageProps]
  storybook:
    path: apps/storybook/stories/Image.stories.tsx
  tokens:
    component: packages/tokens/src/components/image.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: IMAGE

> **Implementation:** [`packages/ui/src/components/Image.tsx`](../../packages/ui/src/components/Image.tsx).

A responsive image with a fallback for load errors.

| Token | Resolves through | Light |
|---|---|---|
| `image.bg` | `{surface.subtle}` | `#f3f3f0` |
| `image.radius` | `{radius.md}` | `6px` |

**Do:** Always set alt (empty alt="" only when decorative); Provide a fallback; Set width/height to avoid layout shift.
**Don't:** Omit alt; Stretch/distort aspect ratio.
