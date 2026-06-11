---
component: sources-panel
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: []
model_baseline: claude-opus-4-8

semantic_parts:
  root: the panel
  title: panel heading
  item: a source row
  index: the [n] marker

token_contract:
  - sources.bg
  - sources.border
  - sources.title
  - sources.item-fg
  - sources.item-meta
  - sources.index-bg
  - sources.radius

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/SourcesPanel.tsx
    underlying_library: mantine
    exports: [SourcesPanel, SourcesPanelProps, Source]
  storybook:
    path: apps/storybook/stories/ai/SourcesPanel.stories.tsx
  tokens:
    component: packages/tokens/src/components/sources-panel.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: SOURCESPANEL

> **Implementation:** [`packages/ui/src/components/ai/SourcesPanel.tsx`](../../../packages/ui/src/components/ai/SourcesPanel.tsx).

The provenance list behind a cited answer; pairs with inline CitationChip [n] markers.

| Token | Resolves through | Light |
|---|---|---|
| `sources.bg` | `{surface.elevated}` | `#ffffff` |
| `sources.border` | `{border.default}` | `#e5e5e0` |
| `sources.title` | `{text.tertiary}` | `#a3a39e` |
| `sources.item-fg` | `{text.link}` | `#2563eb` |
| `sources.item-meta` | `{text.secondary}` | `#6b6b66` |
| `sources.index-bg` | `{surface.subtle}` | `#f3f3f0` |
| `sources.radius` | `{radius.md}` | `6px` |

**Do:** Number sources to match inline [n] chips; Link to the real source; show a snippet; Keep it collapsible for long lists.
**Don't:** Fabricate sources; Link to a page that does not support the claim.
