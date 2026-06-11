# BulkActionBar

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/bulk-action-bar/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/BulkActionBar.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/BulkActionBar.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/bulk-action-bar.json)

## Overview

Appears when table rows are selected: shows the count and the bulk actions available.

Status: `AI-Ready` · Enterprise layer. Token contract closed at 3 component-tier tokens.

## When to use

- Multi-select tables/lists
- Batch operations on records

## When not to use

- Single-row actions (use a row menu)
- When nothing is selected

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the bar |
| `count` | selection count |
| `actions` | bulk actions |

## Usage guidelines

### Do
- Show the count; offer Clear
- Gate destructive bulk actions behind a confirm
- Pair with undo

### Don't
- Hide what is selected
- Run destructive bulk actions with no confirm

## Accessibility

| Concern | Requirement |
|---|---|
| Region | Labelled region announcing the count |
| Actions | Each bulk action is a labelled control |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `bulk-action-bar.bg` | `{surface.subtle}` | `#f3f3f0` |
| `bulk-action-bar.border` | `{border.default}` | `#e5e5e0` |
| `bulk-action-bar.fg` | `{text.primary}` | `#1a1a18` |

## Library notes

```tsx
import { BulkActionBar } from '@clementine-ds/ui';

<BulkActionBar count={3} onClear={clear} actions={<Button size="xs">Revoke</Button>} />
```

## Related

- [Data-table pattern](../../patterns/data-table/index.md)
- [Trust, safety & governance](../../governance/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
