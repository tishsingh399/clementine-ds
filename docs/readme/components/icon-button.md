# IconButton

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/icon-button/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/IconButton.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/IconButton.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/icon-button.json)

## Overview

An icon-only action for toolbars and row actions; always needs an aria-label and ideally a Tooltip.

Status: `AI-Ready`. Token contract closed at 3 component-tier tokens.

## When to use

- Dense toolbars / row actions
- Compact controls where a label does not fit

## When not to use

- Primary actions with room for a label (use Button)
- When the icon meaning is unclear

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the button |
| `icon` | the glyph |

## Usage guidelines

### Do
- Always set aria-label
- Pair with a Tooltip
- Keep a 44x44 hit area

### Don't
- Ship without an accessible name
- Use an ambiguous icon alone

## Accessibility

| Concern | Requirement |
|---|---|
| Name | aria-label is required (no visible text) |
| Hit area | Minimum 44x44px |
| Focus | Visible focus ring |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `icon-button.fg` | `{text.primary}` | `#1a1a18` |
| `icon-button.bg-hover` | `{surface.subtle}` | `#f3f3f0` |
| `icon-button.border-focus` | `{focus.ring}` | `#f5631a` |

## Library notes

```tsx
import { IconButton } from '@clementine-ds/ui';

<IconButton aria-label="Edit" variant="subtle">✎</IconButton>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
