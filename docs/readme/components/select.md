# Select

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/select/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Select.tsx)

Status: `Draft`. Combobox vs select pattern needs a decision.

## Overview

Single-choice picker for a closed list. Use Select when the list is short to medium and known up front. For type-ahead search use a Combobox (not yet specced).

## Anatomy

| Part | Purpose |
|---|---|
| `root` | Trigger button that opens the popover |
| `value` | Display of the current selection |
| `caret` | Down chevron icon |
| `popover` | Floating list of options |
| `option` | Single option row |
| `empty-state` | Shown when no options match |

## States

`default`, `hover`, `focus`, `open`, `disabled`, `error`

## Accessibility

> **Needs input:** Decide between `combobox` (text input + listbox) or `listbox` (button + listbox) ARIA pattern.

## Related

- [Radio](./radio.md)
- [TextInput](./text-input.md)
