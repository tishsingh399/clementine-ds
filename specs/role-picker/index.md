---
component: role-picker
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Enterprise
required_aria: [role, aria-multiselectable]

semantic_parts:
  root: the input
  pill: an assigned role

token_contract:
  - role-picker.pill-bg
  - role-picker.fg

interaction_states: [default, focus, disabled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/RolePicker.tsx
    underlying_library: custom
    exports: [RolePicker, RolePickerProps]
  storybook:
    path: apps/storybook/stories/RolePicker.stories.tsx
  tokens:
    component: packages/tokens/src/components/role-picker.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [data-table, faceted-search]
pages_used_in: [console, settings]
---

# AGENTIC DOCUMENTATION: ROLEPICKER

> **Implementation:** [`packages/ui/src/components/RolePicker.tsx`](../../packages/ui/src/components/RolePicker.tsx).

Assign one or more roles to a user or group (a MultiSelect preset for RBAC).

| Token | Resolves through | Light |
|---|---|---|
| `role-picker.pill-bg` | `{surface.subtle}` | `#f3f3f0` |
| `role-picker.fg` | `{text.primary}` | `#1a1a18` |

**Do:** Offer search for long role lists; Show assigned roles as removable pills; Respect least-privilege defaults.
**Don't:** Default to broad roles; Allow assigning roles the assigner cannot grant.
