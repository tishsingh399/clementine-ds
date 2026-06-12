---
component: fieldset
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role]

semantic_parts:
  root: the fieldset
  legend: the group title
  body: grouped controls

token_contract:
  - fieldset.bg
  - fieldset.border
  - fieldset.legend
  - fieldset.radius

interaction_states: [default, disabled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Fieldset.tsx
    underlying_library: mantine
    exports: [Fieldset, FieldsetProps]
  storybook:
    path: apps/storybook/stories/Fieldset.stories.tsx
  tokens:
    component: packages/tokens/src/components/fieldset.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [forms]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: FIELDSET

> **Implementation:** [`packages/ui/src/components/Fieldset.tsx`](../../packages/ui/src/components/Fieldset.tsx) — wraps Mantine `Fieldset`.

Visually and semantically group related form controls under a legend.

| Token | Resolves through | Light |
|---|---|---|
| `fieldset.bg` | `{surface.default}` | `#fafaf8` |
| `fieldset.border` | `{border.default}` | `#e5e5e0` |
| `fieldset.legend` | `{text.primary}` | `#1a1a18` |
| `fieldset.radius` | `{radius.md}` | `6px` |

**Do:** Give every fieldset a meaningful legend; Use to chunk long forms into scannable groups.
**Don't:** Nest fieldsets deeply; Use as a generic container (that is Card).
