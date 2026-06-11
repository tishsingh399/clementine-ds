---
component: anchor
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role]

semantic_parts:
  root: the native <a> element
  label: link text

token_contract:
  - anchor.fg
  - anchor.fg-hover

interaction_states: [default, hover, focus, visited]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Anchor.tsx
    underlying_library: mantine
    exports: [Anchor, AnchorProps]
  storybook:
    path: apps/storybook/stories/Anchor.stories.tsx
  tokens:
    component: packages/tokens/src/components/anchor.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: ANCHOR

> **Implementation:** [`packages/ui/src/components/Anchor.tsx`](../../packages/ui/src/components/Anchor.tsx) — wraps Mantine `Anchor`.

A text link for navigation. Distinct from Button (which performs an action).

| Token | Resolves through | Light |
|---|---|---|
| `anchor.fg` | `{text.link}` | `#2563eb` |
| `anchor.fg-hover` | `{action.primary}` | `#2563eb` |

**Do:** Underline on hover/focus — never color alone (WCAG 1.4.1); Use descriptive link text ("access policy", not "click here"); Add rel="noopener" on target="_blank".
**Don't:** Style a Button as a link or vice versa; Use "here"/"link" as the text; Convey state with color only.
