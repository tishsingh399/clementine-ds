# Pill

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/pill/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Pill.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Pill.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/pill.json)

## Overview

A compact, often-removable token representing a selected value or applied filter.

Status: `AI-Ready`. Token contract closed at 4 component-tier tokens.

## When to use

- Selected values inside an input
- Applied filters
- Token lists

## When not to use

- Read-only status (use Badge)
- Toggleable choice (use Chip)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the pill |
| `label` | text |
| `remove` | remove button |

## Usage guidelines

### Do
- Make remove keyboard-reachable + labelled
- Truncate long values

### Don't
- Use for status (Badge) or actions (Button)

## Accessibility

| Concern | Requirement |
|---|---|
| Remove | Remove control labelled "Remove <value>" |
| Group | PillGroup associates the set |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `pill.bg` | `{surface.subtle}` | `#f3f3f0` |
| `pill.fg` | `{text.primary}` | `#1a1a18` |
| `pill.remove` | `{text.secondary}` | `#6b6b66` |
| `pill.radius` | `{radius.xl}` | `99px` |

## Library notes

```tsx
import { Pill } from '@clementine-ds/ui';

<Pill withRemoveButton>prod</Pill>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
