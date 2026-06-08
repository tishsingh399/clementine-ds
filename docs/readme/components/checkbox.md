# Checkbox

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/checkbox/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Checkbox.tsx)

Status: `Draft`. Component token file pending.

## Overview

Binary or tri-state form input. For exclusive choice use Radio. For settings outside a form use Switch.

## Anatomy

| Part | Purpose |
|---|---|
| `root` | Native `<input type="checkbox">` wrapper |
| `box` | Visible square showing checked / indeterminate / unchecked |
| `check` | Checkmark glyph |
| `label` | Text label (clickable target) |
| `description` | Optional helper text under the label |

## States

`default`, `hover`, `focus`, `checked`, `indeterminate`, `disabled`, `error`

## Accessibility

Must be a native `<input type="checkbox">` with `aria-checked` exposed. Indeterminate state uses `aria-checked="mixed"`. Label is part of the hit area.

> **Needs input:** Confirm Mantine's default output covers `aria-checked="mixed"` for indeterminate.

## Related

- [Radio](./radio.md)
- [Switch](./switch.md)
