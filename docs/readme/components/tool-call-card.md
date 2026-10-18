# ToolCallCard

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/tool-call-card/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/ToolCallCard.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/tool-call-card.json)

## Overview

A transparent record of a tool/function the agent invoked, with status and arguments.

Status: `AI-Ready`. Token contract closed at 9 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/tool-call-card/index.md).

## Token contract

9 component-tier tokens, defined in `packages/tokens/src/components/tool-call-card.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `tool-call.bg` | `{surface.elevated}` | `#ffffff` |
| `tool-call.border` | `{border.default}` | `#d5d3d0` |
| `tool-call.name` | `{text.primary}` | `#2a2926` |
| `tool-call.args-bg` | `{surface.subtle}` | `#efeeec` |
| `tool-call.status.pending` | `{text.tertiary}` | `#6e6b65` |
| `tool-call.status.running` | `{action.primary}` | `#305eb7` |
| `tool-call.status.success` | `{feedback.success}` | `#198044` |
| `tool-call.status.error` | `{feedback.error}` | `#c1332f` |
| `tool-call.radius` | `{radius.md}` | `6px` |

## Library notes

```tsx
import { ToolCallCard } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/tool-call-card/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
