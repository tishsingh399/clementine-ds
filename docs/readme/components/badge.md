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
| Neutral | `badge.bg.neutral` | `surface.subtle` | `#f6f6f4` |
| Success | `badge.bg.success` | `feedback.success-subtle` | `#ddf5e2` |
| Error | `badge.bg.error` | `feedback.error-subtle` | `#fee8e5` |
| Warning | `badge.bg.warning` | `feedback.warning-subtle` | `#ffebcf` |
| Risk critical | `badge.bg.risk-critical` | `risk.critical-subtle` | `#fee8e5` |
| Risk high | `badge.bg.risk-high` | `risk.high-subtle` | `#ffe9de` |
| Risk medium | `badge.bg.risk-medium` | `risk.medium-subtle` | `#ffebcf` |
| Risk low | `badge.bg.risk-low` | `risk.low-subtle` | `#ddf5e2` |

## Accessibility

> **Needs input:** ARIA approach for badges that convey state critical to surrounding context (e.g. "Critical" badge on a vulnerability row). Currently the parent owns the announcement.

## Related

- [Button](./button.md)
- [TextInput](./text-input.md)
