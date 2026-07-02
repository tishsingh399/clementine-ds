# Textarea

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/textarea/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Textarea.tsx)

Status: `AI-Ready`. Default is fixed rows with user-controlled vertical resize; autosize is opt-in for composer/comment surfaces.

## Overview

Multi-line free-text input. For single-line use TextInput. For rich content use a rich-text editor (not in this DS).

## Anatomy

| Part | Purpose |
|---|---|
| `label` | `<label>` tied to textarea via for / id |
| `root` | Outer wrapper |
| `textarea` | Native `<textarea>` |
| `counter` | Optional character counter (bottom right) |
| `helper` | Helper or error text |

## States

`default`, `hover`, `focus`, `filled`, `disabled`, `error`, `autosize`, `description`

## Accessibility

- Associated `<label>`
- `aria-invalid` and `aria-describedby` on error
- Preserve user-controlled resize (`resize: vertical`) unless explicitly disabled

Character counters are optional and should appear only when `maxLength` is set.

## Related

- [TextInput](./text-input.md)
