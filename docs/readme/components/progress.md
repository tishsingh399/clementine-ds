# Progress

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/progress/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Progress.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/progress.json)

## Overview

A determinate bar showing how far a known task has progressed.

Status: `AI-Ready`. Token contract closed at 6 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/progress/index.md).

## Token contract

6 component-tier tokens, defined in `packages/tokens/src/components/progress.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `progress.track` | `{surface.subtle}` | `#efeeec` |
| `progress.bar` | `{action.primary}` | `#305eb7` |
| `progress.bar-success` | `{feedback.success}` | `#198044` |
| `progress.bar-warning` | `{feedback.warning}` | `#855905` |
| `progress.bar-error` | `{feedback.error}` | `#c1332f` |
| `progress.radius` | `{radius.xl}` | `99px` |

## Library notes

```tsx
import { Progress } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/progress/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
