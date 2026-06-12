# HITLGate

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/ai/hitl-gate/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/HITLGate.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/hitl-gate.json)

## Overview

A human-in-the-loop checkpoint that pauses an agent before a consequential action runs.

Status: `AI-Ready`. Token contract closed at 8 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/ai/hitl-gate/index.md).

## Token contract

8 component-tier tokens, defined in `packages/tokens/src/components/hitl-gate.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `hitl.bg` | `{feedback.warning-subtle}` | `#fff7ed` |
| `hitl.border` | `{feedback.warning}` | `#f97316` |
| `hitl.title` | `{text.primary}` | `#1a1a18` |
| `hitl.body` | `{text.secondary}` | `#6b6b66` |
| `hitl.approve-bg` | `{action.primary}` | `#2563eb` |
| `hitl.approve-destructive-bg` | `{action.destructive}` | `#dc2626` |
| `hitl.deny-bg` | `{surface.subtle}` | `#f3f3f0` |
| `hitl.radius` | `{radius.md}` | `6px` |

## Library notes

```tsx
import { HITLGate } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/ai/hitl-gate/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
