# FeedbackControl

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/feedback/feedback-control/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/feedback/FeedbackControl.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/feedback-control.json)

## Overview

Thumbs up/down on an AI response — the first link in the evaluation loop.

Status: `AI-Ready`. Token contract closed at 3 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/feedback/feedback-control/index.md).

## Token contract

3 component-tier tokens, defined in `packages/tokens/src/components/feedback-control.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `feedback-control.idle` | `{text.tertiary}` | `#a3a39e` |
| `feedback-control.positive` | `{feedback.success}` | `#16a34a` |
| `feedback-control.negative` | `{feedback.error}` | `#dc2626` |

## Library notes

```tsx
import { FeedbackControl } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/feedback/feedback-control/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
