---
component: audit-log-viewer
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Enterprise
required_aria: [role, scope]

semantic_parts:
  header: columns
  row: an audit entry
  actor: principal
  target: object

token_contract:
  - audit-log-viewer.header-bg
  - audit-log-viewer.row-striped
  - audit-log-viewer.fg
  - audit-log-viewer.meta
  - audit-log-viewer.border

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/AuditLogViewer.tsx
    underlying_library: custom
    exports: [AuditLogViewer, AuditLogViewerProps, AuditEntry]
  storybook:
    path: apps/storybook/stories/AuditLogViewer.stories.tsx
  tokens:
    component: packages/tokens/src/components/audit-log-viewer.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [data-table, faceted-search]
pages_used_in: [console, settings]
---

# AGENTIC DOCUMENTATION: AUDITLOGVIEWER

> **Implementation:** [`packages/ui/src/components/AuditLogViewer.tsx`](../../packages/ui/src/components/AuditLogViewer.tsx).

A chronological, attributable record of actions — who did what to what, when.

| Token | Resolves through | Light |
|---|---|---|
| `audit-log-viewer.header-bg` | `{surface.subtle}` | `#f3f3f0` |
| `audit-log-viewer.row-striped` | `{surface.default}` | `#fafaf8` |
| `audit-log-viewer.fg` | `{text.primary}` | `#1a1a18` |
| `audit-log-viewer.meta` | `{text.tertiary}` | `#a3a39e` |
| `audit-log-viewer.border` | `{border.default}` | `#e5e5e0` |

**Do:** Attribute every entry to a principal; Make it sortable/filterable + exportable; Keep timestamps precise.
**Don't:** Allow unattributable entries; Mutate/hide log rows.
