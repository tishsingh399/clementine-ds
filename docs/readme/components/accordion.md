# Accordion

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/accordion/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Accordion.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/accordion.json)

## Overview

Progressive disclosure for a stack of independent, collapsible sections.

Status: `AI-Ready`. Token contract closed at 8 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/accordion/index.md).

## Token contract

8 component-tier tokens, defined in `packages/tokens/src/components/accordion.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `accordion.bg` | `{surface.default}` | `#fafaf8` |
| `accordion.bg-hover` | `{surface.subtle}` | `#f3f3f0` |
| `accordion.border` | `{border.default}` | `#e5e5e0` |
| `accordion.fg.label` | `{text.primary}` | `#1a1a18` |
| `accordion.fg.content` | `{text.secondary}` | `#6b6b66` |
| `accordion.fg.chevron` | `{text.secondary}` | `#6b6b66` |
| `accordion.border-focus` | `{focus.ring}` | `#ff8040` |
| `accordion.radius` | `{radius.md}` | `6px` |

## Library notes

```tsx
import { Accordion } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/accordion/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
