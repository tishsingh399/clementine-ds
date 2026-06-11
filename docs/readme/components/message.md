# Message

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/ai/message/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/Message.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/message.json)

## Overview

A single turn in a chat thread — user, assistant, or system — with timestamp and status.

Status: `AI-Ready`. Token contract closed at 8 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/ai/message/index.md).

## Token contract

8 component-tier tokens, defined in `packages/tokens/src/components/message.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `message.user.bg` | `{action.primary}` | `#2563eb` |
| `message.user.fg` | `{text.on-action}` | `#ffffff` |
| `message.assistant.bg` | `{surface.subtle}` | `#f3f3f0` |
| `message.assistant.fg` | `{text.primary}` | `#1a1a18` |
| `message.system.bg` | `{surface.default}` | `#fafaf8` |
| `message.system.fg` | `{text.secondary}` | `#6b6b66` |
| `message.meta` | `{text.tertiary}` | `#a3a39e` |
| `message.radius` | `{radius.lg}` | `8px` |

## Library notes

```tsx
import { Message } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/ai/message/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
