# ReasoningTrace

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/reasoning-trace/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/ReasoningTrace.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/reasoning-trace.json)

## Overview

A collapsible, de-emphasized view of the model's intermediate thinking.

Status: `AI-Ready`. Token contract closed at 5 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/reasoning-trace/index.md).

## Token contract

5 component-tier tokens, defined in `packages/tokens/src/components/reasoning-trace.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `reasoning.bg` | `{surface.subtle}` | `#f3f3f0` |
| `reasoning.fg` | `{text.secondary}` | `#6b6b66` |
| `reasoning.label` | `{text.tertiary}` | `#737370` |
| `reasoning.rule` | `{border.default}` | `#e5e5e0` |
| `reasoning.radius` | `{radius.md}` | `6px` |

## Library notes

```tsx
import { ReasoningTrace } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/reasoning-trace/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
