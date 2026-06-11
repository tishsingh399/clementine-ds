---
component: theme-icon
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [aria-hidden]

semantic_parts:
  root: the filled container
  icon: the glyph inside

token_contract:
  - theme-icon.bg
  - theme-icon.fg
  - theme-icon.radius

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ThemeIcon.tsx
    underlying_library: mantine
    exports: [ThemeIcon, ThemeIconProps]
  storybook:
    path: apps/storybook/stories/ThemeIcon.stories.tsx
  tokens:
    component: packages/tokens/src/components/theme-icon.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: THEMEICON

> **Implementation:** [`packages/ui/src/components/ThemeIcon.tsx`](../../packages/ui/src/components/ThemeIcon.tsx) — wraps Mantine `ThemeIcon`.

A filled container that gives an icon a consistent shape and background — for feature bullets, list leading icons, stat tiles.

| Token | Resolves through | Light |
|---|---|---|
| `theme-icon.bg` | `{action.primary}` | `#2563eb` |
| `theme-icon.fg` | `{text.on-action}` | `#ffffff` |
| `theme-icon.radius` | `{radius.md}` | `6px` |

**Do:** Treat as decorative — put the meaning in adjacent text; Keep size in step with the text it accompanies.
**Don't:** Make it the only carrier of meaning; Use as an interactive control.
