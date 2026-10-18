# Autocomplete

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/autocomplete/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Autocomplete.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/autocomplete.json)

## Overview

A text input that suggests matching options as you type while still allowing free text (combobox).

Status: `AI-Ready`. Token contract closed at 8 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/autocomplete/index.md).

## Token contract

8 component-tier tokens, defined in `packages/tokens/src/components/autocomplete.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `autocomplete.bg` | `{surface.elevated}` | `#ffffff` |
| `autocomplete.border` | `{border.default}` | `#d5d3d0` |
| `autocomplete.border-focus` | `{focus.ring}` | `#e86800` |
| `autocomplete.fg` | `{text.primary}` | `#2a2926` |
| `autocomplete.placeholder` | `{text.tertiary}` | `#6e6b65` |
| `autocomplete.popover-bg` | `{surface.elevated}` | `#ffffff` |
| `autocomplete.option-bg-hover` | `{surface.subtle}` | `#f6f6f4` |
| `autocomplete.radius` | `{radius.md}` | `6px` |

## Library notes

```tsx
import { Autocomplete } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/autocomplete/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
