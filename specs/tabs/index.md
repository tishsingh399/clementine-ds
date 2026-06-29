---
component: tabs
ds_version: clementine-ds@0.1.0 (2026-06-08 verified)
status: Draft
last_verified: 2026-06-08

category: Component
required_aria: [role, aria-selected, aria-controls, aria-labelledby]

semantic_parts:
  list:      Outer <div role="tablist">
  tab:       Single <button role="tab">
  indicator: Active-tab underline / pill
  panel:     <div role="tabpanel"> revealed by the active tab

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
  aria_correct: false
  structure_correct: true
  states_complete: false
  tokens_valid: false
  no_invented_styles: false

sources:
  react:
    path: packages/ui/src/components/Tabs.tsx
    underlying_library: mantine
    exports: [Tabs]
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

> **Status:** Draft. Arrow-key navigation between tabs needs verification.

## 1. Purpose & Intent

Switch between sibling views of related content within the same page region. For top-level navigation use a side nav; for primary actions use Buttons.

**Tabs must:**
- expose `role="tablist"` on the wrapper, `role="tab"` on each tab, `role="tabpanel"` on each panel
- support left/right arrow keys to move between tabs
- on tab change: update `aria-selected` on tabs and show only the active panel
- preserve focus order: Tab from tablist → active panel content
