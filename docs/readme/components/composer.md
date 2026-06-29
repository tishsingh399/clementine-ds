# Composer

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/composer/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/Composer.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/composer.json)

## Overview

The prompt input for an AI surface: an autosizing textarea with a Send affordance that becomes Stop while busy.

Status: `AI-Ready`. Token contract closed at 8 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/composer/index.md).

## Token contract

8 component-tier tokens, defined in `packages/tokens/src/components/composer.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `composer.bg` | `{surface.elevated}` | `#ffffff` |
| `composer.border` | `{border.default}` | `#e5e5e0` |
| `composer.border-focus` | `{focus.ring}` | `#ff8040` |
| `composer.fg` | `{text.primary}` | `#1a1a18` |
| `composer.placeholder` | `{text.tertiary}` | `#a3a39e` |
| `composer.send-bg` | `{action.primary}` | `#2563eb` |
| `composer.stop-bg` | `{action.destructive}` | `#dc2626` |
| `composer.radius` | `{radius.lg}` | `8px` |

## Library notes

```tsx
import { Composer } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/composer/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
