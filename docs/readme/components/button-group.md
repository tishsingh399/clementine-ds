# ButtonGroup

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/button-group/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ButtonGroup.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ButtonGroup.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/button-group.json)

## Overview

Joins a set of related buttons into one visually-connected control.

Status: `AI-Ready`. Token contract closed at 1 component-tier tokens.

## When to use

- Segmented actions (Day/Week/Month)
- Toolbar action clusters

## When not to use

- Unrelated buttons (space them apart)
- Mutually-exclusive choice (use SegmentedControl)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the group |
| `button` | a member button |

## Usage guidelines

### Do
- Keep members the same size/variant
- Limit to a few buttons

### Don't
- Mix variants within a group
- Cram many buttons

## Accessibility

| Concern | Requirement |
|---|---|
| Grouping | Members read as related; each keeps its own label |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `button-group.divider` | `{border.strong}` | `#d4d4cf` |

## Library notes

```tsx
import { ButtonGroup } from '@clementine-ds/ui';

<ButtonGroup><Button>Day</Button><Button>Week</Button></ButtonGroup>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
