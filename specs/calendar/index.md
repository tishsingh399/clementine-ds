---
component: calendar
ds_version: clementine-ds@HEAD (2026-06-11 verified)
status: AI-Ready
last_verified: 2026-06-11

category: Component
required_aria: [role, aria-label per day cell]

semantic_parts:
  root: the month grid panel
  header: month/year label + prev/next controls
  weekday: weekday column headers
  day: a day cell (render-prop decorated)
  day-today: today's outline

token_contract:
  - calendar.bg
  - calendar.fg
  - calendar.header-fg
  - calendar.weekday-fg
  - calendar.day-today-border
  - calendar.day-muted-fg
  - calendar.ring

interaction_states: [default, focus, disabled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Calendar.tsx
    underlying_library: mantine-dates
    exports: [Calendar, CalendarProps]
  storybook:
    path: apps/storybook/stories/Calendar.stories.tsx
  tokens:
    component: packages/tokens/src/components/calendar.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: [dashboard]
---

# AGENTIC DOCUMENTATION: CALENDAR

> **Implementation:** [`packages/ui/src/components/Calendar.tsx`](../../packages/ui/src/components/Calendar.tsx) — wraps `@mantine/dates` Calendar. Display-oriented month grid; selection is NOT part of this contract.

## 1. Purpose & Intent

Read-mostly month view for showing dates: availability, scheduled events, activity heat. Decorate days via `renderDay` / `getDayProps`. If the user is *choosing* a date, that's [DatePicker](../date-picker/index.md).

**Calendar must:**
- keep day cells keyboard-traversable even when display-only
- mark today with `calendar.day-today-border` (outline, not fill)
- carry event/availability markers via render-prop content, not invented colors — markers use Badge/StatusDot tokens

## 2. Agent notes

1. No `day-selected-*` tokens here — if you need selection, switch components instead of restyling.
2. Heat/availability shading must come from existing semantic surfaces (`surface.subtle`) or Badge tiers.
