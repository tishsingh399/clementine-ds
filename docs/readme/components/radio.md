# Radio

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/radio/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Radio.tsx)

Status: `AI-Ready`. Mantine owns group semantics and keyboard behavior; Storybook covers checked, description, and disabled-option states.

## Overview

Mutually exclusive choice within a group. For non-exclusive selection use Checkbox.

## Anatomy

| Part | Purpose |
|---|---|
| `group` | Wrapper that owns `role="radiogroup"` |
| `root` | Native `<input type="radio">` |
| `circle` | Visible outer ring |
| `dot` | Inner filled circle when checked |
| `label` | Text label |

## States

`default`, `hover`, `focus`, `checked`, `disabled`, `description`

## Accessibility

Native `<input type="radio">` inside a wrapper with `role="radiogroup"` and `aria-labelledby`. Arrow-key navigation between options.

## Related

- [Checkbox](./checkbox.md)
- [Select](./select.md)
