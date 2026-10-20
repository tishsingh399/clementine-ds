---
component: time-range-picker
ds_version: clementine-ds@0.1.0 (2026-10-20 verified)
status: AI-Ready
last_verified: 2026-10-20
verified_commit: a12ce8a6
verified_by: [contract, honesty, token-parity, runtime-tokens, painted-dom]

category: Component
required_aria: [aria-label, aria-pressed, role=group]

semantic_parts:
  trigger:  button showing the active range ("Last 6 hours" or "from → to")
  absolute: the From / To form with Apply
  quick:    the list of preset ranges
  option:   one preset range (a toggle button)
  divider:  rule between absolute and quick

slots: {}

token_contract:
  - time-range-picker.trigger-fg
  - time-range-picker.label
  - time-range-picker.option-fg
  - time-range-picker.option-bg-active
  - time-range-picker.divider

interaction_states: [default, open, selected-range, absolute, invalid]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/TimeRangePicker.tsx
    underlying_library: custom (Mantine primitives + tokens)
    exports: [TimeRangePicker, TimeRangePickerProps, TimeRange, QuickRange, DEFAULT_QUICK_RANGES]
  storybook:
    path: apps/storybook/stories/TimeRangePicker.stories.tsx
  tokens:
    component: packages/tokens/src/components/time-range-picker.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [dashboard-toolbar, explorer-toolbar]
pages_used_in: [dashboard, trace-explorer]
---

# AGENTIC DOCUMENTATION: TIMERANGEPICKER

> **Implementation:** [`packages/ui/src/components/TimeRangePicker.tsx`](../../packages/ui/src/components/TimeRangePicker.tsx). Worked examples: [`docs/worked-examples/metrics-dashboard.md`](../../docs/worked-examples/metrics-dashboard.md), [`trace-explorer.md`](../../docs/worked-examples/trace-explorer.md).

The "Last 6 hours ▾" control at the top right of dashboards, log explorers and trace explorers. It sets the time window every panel on the page shares.

## Contract
- **Takes no children** (`slots: {}`). Configure it with `value`, `onChange`, `quickRanges` and `validate`.
- Values are strings: relative (`now-6h`) or absolute (`2026-10-17 09:00`). The picker doesn't parse dates. The app does, and can reject input with `validate` (its message shows under **To**).
- If `value` matches a quick range, the trigger shows its label. Otherwise it shows `from → to`.
- Empty From or To blocks Apply with "Required" on that field.

## Don't use it for
- Picking one date in a form. Use `DateInput` / `DatePicker`.
- Choosing a refresh interval. That's a `Select` next to the picker.

## Accessibility
The trigger's name includes the current range ("Time range: Last 6 hours"). Quick ranges are toggle buttons (`aria-pressed`) in a named group. The absolute form submits on Enter. Popover owns Esc and focus return.

| Token | Resolves through | Light |
|---|---|---|
| `time-range-picker.trigger-fg` | `{text.primary}` | `#2a2926` |
| `time-range-picker.label` | `{text.secondary}` | `#65635e` |
| `time-range-picker.option-fg` | `{text.primary}` | `#2a2926` |
| `time-range-picker.option-bg-active` | `{action.selected-subtle}` | `#e5eeff` |
| `time-range-picker.divider` | `{border.default}` | `#d5d3d0` |

**Do:** Put one picker per page, top right, and drive every panel from it; keep 5–8 quick ranges.
**Don't:** Give each panel its own picker; offer ranges your backend can't serve.
