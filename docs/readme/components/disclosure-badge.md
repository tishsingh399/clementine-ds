# DisclosureBadge

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/disclosure-badge/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/trust/DisclosureBadge.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/disclosure-badge.json)

## Overview

A small, consistent marker that content was produced or assisted by AI.

Status: `AI-Ready`. Token contract closed at 4 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/disclosure-badge/index.md).

## Token contract

4 component-tier tokens, defined in `packages/tokens/src/components/disclosure-badge.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `disclosure.bg` | `{surface.subtle}` | `#f3f3f0` |
| `disclosure.fg` | `{text.secondary}` | `#6b6b66` |
| `disclosure.border` | `{border.default}` | `#e5e5e0` |
| `disclosure.radius` | `{radius.xl}` | `99px` |

## Library notes

```tsx
import { DisclosureBadge } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/disclosure-badge/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
