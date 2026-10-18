# Alert

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/alert/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Alert.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/alert.json)

## Overview

Inline contextual feedback — info, success, warning, error — communicated with color AND an icon, never color alone.

Status: `AI-Ready`. Token contract closed at 15 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/alert/index.md).

## Token contract

15 component-tier tokens, defined in `packages/tokens/src/components/alert.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `alert.bg.info` | `{surface.subtle}` | `#f6f6f4` |
| `alert.bg.success` | `{feedback.success-subtle}` | `#ddf5e2` |
| `alert.bg.warning` | `{feedback.warning-subtle}` | `#ffebcf` |
| `alert.bg.error` | `{feedback.error-subtle}` | `#fee8e5` |
| `alert.border.info` | `{border.default}` | `#d5d3d0` |
| `alert.border.success` | `{feedback.success}` | `#198044` |
| `alert.border.warning` | `{feedback.warning}` | `#855905` |
| `alert.border.error` | `{feedback.error}` | `#c1332f` |
| `alert.fg.title` | `{text.primary}` | `#2a2926` |
| `alert.fg.body` | `{text.secondary}` | `#65635e` |
| `alert.icon.info` | `{text.secondary}` | `#65635e` |
| `alert.icon.success` | `{feedback.success}` | `#198044` |
| `alert.icon.warning` | `{feedback.warning}` | `#855905` |
| `alert.icon.error` | `{feedback.error}` | `#c1332f` |
| `alert.radius` | `{radius.md}` | `8px` |

## Library notes

```tsx
import { Alert } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/alert/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
