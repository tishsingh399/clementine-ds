# Modal

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/modal/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Modal.tsx)

Status: `Draft`. Focus-trap and Esc behavior need verification.

## Overview

Blocking overlay that interrupts the page. Use sparingly. Most flows belong inline.

## Anatomy

| Part | Purpose |
|---|---|
| `overlay` | Backdrop, dims the page underneath |
| `dialog` | Modal container. Owns elevation, radius, focus trap |
| `header` | Title row + close button |
| `body` | Main content |
| `footer` | Action row (typically Buttons) |

## States

`closed`, `opening`, `open`, `closing`

## Accessibility

- `role="dialog"`, `aria-modal="true"`
- `aria-labelledby` points at the header title id
- Trap focus while open
- Close on Esc
- Restore focus to the trigger element on close

> **Needs input:** Add motion spec for opening / closing transitions.

## Related

- [Button](./button.md)
