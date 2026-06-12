# Calendar

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/calendar/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Calendar.tsx) | [Storybook](https://clementine-ds-storybook.vercel.app/?path=/story/components-calendar--default) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/calendar.json)

## Overview

Read-mostly month grid for displaying dates: availability, scheduled events, activity. Selection is deliberately not part of this contract — that's DatePicker.

Status: `AI-Ready`. Token contract closed at 7 component-tier tokens. Dependency-gated: `@mantine/dates`.

## When to use

- Showing availability or scheduled items (decorate days via `renderDay` / `getDayProps`)
- Dashboard month views

## When not to use

- The user picks a date — use DatePicker
- The user types a date — use DateInput

## Accessibility

- Day cells stay keyboard-traversable even when display-only
- Today gets `calendar.day-today-border` (outline, never fill alone)
- Event markers come from Badge/StatusDot tokens via render props, not invented colors

## Related

- [DatePicker](./date-picker.md) · [Badge](./badge.md)
