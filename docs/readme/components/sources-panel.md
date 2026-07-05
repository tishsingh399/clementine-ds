# SourcesPanel

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/sources-panel/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/SourcesPanel.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ai/SourcesPanel.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/sources-panel.json)

## Overview

The provenance list behind a cited answer; pairs with inline CitationChip [n] markers.

Status: `AI-Ready` · Tray 4 (AI surface). Token contract closed at 7 component-tier tokens.

## When to use

- Showing where a sourced answer came from
- RAG / retrieval results
- Audit of an AI claim

## When not to use

- Unsourced chit-chat
- When no real sources exist

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the panel |
| `title` | panel heading |
| `item` | a source row |
| `index` | the [n] marker |

## Usage guidelines

### Do
- Number sources to match inline [n] chips
- Link to the real source; show a snippet
- Keep it collapsible for long lists

### Don't
- Fabricate sources
- Link to a page that does not support the claim

## Accessibility

| Concern | Requirement |
|---|---|
| Links | Each source is a real, focusable link |
| Markers | Index numbers map to inline citations |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `sources.bg` | `{surface.elevated}` | `#ffffff` |
| `sources.border` | `{border.default}` | `#e5e5e0` |
| `sources.title` | `{text.tertiary}` | `#737370` |
| `sources.item-fg` | `{text.link}` | `#2563eb` |
| `sources.item-meta` | `{text.secondary}` | `#6b6b66` |
| `sources.index-bg` | `{surface.subtle}` | `#f3f3f0` |
| `sources.radius` | `{radius.md}` | `6px` |

## Library notes

```tsx
import { SourcesPanel } from '@clementine-ds/ui';

<SourcesPanel sources={[{ index:1, title:'retention-policy.md', url:'#' }]} />
```

## Related

- [Behavior & state model](../../../behaviors/README.md)
- [Content & language](../../../content/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
