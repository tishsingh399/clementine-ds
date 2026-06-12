# DateInput

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/date-input/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/DateInput.tsx) | [Storybook](https://clementine-ds-storybook.vercel.app/?path=/story/components-dateinput--default) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/date-input.json)

## Overview

Date entry as a form field: type freely ("11 jun 2026") or pick from the calendar popover. Chrome matches TextInput 1:1; belongs inside a FormField like every input.

Status: `AI-Ready`. Token contract closed at 9 component-tier tokens. Dependency-gated: `@mantine/dates`.

## When to use

- Known dates the user can type (birthdate, invoice date)
- Forms where vertical space matters

## When not to use

- Browsy or range selection — use DatePicker

## Accessibility

- Associated `<label>` via FormField; `aria-invalid` + `aria-describedby` on parse errors
- Lenient parsing; canonical format shown on blur (`valueFormat`)

## Related

- [DatePicker](./date-picker.md) · [TextInput](./text-input.md)
