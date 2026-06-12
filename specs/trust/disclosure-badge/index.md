---
component: disclosure-badge
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Trust
tray: 7
required_aria: []

semantic_parts:
  root: The badge

token_contract:
  - disclosure.bg
  - disclosure.fg
  - disclosure.border
  - disclosure.radius

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/trust/DisclosureBadge.tsx
    underlying_library: mantine
    exports: [DisclosureBadge, DisclosureBadgeProps]
  storybook:
    path: apps/storybook/stories/trust/DisclosureBadge.stories.tsx
  tokens:
    component: packages/tokens/src/components/disclosure-badge.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat, data-display]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: DISCLOSURE BADGE

> **Implementation:** [`packages/ui/src/components/trust/DisclosureBadge.tsx`](../../../packages/ui/src/components/trust/DisclosureBadge.tsx). Copy source: [content/disclosure-copy.md](../../../content/disclosure-copy.md).

A small, consistent marker that content was produced or assisted by AI. Disclosure is non-negotiable for AI output; this gives it one reusable form.

| Part | Token | Light |
|---|---|---|
| fill | `disclosure.bg` → `{surface.subtle}` | `#f3f3f0` |
| text | `disclosure.fg` → `{text.secondary}` | `#6b6b66` |
| border | `disclosure.border` → `{border.default}` | `#e5e5e0` |

**Do** keep disclosure visible, not hidden in a tooltip. **Don't** vary the wording per surface — use the canonical strings.
