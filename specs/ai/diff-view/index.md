---
component: diff-view
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: []
model_baseline: claude-opus-4-8

semantic_parts:
  line: a diff line
  footer: accept/reject controls

token_contract:
  - diff.added-bg
  - diff.removed-bg
  - diff.fg
  - diff.gutter

interaction_states: [added, removed, context]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/DiffView.tsx
    underlying_library: custom
    exports: [DiffView, DiffViewProps, DiffLine]
  storybook:
    path: apps/storybook/stories/ai/DiffView.stories.tsx
  tokens:
    component: packages/tokens/src/components/diff-view.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: DIFFVIEW

> **Implementation:** [`packages/ui/src/components/ai/DiffView.tsx`](../../../packages/ui/src/components/ai/DiffView.tsx).

A proposed change shown as added/removed lines with accept/reject — pairs with an agent suggesting an edit.

| Token | Resolves through | Light |
|---|---|---|
| `diff.added-bg` | `{feedback.success-subtle}` | `#f0fdf4` |
| `diff.removed-bg` | `{feedback.error-subtle}` | `#fef2f2` |
| `diff.fg` | `{text.primary}` | `#1a1a18` |
| `diff.gutter` | `{border.default}` | `#e5e5e0` |

**Do:** Mark add/remove with sign + color (not color alone); Offer per-change accept/reject.
**Don't:** Apply changes silently; Use color as the only signal.
