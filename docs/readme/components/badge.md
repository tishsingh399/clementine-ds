# Badge

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/badge/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Badge.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/badge.json)

## Overview

Non-interactive label for status, severity, or count. Never clickable.

Status: `Draft`. Component tokens exist. Spec needs ARIA verification and a full state table.

## When to use

- Status indicator in a data table row
- Severity tier on a security finding
- Count next to a navigation item
- Tag on a content item

## When not to use

- Tappable. Use Button.
- Selectable. Use a chip pattern (not yet specced).

## Anatomy

| Part | Purpose |
|---|---|
| `root` | Outer `<span>`. Owns padding, radius, fill. |
| `label` | Text content. |

## Token contract

> **Note:** Pending full reconciliation. Current bindings:

| Intent | Token | Resolves through | Light |
|---|---|---|---|
| Neutral | `badge.bg.neutral` | `surface.subtle` | `#f3f3f0` |
| Success | `badge.bg.success` | `feedback.success-subtle` | `#f0fdf4` |
| Error | `badge.bg.error` | `feedback.error-subtle` | `#fef2f2` |
| Warning | `badge.bg.warning` | `feedback.warning-subtle` | `#fff7ed` |
| Risk critical | `badge.bg.risk-critical` | `risk.critical-subtle` | `#fef2f2` |
| Risk high | `badge.bg.risk-high` | `risk.high-subtle` | `#fff7ed` |
| Risk medium | `badge.bg.risk-medium` | `risk.medium-subtle` | `#ffedd5` |
| Risk low | `badge.bg.risk-low` | `risk.low-subtle` | `#f0fdf4` |

## Accessibility

> **Needs input:** ARIA approach for badges that convey state critical to surrounding context (e.g. "Critical" badge on a vulnerability row). Currently the parent owns the announcement.

## Related

- [Button](./button.md)
- [TextInput](./text-input.md)
