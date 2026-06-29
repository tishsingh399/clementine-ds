---
component: export-menu
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Enterprise
required_aria: [aria-haspopup, aria-expanded]

semantic_parts:
  trigger: export button
  dropdown: format list

token_contract:
  - export-menu.trigger-fg
  - export-menu.item-fg

interaction_states: [closed, open]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ExportMenu.tsx
    underlying_library: custom
    exports: [ExportMenu, ExportMenuProps]
  storybook:
    path: apps/storybook/stories/ExportMenu.stories.tsx
  tokens:
    component: packages/tokens/src/components/export-menu.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [data-table, faceted-search]
pages_used_in: [console, settings]
---

# AGENTIC DOCUMENTATION: EXPORTMENU

> **Implementation:** [`packages/ui/src/components/ExportMenu.tsx`](../../packages/ui/src/components/ExportMenu.tsx).

A dropdown of export formats (CSV, JSON, PDF) for a data view.

| Token | Resolves through | Light |
|---|---|---|
| `export-menu.trigger-fg` | `{text.primary}` | `#1a1a18` |
| `export-menu.item-fg` | `{text.primary}` | `#1a1a18` |

**Do:** List supported formats clearly; Disable formats that are not applicable.
**Don't:** Offer formats that will fail; Hide the format choice behind a guess.
