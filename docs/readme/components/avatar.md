# Avatar

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/avatar/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Avatar.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/avatar.json)

## Overview

A user or entity's visual identity — image, initials, or a neutral fallback — with an overlapping group variant.

Status: `AI-Ready`. Token contract closed at 5 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/avatar/index.md).

## Token contract

5 component-tier tokens, defined in `packages/tokens/src/components/avatar.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `avatar.bg` | `{surface.subtle}` | `#f3f3f0` |
| `avatar.fg` | `{text.secondary}` | `#6b6b66` |
| `avatar.border` | `{border.default}` | `#e5e5e0` |
| `avatar.ring` | `{focus.ring}` | `#f5631a` |
| `avatar.radius` | `{radius.xl}` | `99px` |

## Library notes

```tsx
import { Avatar } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/avatar/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
