---
component: date-picker
ds_version: clementine-ds@0.1.0 (2026-06-11 verified)
status: AI-Ready
last_verified: 2026-06-11

category: Component
required_aria: [role, aria-selected, aria-label per day cell]

semantic_parts:
  root: the calendar panel
  header: month/year label + prev/next controls
  weekday: weekday column headers
  day: a selectable day cell
  day-selected: the chosen day(s)
  day-today: today's outline

token_contract:
  - date-picker.bg
  - date-picker.fg
  - date-picker.header-fg
  - date-picker.weekday-fg
  - date-picker.day-selected-bg
  - date-picker.day-selected-fg
  - date-picker.day-in-range-bg
  - date-picker.day-today-border
  - date-picker.day-muted-fg
  - date-picker.ring
  - date-picker.radius

interaction_states: [default, hover, focus, selected, range, disabled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/DatePicker.tsx
    underlying_library: mantine-dates
    exports: [DatePicker, DatePickerProps]
  storybook:
    path: apps/storybook/stories/DatePicker.stories.tsx
  tokens:
    component: packages/tokens/src/components/date-picker.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [forms]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: DATE-PICKER

> **Implementation:** [`packages/ui/src/components/DatePicker.tsx`](../../packages/ui/src/components/DatePicker.tsx) — wraps `@mantine/dates` DatePicker. Inline calendar; for an input-field entry point use [DateInput](../date-input/index.md).

## 1. Purpose & Intent

Inline calendar for choosing a single date, a range (`type="range"`), or multiple dates (`type="multiple"`). Always visible — no popover of its own.

**DatePicker must:**
- support full keyboard navigation (arrows move days, PageUp/Down months, Enter selects)
- expose `aria-selected` on chosen day cells and an accessible label per cell
- mark today visually with a border, never color fill alone
- mute out-of-month days with `date-picker.day-muted-fg`, not opacity hacks

## 2. When to use / not

- ✅ Booking flows, report ranges, scheduling — where seeing the month grid helps
- ❌ A known date the user can type faster (birthdate) → use [DateInput](../date-input/index.md)
- ❌ Display-only month view → use [Calendar](../calendar/index.md)

## 3. Agent notes

1. Selection type is a prop decision, not a new component: `type="default" | "range" | "multiple"`.
2. Range selection paints between-days with `date-picker.day-in-range-bg` — never the selected fill.
3. Min/max constrained days must remain in the DOM, disabled, for grid navigation to stay predictable.
