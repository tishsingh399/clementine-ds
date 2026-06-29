---
component: rbac-matrix
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Enterprise
required_aria: [role, aria-label]

semantic_parts:
  header: role columns
  row: a permission
  cell: a grant checkbox

token_contract:
  - rbac-matrix.header-bg
  - rbac-matrix.border
  - rbac-matrix.granted
  - rbac-matrix.fg

interaction_states: [granted, denied]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/RbacMatrix.tsx
    underlying_library: custom
    exports: [RbacMatrix, RbacMatrixProps]
  storybook:
    path: apps/storybook/stories/RbacMatrix.stories.tsx
  tokens:
    component: packages/tokens/src/components/rbac-matrix.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [data-table, faceted-search]
pages_used_in: [console, settings]
---

# AGENTIC DOCUMENTATION: RBACMATRIX

> **Implementation:** [`packages/ui/src/components/RbacMatrix.tsx`](../../packages/ui/src/components/RbacMatrix.tsx).

A role x permission grid of checkboxes for least-privilege access management.

| Token | Resolves through | Light |
|---|---|---|
| `rbac-matrix.header-bg` | `{surface.subtle}` | `#f3f3f0` |
| `rbac-matrix.border` | `{border.default}` | `#e5e5e0` |
| `rbac-matrix.granted` | `{action.primary}` | `#2563eb` |
| `rbac-matrix.fg` | `{text.primary}` | `#1a1a18` |

**Do:** Label each cell (role can permission); Make least-privilege the default; Log grant changes.
**Don't:** Default to broad grants; Leave cells unlabelled for AT.
