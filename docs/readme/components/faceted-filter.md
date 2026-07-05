# FacetedFilter

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/faceted-filter/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/FacetedFilter.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/FacetedFilter.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/faceted-filter.json)

## Overview

Grouped, checkable facets with counts for narrowing a result set.

Status: `AI-Ready` · Enterprise layer. Token contract closed at 3 component-tier tokens.

## When to use

- Filtering large data sets
- Search refinement sidebars

## When not to use

- One-or-two filters (use inline controls)
- Free-text query (use a query builder)

## Anatomy

| Part | Purpose |
|---|---|
| `group` | a facet group |
| `option` | a checkable facet |
| `count` | result count |

## Usage guidelines

### Do
- Show result counts per facet
- Persist selections; allow clearing
- Group related facets

### Don't
- Hide how many results a facet yields
- Reset filters silently

## Accessibility

| Concern | Requirement |
|---|---|
| Groups | Each group labelled; options are checkboxes |
| Counts | Counts are read alongside the option |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `faceted-filter.group-label` | `{text.tertiary}` | `#737370` |
| `faceted-filter.fg` | `{text.primary}` | `#1a1a18` |
| `faceted-filter.count` | `{text.tertiary}` | `#737370` |

## Library notes

```tsx
import { FacetedFilter } from '@clementine-ds/ui';

<FacetedFilter groups={[{ label:'Access', options:[{ value:'standing', label:'Standing', count:37 }] }]} />
```

## Related

- [Data-table pattern](../../patterns/data-table/index.md)
- [Trust, safety & governance](../../governance/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
