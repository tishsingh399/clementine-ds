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
| `text-input.bg.disabled` | `surface.subtle` | `#f6f6f4` |
| `text-input.fg.value` | `text.primary` | `#2a2926` |
| `text-input.fg.placeholder` | `text.secondary` | `#65635e` |
| `text-input.border.default` | `border.strong` | `#93908b` |
| `text-input.border.focus` | `border.focus` | `#305eb7` |
| `text-input.border.error` | `feedback.error` | `#c1332f` |
| `text-input.ring` | `focus.ring` | `#e86800` |
| `text-input.height.sm` | — | `32px` |
| `text-input.height.md` | — | `40px` |
| `text-input.height.lg` | — | `48px` |

## Accessibility

- Associated `<label>` (visible by default, `aria-label` only as last resort)
- `aria-invalid="true"` and `aria-describedby="<helperId>"` on error
- Preserve native autofill and autocomplete behavior
- Use `rightSection` for loading/status affordances rather than custom input chrome

## Related

- [Textarea](./textarea.md)
- [Select](./select.md)
