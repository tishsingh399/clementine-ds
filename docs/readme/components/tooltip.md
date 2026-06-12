# Tooltip

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/tooltip/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Tooltip.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/tooltip.json)

## Overview

Short, supplementary text revealed on hover or keyboard focus; describes a control via aria-describedby.

Status: `AI-Ready`. Token contract closed at 5 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/tooltip/index.md).

## Token contract

5 component-tier tokens, defined in `packages/tokens/src/components/tooltip.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `tooltip.bg` | `{text.primary}` | `#1a1a18` |
| `tooltip.fg` | `{text.on-action}` | `#ffffff` |
| `tooltip.border` | `{text.primary}` | `#1a1a18` |
| `tooltip.radius` | `{radius.sm}` | `4px` |
| `tooltip.shadow` | `{shadow.md}` | `0 4px 6px -1px rgba(0,0,0,0.1)` |

## Library notes

```tsx
import { Tooltip } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/tooltip/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
