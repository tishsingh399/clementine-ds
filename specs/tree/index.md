---
component: tree
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role, aria-expanded, aria-selected]

semantic_parts:
  root: the tree
  node: a node
  chevron: expand toggle
  guide: indent guide

token_contract:
  - tree.fg
  - tree.bg-selected
  - tree.guide
  - tree.chevron

interaction_states: [collapsed, expanded, selected, focus]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Tree.tsx
    underlying_library: mantine
    exports: [Tree, TreeProps]
  storybook:
    path: apps/storybook/stories/Tree.stories.tsx
  tokens:
    component: packages/tokens/src/components/tree.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: TREE

> **Implementation:** [`packages/ui/src/components/Tree.tsx`](../../packages/ui/src/components/Tree.tsx).

A hierarchical, expandable node list — file trees, org/permission hierarchies, nested resources.

| Token | Resolves through | Light |
|---|---|---|
| `tree.fg` | `{text.primary}` | `#1a1a18` |
| `tree.bg-selected` | `{surface.subtle}` | `#f3f3f0` |
| `tree.guide` | `{border.default}` | `#e5e5e0` |
| `tree.chevron` | `{text.secondary}` | `#6b6b66` |

**Do:** Support keyboard nav (arrows expand/collapse/move); Show selection + expansion clearly.
**Don't:** Hide deep nodes with no affordance; Rely on indentation alone.
