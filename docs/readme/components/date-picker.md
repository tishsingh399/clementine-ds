# DatePicker

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/date-picker/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/DatePicker.tsx) | [Storybook](https://clementine-ds-storybook.vercel.app/?path=/story/components-datepicker--default) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/date-picker.json)

## Overview

Inline calendar for choosing a single date, a range, or multiple dates. Always visible — for a form-field entry point use DateInput.

Status: `AI-Ready`. Token contract closed at 11 component-tier tokens. Dependency-gated: `@mantine/dates`.

## When to use

- Booking flows, report ranges, scheduling — seeing the month grid helps the choice
- Range selection (`type="range"`) and multi-select (`type="multiple"`)

## When not to use

- A date the user can type faster (birthdate) — use DateInput
- Display-only month view — use Calendar

## Accessibility

- Full keyboard grid navigation: arrows move days, PageUp/Down months, Enter selects
- `aria-selected` on chosen cells; today marked with a border, never color alone
- Constrained (min/max) days stay in the DOM as disabled cells

## Key tokens

| Token | Resolves through | Light |
|---|---|---|
| `date-picker.day-selected-bg` | `action.primary` | `#2563eb` |
| `date-picker.day-in-range-bg` | `surface.subtle` | `#f3f3f0` |
| `date-picker.day-today-border` | `action.primary` | `#2563eb` |
| `date-picker.ring` | `focus.ring` | `#ff8040` |

## Related

- [DateInput](./date-input.md) · [Calendar](./calendar.md)
