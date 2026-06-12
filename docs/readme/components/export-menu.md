# ExportMenu

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/export-menu/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ExportMenu.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ExportMenu.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/export-menu.json)

## Overview

A dropdown of export formats (CSV, JSON, PDF) for a data view.

Status: `AI-Ready` · Enterprise layer. Token contract closed at 2 component-tier tokens.

## When to use

- Exporting tables/reports
- Multiple output formats

## When not to use

- A single export action (use a Button)
- In-app share (use a share control)

## Anatomy

| Part | Purpose |
|---|---|
| `trigger` | export button |
| `dropdown` | format list |

## Usage guidelines

### Do
- List supported formats clearly
- Disable formats that are not applicable

### Don't
- Offer formats that will fail
- Hide the format choice behind a guess

## Accessibility

| Concern | Requirement |
|---|---|
| Trigger | aria-haspopup + aria-expanded |
| Items | Each format is a menu item |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `export-menu.trigger-fg` | `{text.primary}` | `#1a1a18` |
| `export-menu.item-fg` | `{text.primary}` | `#1a1a18` |

## Library notes

```tsx
import { ExportMenu } from '@clementine-ds/ui';

<ExportMenu onExport={(f) => download(f)} />
```

## Related

- [Data-table pattern](../../patterns/data-table/index.md)
- [Trust, safety & governance](../../governance/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
