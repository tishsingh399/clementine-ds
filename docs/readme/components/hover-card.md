# HoverCard

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/hover-card/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/HoverCard.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/HoverCard.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/hover-card.json)

## Overview

Reveal supplementary, non-interactive detail on hover/focus — a richer Tooltip (avatar preview, definition, stats).

Status: `AI-Ready`. Token contract closed at 4 component-tier tokens.

## When to use

- Preview detail on hover (user card, link preview)
- Read-only enrichment

## When not to use

- Interactive content the user must reach (use Popover)
- Touch-primary surfaces (no hover)
- Critical info (hover is missable)

## Anatomy

| Part | Purpose |
|---|---|
| `target` | the hovered element |
| `dropdown` | the floating card |

## Usage guidelines

### Do
- Open on hover AND focus; small open delay
- Keep content read-only and brief
- Provide the same info elsewhere for touch/SR

### Don't
- Put buttons/links inside (use Popover)
- Rely on it as the only path to the info

## Accessibility

| Concern | Requirement |
|---|---|
| Trigger | Opens on hover + keyboard focus |
| Content | Read-only; not focus-trapped |
| Fallback | Info is reachable without hover for touch/SR |

## Token contract

4 component-tier tokens, defined in `packages/tokens/src/components/hover-card.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `hover-card.bg` | `{surface.elevated}` | `#ffffff` |
| `hover-card.border` | `{border.default}` | `#e5e5e0` |
| `hover-card.shadow` | `{shadow.lg}` | `0 8px 24px rgba(0,0,0,0.16)` |
| `hover-card.radius` | `{radius.md}` | `6px` |

## Library notes

React: wrapper over Mantine `HoverCard`.

```tsx
import { HoverCard } from '@clementine-ds/ui';

<HoverCard><HoverCardTarget><Button>Preview</Button></HoverCardTarget><HoverCardDropdown>…</HoverCardDropdown></HoverCard>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
