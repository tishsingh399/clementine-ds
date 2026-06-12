# Indicator

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/indicator/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Indicator.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Indicator.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/indicator.json)

## Overview

A small dot or count overlaid on another element (avatar, icon, tab) to flag new or pending items.

Status: `AI-Ready`. Token contract closed at 2 component-tier tokens.

## When to use

- Unread counts on an avatar/bell
- New-activity dots on a tab
- Presence/processing state

## When not to use

- Standalone status (use Badge)
- Conveying critical info by dot alone

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the wrapped element |
| `dot` | the overlay dot/count |

## Usage guidelines

### Do
- Give counts an accessible label ("3 unread")
- Cap large counts ("9+")
- Keep the dot from covering meaningful content

### Don't
- Encode meaning in the dot color alone
- Use for long text (that is Badge)

## Accessibility

| Concern | Requirement |
|---|---|
| Label | Counts need an accessible label; a bare dot needs adjacent text |
| Contrast | Dot meets 3:1 against its backdrop |

## Token contract

2 component-tier tokens, defined in `packages/tokens/src/components/indicator.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `indicator.bg` | `{feedback.error}` | `#dc2626` |
| `indicator.fg` | `{text.on-action}` | `#ffffff` |

## Library notes

React: wrapper over Mantine `Indicator`.

```tsx
import { Indicator } from '@clementine-ds/ui';

<Indicator label="3" size={18}><Avatar name="Tina Singh" /></Indicator>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
