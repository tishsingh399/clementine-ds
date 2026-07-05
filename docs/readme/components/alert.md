# Alert

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/alert/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Alert.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/alert.json)

## Overview

Inline contextual feedback — info, success, warning, error — communicated with color AND an icon, never color alone.

Status: `AI-Ready`. Token contract closed at 15 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/alert/index.md).

## Token contract

15 component-tier tokens, defined in `packages/tokens/src/components/alert.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `alert.bg.info` | `{surface.subtle}` | `#f3f3f0` |
| `alert.bg.success` | `{feedback.success-subtle}` | `#f0fdf4` |
| `alert.bg.warning` | `{feedback.warning-subtle}` | `#fff7ed` |
| `alert.bg.error` | `{feedback.error-subtle}` | `#fef2f2` |
| `alert.border.info` | `{border.default}` | `#e5e5e0` |
| `alert.border.success` | `{feedback.success}` | `#16a34a` |
| `alert.border.warning` | `{feedback.warning}` | `#ea580c` |
| `alert.border.error` | `{feedback.error}` | `#dc2626` |
| `alert.fg.title` | `{text.primary}` | `#1a1a18` |
| `alert.fg.body` | `{text.secondary}` | `#6b6b66` |
| `alert.icon.info` | `{text.secondary}` | `#6b6b66` |
| `alert.icon.success` | `{feedback.success}` | `#16a34a` |
| `alert.icon.warning` | `{feedback.warning}` | `#ea580c` |
| `alert.icon.error` | `{feedback.error}` | `#dc2626` |
| `alert.radius` | `{radius.md}` | `8px` |

## Library notes

```tsx
import { Alert } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/alert/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
