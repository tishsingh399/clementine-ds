# List

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/list/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/List.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/List.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/list.json)

## Overview

Ordered or unordered lists with consistent markers and spacing.

Status: `AI-Ready`. Token contract closed at 2 component-tier tokens.

## When to use

- Bulleted/numbered content
- Feature/requirement lists

## When not to use

- Key-value pairs (use DescriptionList)
- Tabular data (use Table)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the list |
| `item` | a list item |
| `marker` | bullet/number |

## Usage guidelines

### Do
- Use semantic ul/ol
- Keep items parallel in structure

### Don't
- Fake a list with divs
- Nest deeply

## Accessibility

| Concern | Requirement |
|---|---|
| Semantics | Native list elements convey count + structure |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `list.fg` | `{text.primary}` | `#1a1a18` |
| `list.marker` | `{text.tertiary}` | `#737370` |

## Library notes

```tsx
import { List } from '@clementine-ds/ui';

<List><ListItem>One</ListItem><ListItem>Two</ListItem></List>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
