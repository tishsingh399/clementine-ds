# Divider

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/divider/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Divider.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Divider.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/divider.json)

## Overview

A thin rule that separates content groups, optionally with a centered or aligned label.

Status: `AI-Ready`. Token contract closed at 2 component-tier tokens.

## When to use

- Separate sections in a menu or form
- An "or" divider between choices
- Group rows in dense lists

## When not to use

- Add visual rhythm — use spacing
- Between every single item (noise)

## Anatomy

| Part | Purpose |
|---|---|
| `line` | the rule |
| `label` | optional inline label |

## Usage guidelines

### Do
- Use spacing first; reach for a line only when grouping is ambiguous
- Label it when the split has meaning ("or")

### Don't
- Stack multiple dividers
- Use as a decorative flourish

## Accessibility

| Concern | Requirement |
|---|---|
| Role | Decorative dividers are aria-hidden; labelled/separating ones use role="separator" |
| Orientation | aria-orientation set for vertical dividers |

## Token contract

2 component-tier tokens, defined in `packages/tokens/src/components/divider.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `divider.line` | `{border.default}` | `#e5e5e0` |
| `divider.label` | `{text.tertiary}` | `#a3a39e` |

## Library notes

React: wrapper over Mantine `Divider`.

```tsx
import { Divider } from '@clementine-ds/ui';

<Divider label="Or" labelPosition="center" />
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
