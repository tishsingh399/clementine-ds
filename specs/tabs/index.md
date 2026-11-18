---
component: tabs
ds_version: clementine-ds@0.1.0 (2026-11-05 verified)
status: AI-Ready
last_verified: 2026-11-17
verified_commit: 6685592e
verified_by: [contract, honesty, token-parity, runtime-tokens, painted-dom]
verified_gaps: 7

category: Component
required_aria: [role, aria-selected, aria-controls, aria-labelledby]

semantic_parts:
  list:      Outer <div role="tablist">
  tab:       Single <button role="tab">
  indicator: Active-tab underline / pill
  panel:     <div role="tabpanel"> revealed by the active tab
  scroll-control: Pointer-only chevron shown on a side of an overflowing horizontal list that has hidden tabs

token_contract:
  - tabs.indicator.active
  - tabs.fg.active
  - tabs.fg.inactive
  - tabs.fg.hover
  - tabs.fg.disabled
  - tabs.border.list
  - tabs.border.focus

interaction_states: [default, hover, focus, selected, disabled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Tabs.tsx
    underlying_library: mantine
    exports: [Tabs, TabsList, TabsTab, TabsPanel]
  storybook:
    path: apps/storybook/stories/Tabs.stories.tsx
  tokens:
    primitives: packages/tokens/src/primitives.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json
    component: packages/tokens/src/components/tabs.json

patterns_used_in: [settings-page, object-details, dashboard]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: TABS

> **Status:** AI-Ready. Mantine owns the tablist/tab/tabpanel semantics and arrow-key behavior; Storybook covers default, outline, pills, vertical, disabled-tab and overflow states. Clementine's `TabsList` adds one-row horizontal overflow with scroll chevrons (section 2). Theme wiring: `--tabs-color` and `--tab-border-color` come from `tabs.indicator.active` and `tabs.border.list` (an explicit `color` prop still wins); label colours, disabled colour and the focus ring come from `tabs.fg.*` and `tabs.border.focus` in `states.css`. Disabled tabs keep Mantine's 50% fade, because `text.tertiary` alone sits too close to `fg.inactive`. Pills keep Mantine's on-fill text colour for the active tab.

## 1. Purpose & Intent

Switch between sibling views of related content within the same page region. For top-level navigation use a side nav; for primary actions use Buttons.

**Tabs must:**
- expose `role="tablist"` on the wrapper, `role="tab"` on each tab, `role="tabpanel"` on each panel
- support left/right arrow keys to move between tabs
- on tab change: update `aria-selected` on tabs and show only the active panel
- preserve focus order: Tab from tablist → active panel content

## 2. Overflow (horizontal lists)

Mantine's list wraps (`flex-wrap: wrap`), so on a narrow screen tabs used to drop onto a second row and the indicator line ran under the wrong row. Clementine's `TabsList` keeps horizontal tabs on one row and scrolls instead.

| Situation | Required behaviour |
|---|---|
| Tabs fit | Nothing changes: no scroll controls, no reserved space. |
| Tabs don't fit | The list scrolls sideways on one row. The native scrollbar is hidden; wheel, trackpad and touch scrolling still work. |
| Hidden tabs on a side | A chevron (`scroll-control` part) shows on that side only. Clicking it scrolls by most of the visible width. Both chevron slots stay in the layout while the list overflows, so the tabs don't jump when one hides. |
| Chevrons and assistive tech | Chevrons are pointer-only: `tabIndex={-1}`, `aria-hidden="true"`, and they don't take focus on click. Keyboard and screen-reader users reach every tab with the arrow keys, so the chevrons would only add duplicate stops. |
| Keyboard | Arrow keys move focus between tabs (Mantine). The focused tab scrolls into view and is never hidden under a chevron, because the chevrons sit outside the scrolling area. |
| Selected tab off-screen | On first render, and whenever `aria-selected` moves (including controlled `value` changes), the selected tab scrolls into view. |
| Long labels | Labels are never truncated or wrapped; a long label makes the list overflow and scroll. |
| Disabled tabs | Stay in place in the row, skipped by arrow keys (Mantine). A chevron never scrolls to a disabled tab specifically. |
| Focus ring | The scroll area is padded so a focused tab's outline isn't clipped. |
| Reduced motion | Chevron scrolling and scroll-into-view are instant when `prefers-reduced-motion: reduce`, smooth otherwise. |
| Light / dark | Chevrons paint `tabs.fg.inactive`, and `tabs.fg.hover` on hover. No new tokens. |
| Vertical orientation | Out of scope: the list renders exactly as before (the overflow wrapper is `display: contents`). |

Storybook: **Components/Tabs › Overflow** renders 12 tabs (one long label, one disabled, the last one selected) in a 360px frame. Its play function checks the one-row layout, the selected tab being in view, chevron visibility and `aria-hidden`, and that a chevron click scrolls the list.
