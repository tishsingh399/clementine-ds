# Fab

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/fab/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Fab.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Fab.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/fab.json)

## Overview

A floating action button for the single primary action on a surface (e.g. New).

Status: `AI-Ready`. Token contract closed at 4 component-tier tokens.

## When to use

- One clear primary action on a screen
- Mobile-style create actions

## When not to use

- Multiple competing actions
- Secondary actions

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the floating button |
| `icon` | the glyph |

## Usage guidelines

### Do
- One FAB per screen; set aria-label
- Keep it out of the way of content
- Use a clear, single-purpose icon

### Don't
- Stack multiple FABs
- Use for secondary actions

## Accessibility

| Concern | Requirement |
|---|---|
| Name | aria-label required (icon-only) |
| Reach | Does not obscure interactive content |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `fab.bg` | `{action.primary}` | `#2563eb` |
| `fab.fg` | `{text.on-action}` | `#ffffff` |
| `fab.shadow` | `{shadow.lg}` | `0 8px 24px rgba(0,0,0,0.16)` |
| `fab.radius` | `{radius.xl}` | `99px` |

## Library notes

```tsx
import { Fab } from '@clementine-ds/ui';

<Fab aria-label="New session">+</Fab>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
