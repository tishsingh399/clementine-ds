# Modal

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/modal/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Modal.tsx)

Status: `AI-Ready`. Mantine owns focus trap, Esc-to-close, portal behavior, and rendered dialog ARIA.

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

## Decisions

- Header close button is the default close affordance.
- Footer actions are reserved for task decisions.
- Opening/closing motion follows Mantine defaults unless a product surface explicitly overrides it.

## Related

- [Button](./button.md)
