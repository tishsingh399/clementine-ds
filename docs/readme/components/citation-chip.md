# CitationChip

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/ai/citation-chip/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/CitationChip.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/citation-chip.json)

## Overview

Inline provenance — a superscript [n] marker that links to its source.

Status: `AI-Ready`. Token contract closed at 4 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/ai/citation-chip/index.md).

## Token contract

4 component-tier tokens, defined in `packages/tokens/src/components/citation-chip.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `citation.bg` | `{surface.subtle}` | `#f3f3f0` |
| `citation.fg` | `{text.secondary}` | `#6b6b66` |
| `citation.border` | `{border.default}` | `#e5e5e0` |
| `citation.radius` | `{radius.sm}` | `4px` |

## Library notes

```tsx
import { CitationChip } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/ai/citation-chip/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
