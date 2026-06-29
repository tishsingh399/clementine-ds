---
component: kbd
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: []

semantic_parts:
  root: a single key cap

token_contract:
  - kbd.bg
  - kbd.fg
  - kbd.border
  - kbd.radius

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Kbd.tsx
    underlying_library: mantine
    exports: [Kbd, KbdProps]
  storybook:
    path: apps/storybook/stories/Kbd.stories.tsx
  tokens:
    component: packages/tokens/src/components/kbd.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: KBD

> **Implementation:** [`packages/ui/src/components/Kbd.tsx`](../../packages/ui/src/components/Kbd.tsx) — wraps Mantine `Kbd`.

Renders a keyboard key or shortcut (⌘, Ctrl, Enter) as a key cap.

| Token | Resolves through | Light |
|---|---|---|
| `kbd.bg` | `{surface.subtle}` | `#f3f3f0` |
| `kbd.fg` | `{text.primary}` | `#1a1a18` |
| `kbd.border` | `{border.strong}` | `#d4d4cf` |
| `kbd.radius` | `{radius.sm}` | `4px` |

**Do:** One key per Kbd; join combos with a "+"; Match the platform (⌘ on mac, Ctrl on win).
**Don't:** Put whole phrases in a Kbd; Use for non-keyboard content.
