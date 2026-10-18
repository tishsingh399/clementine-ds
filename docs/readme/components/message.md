# Message

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/message/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/Message.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/message.json)

## Overview

A single turn in a chat thread — user, assistant, or system — with timestamp and status.

Status: `AI-Ready`. Token contract closed at 8 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/message/index.md).

## Token contract

8 component-tier tokens, defined in `packages/tokens/src/components/message.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `message.user.bg` | `{action.primary}` | `#305eb7` |
| `message.user.fg` | `{text.on-action}` | `#ffffff` |
| `message.assistant.bg` | `{surface.subtle}` | `#f6f6f4` |
| `message.assistant.fg` | `{text.primary}` | `#2a2926` |
| `message.system.bg` | `{surface.default}` | `#fbfbfa` |
| `message.system.fg` | `{text.secondary}` | `#65635e` |
| `message.meta` | `{text.tertiary}` | `#6e6b65` |
| `message.radius` | `{radius.lg}` | `8px` |

## Library notes

```tsx
import { Message } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/message/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
