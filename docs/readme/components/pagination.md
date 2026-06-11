# Pagination

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/pagination/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Pagination.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/pagination.json)

## Overview

Page navigation for long, chunked result sets; pairs with a results count.

Status: `AI-Ready`. Token contract closed at 7 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/pagination/index.md).

## Token contract

7 component-tier tokens, defined in `packages/tokens/src/components/pagination.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `pagination.item.fg` | `{text.primary}` | `#1a1a18` |
| `pagination.item.bg-active` | `{action.primary}` | `#2563eb` |
| `pagination.item.fg-active` | `{text.on-action}` | `#ffffff` |
| `pagination.item.bg-hover` | `{surface.subtle}` | `#f3f3f0` |
| `pagination.border` | `{border.default}` | `#e5e5e0` |
| `pagination.border-focus` | `{focus.ring}` | `#ff8040` |
| `pagination.radius` | `{radius.md}` | `6px` |

## Library notes

```tsx
import { Pagination } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/pagination/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
