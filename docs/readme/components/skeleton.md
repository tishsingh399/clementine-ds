# Skeleton

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/skeleton/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Skeleton.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/skeleton.json)

## Overview

A placeholder that mimics the shape of content while it loads, reducing layout shift.

Status: `AI-Ready`. Token contract closed at 4 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/skeleton/index.md).

## Token contract

4 component-tier tokens, defined in `packages/tokens/src/components/skeleton.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `skeleton.base` | `{surface.subtle}` | `#f3f3f0` |
| `skeleton.highlight` | `{surface.default}` | `#fafaf8` |
| `skeleton.duration` | `{motion.duration-stream}` | `1200ms` |
| `skeleton.radius` | `{radius.md}` | `6px` |

## Library notes

```tsx
import { Skeleton } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/skeleton/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
