# HITLGate

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/hitl-gate/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/HITLGate.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/hitl-gate.json)

## Overview

A human-in-the-loop checkpoint that pauses an agent before a consequential action runs.

Status: `AI-Ready`. Token contract closed at 8 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/hitl-gate/index.md).

## Token contract

8 component-tier tokens, defined in `packages/tokens/src/components/hitl-gate.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `hitl.bg` | `{feedback.warning-subtle}` | `#ffebcf` |
| `hitl.border` | `{feedback.warning}` | `#855905` |
| `hitl.title` | `{text.primary}` | `#2a2926` |
| `hitl.body` | `{text.secondary}` | `#65635e` |
| `hitl.approve-bg` | `{action.primary}` | `#305eb7` |
| `hitl.approve-destructive-bg` | `{action.destructive}` | `#c1332f` |
| `hitl.deny-bg` | `{surface.subtle}` | `#f6f6f4` |
| `hitl.radius` | `{radius.md}` | `6px` |

## Library notes

```tsx
import { HITLGate } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/hitl-gate/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
