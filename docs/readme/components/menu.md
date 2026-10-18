# Menu

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/menu/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Menu.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/menu.json)

## Overview

A dropdown list of actions triggered by a control; roving focus, destructive items in danger color.

Status: `AI-Ready`. Token contract closed at 9 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/menu/index.md).

## Token contract

9 component-tier tokens, defined in `packages/tokens/src/components/menu.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `menu.bg` | `{surface.elevated}` | `#ffffff` |
| `menu.border` | `{border.default}` | `#d5d3d0` |
| `menu.shadow` | `{shadow.lg}` | `0 8px 24px rgba(0,0,0,0.16)` |
| `menu.radius` | `{radius.md}` | `6px` |
| `menu.item.fg` | `{text.primary}` | `#2a2926` |
| `menu.item.fg-danger` | `{feedback.error}` | `#c1332f` |
| `menu.item.bg-hover` | `{surface.subtle}` | `#f6f6f4` |
| `menu.label` | `{text.secondary}` | `#65635e` |
| `menu.divider` | `{border.default}` | `#d5d3d0` |

## Library notes

```tsx
import { Menu } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/menu/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
