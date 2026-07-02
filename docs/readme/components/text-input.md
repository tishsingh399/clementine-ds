# TextInput

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/text-input/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/TextInput.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/text-input.json)

Status: `AI-Ready`. Component token file exists, state coverage is in Storybook, and the spec contract validates.

## Overview

Single-line free-text input. For multi-line use Textarea. For closed lists use Select. For sensitive values use `type="password"`.

## Anatomy

| Part | Purpose |
|---|---|
| `label` | `<label>` tied to input via for / id |
| `root` | Outer wrapper. Owns border + focus ring |
| `input` | Native `<input type="text">` (or email, password, etc.) |
| `icon-leading` | Optional leading icon |
| `icon-trailing` | Optional trailing icon (clear button, status indicator) |
| `helper` | Helper or error text under the input |

## States

`default`, `hover`, `focus`, `filled`, `disabled`, `error`, `loading`

## Token contract

| Token | Resolves through | Light |
|---|---|---|
| `text-input.bg.default` | `surface.elevated` | `#ffffff` |
| `text-input.bg.disabled` | `surface.subtle` | `#f3f3f0` |
| `text-input.fg.value` | `text.primary` | `#1a1a18` |
| `text-input.fg.placeholder` | `text.secondary` | `#6b6b66` |
| `text-input.border.default` | `border.strong` | `#d4d4cf` |
| `text-input.border.focus` | `border.focus` | `#2563eb` |
| `text-input.border.error` | `feedback.error` | `#dc2626` |
| `text-input.ring` | `focus.ring` | `#ff8040` |

## Accessibility

- Associated `<label>` (visible by default, `aria-label` only as last resort)
- `aria-invalid="true"` and `aria-describedby="<helperId>"` on error
- Preserve native autofill and autocomplete behavior
- Use `rightSection` for loading/status affordances rather than custom input chrome

## Related

- [Textarea](./textarea.md)
- [Select](./select.md)
