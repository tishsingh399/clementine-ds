# Drawer

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/drawer/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Drawer.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/drawer.json)

## Overview

A panel that slides in from a screen edge for a secondary task without leaving the page.

Status: `AI-Ready`. Token contract closed at 6 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/drawer/index.md).

## Token contract

6 component-tier tokens, defined in `packages/tokens/src/components/drawer.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `drawer.bg` | `{surface.elevated}` | `#ffffff` |
| `drawer.overlay` | `{surface.overlay}` | `rgba(0,0,0,0.4)` |
| `drawer.border` | `{border.default}` | `#e5e5e0` |
| `drawer.fg.title` | `{text.primary}` | `#1a1a18` |
| `drawer.fg.body` | `{text.secondary}` | `#6b6b66` |
| `drawer.radius` | `{radius.lg}` | `8px` |

## Library notes

```tsx
import { Drawer } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/drawer/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
