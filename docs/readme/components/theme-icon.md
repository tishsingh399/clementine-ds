# ThemeIcon

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/theme-icon/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ThemeIcon.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ThemeIcon.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/theme-icon.json)

## Overview

A filled container that gives an icon a consistent shape and background — for feature bullets, list leading icons, stat tiles.

Status: `AI-Ready`. Token contract closed at 3 component-tier tokens.

## When to use

- Leading icon in a list/row
- Feature or stat bullets
- Giving an icon a branded chip

## When not to use

- A clickable icon (use a Button/ActionIcon)
- Conveying status (use Badge/Indicator)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the filled container |
| `icon` | the glyph inside |

## Usage guidelines

### Do
- Treat as decorative — put the meaning in adjacent text
- Keep size in step with the text it accompanies

### Don't
- Make it the only carrier of meaning
- Use as an interactive control

## Accessibility

| Concern | Requirement |
|---|---|
| Decorative | aria-hidden; the label lives in adjacent text |
| Contrast | Glyph meets contrast against the fill |

## Token contract

3 component-tier tokens, defined in `packages/tokens/src/components/theme-icon.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `theme-icon.bg` | `{action.primary}` | `#2563eb` |
| `theme-icon.fg` | `{text.on-action}` | `#ffffff` |
| `theme-icon.radius` | `{radius.md}` | `6px` |

## Library notes

React: wrapper over Mantine `ThemeIcon`.

```tsx
import { ThemeIcon } from '@clementine-ds/ui';

<ThemeIcon size="lg">★</ThemeIcon>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
