# Accordion

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/accordion/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Accordion.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/accordion.json)

## Overview

Progressive disclosure for a stack of independent, collapsible sections.

Status: `AI-Ready`. Token contract closed at 8 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/accordion/index.md).

## Token contract

8 component-tier tokens, defined in `packages/tokens/src/components/accordion.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `accordion.bg` | `{surface.default}` | `#fbfbfa` |
| `accordion.bg-hover` | `{surface.subtle}` | `#f6f6f4` |
| `accordion.border` | `{border.default}` | `#d5d3d0` |
| `accordion.fg.label` | `{text.primary}` | `#2a2926` |
| `accordion.fg.content` | `{text.secondary}` | `#65635e` |
| `accordion.fg.chevron` | `{text.secondary}` | `#65635e` |
| `accordion.border-focus` | `{focus.ring}` | `#e86800` |
| `accordion.radius` | `{radius.md}` | `6px` |

## Library notes

```tsx
import { Accordion } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/accordion/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
