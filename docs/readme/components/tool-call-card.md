# ToolCallCard

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/ai/tool-call-card/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/ToolCallCard.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/tool-call-card.json)

## Overview

A transparent record of a tool/function the agent invoked, with status and arguments.

Status: `AI-Ready`. Token contract closed at 9 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/ai/tool-call-card/index.md).

## Token contract

9 component-tier tokens, defined in `packages/tokens/src/components/tool-call-card.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `tool-call.bg` | `{surface.elevated}` | `#ffffff` |
| `tool-call.border` | `{border.default}` | `#e5e5e0` |
| `tool-call.name` | `{text.primary}` | `#1a1a18` |
| `tool-call.args-bg` | `{surface.subtle}` | `#f3f3f0` |
| `tool-call.status.pending` | `{text.tertiary}` | `#a3a39e` |
| `tool-call.status.running` | `{action.primary}` | `#2563eb` |
| `tool-call.status.success` | `{feedback.success}` | `#16a34a` |
| `tool-call.status.error` | `{feedback.error}` | `#dc2626` |
| `tool-call.radius` | `{radius.md}` | `6px` |

## Library notes

```tsx
import { ToolCallCard } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/ai/tool-call-card/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
