# Switch

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/switch/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Switch.tsx)

Status: `Draft`.

## Overview

Immediate-effect toggle for a single setting. Change takes effect without a Save action. For form fields use Checkbox.

## Anatomy

| Part | Purpose |
|---|---|
| `root` | `<input type="checkbox" role="switch">` |
| `track` | Outer pill that fills when on |
| `thumb` | Sliding circle |
| `label` | Optional text label |

## States

`off`, `on`, `focus`, `hover`, `disabled`

## Accessibility

`<input type="checkbox" role="switch">`. `aria-checked` exposed. Thumb animates on state change in 200ms or less.

## Related

- [Checkbox](./checkbox.md)
