# StreamingText

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/streaming-text/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/StreamingText.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/streaming-text.json)

## Overview

Progressively-revealed model output with a blinking caret while streaming.

Status: `AI-Ready`. Token contract closed at 3 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/streaming-text/index.md).

## Token contract

3 component-tier tokens, defined in `packages/tokens/src/components/streaming-text.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `streaming.fg` | `{text.primary}` | `#1a1a18` |
| `streaming.caret` | `{action.primary}` | `#2563eb` |
| `streaming.duration` | `{motion.duration-stream}` | `1200ms` |

## Library notes

```tsx
import { StreamingText } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/streaming-text/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
