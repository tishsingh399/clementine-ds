# Card

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/card/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Card.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/card.json)

## Overview

An elevated surface that groups related content into a single scannable unit.

Status: `AI-Ready`. Token contract closed at 7 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/card/index.md).

## Token contract

7 component-tier tokens, defined in `packages/tokens/src/components/card.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `card.bg` | `{surface.elevated}` | `#ffffff` |
| `card.bg-subtle` | `{surface.subtle}` | `#f6f6f4` |
| `card.border` | `{border.default}` | `#d5d3d0` |
| `card.fg.title` | `{text.primary}` | `#2a2926` |
| `card.fg.body` | `{text.secondary}` | `#65635e` |
| `card.radius` | `{radius.lg}` | `8px` |
| `card.shadow` | `{shadow.sm}` | `0 1px 3px rgba(0,0,0,0.08)` |

## Library notes

```tsx
import { Card } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/card/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
