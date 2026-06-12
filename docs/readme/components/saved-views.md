# SavedViews

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/saved-views/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/SavedViews.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/SavedViews.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/saved-views.json)

## Overview

Switch between saved filter/column configurations, and save the current one.

Status: `AI-Ready` · Enterprise layer. Token contract closed at 2 component-tier tokens.

## When to use

- Reusable table/list configurations
- Team-shared filtered views

## When not to use

- One-off filters
- When there is only a single view

## Anatomy

| Part | Purpose |
|---|---|
| `view` | a saved view |
| `active` | the current view |
| `save` | save-view action |

## Usage guidelines

### Do
- Mark the active view (aria-current)
- Let users save the current config

### Don't
- Lose the active indicator
- Overwrite a shared view without confirm

## Accessibility

| Concern | Requirement |
|---|---|
| Active | aria-current on the selected view |
| Buttons | Each view is a focusable button |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `saved-views.active-fg` | `{action.primary}` | `#2563eb` |
| `saved-views.fg` | `{text.secondary}` | `#6b6b66` |

## Library notes

```tsx
import { SavedViews } from '@clementine-ds/ui';

<SavedViews views={[{ id:'1', name:'My standing access' }]} activeId='1' onSelect={sel} onSave={save} />
```

## Related

- [Data-table pattern](../../patterns/data-table/index.md)
- [Trust, safety & governance](../../governance/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
