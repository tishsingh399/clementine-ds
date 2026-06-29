---
component: switch
ds_version: clementine-ds@0.1.0 (2026-06-08 verified)
status: Draft
last_verified: 2026-06-08

category: Component
required_aria: [role, aria-checked, aria-disabled]

semantic_parts:
  root:  Native <input type="checkbox" role="switch">
  track: Outer pill that fills when on
  thumb: Sliding circle
  label: Optional text label

token_contract:
  - switch.track.on
  - switch.track.off
  - switch.track.disabled
  - switch.thumb.default
  - switch.border.focus
  - switch.fg.label

interaction_states: [off, on, focus, hover, disabled]

checks:
  aria_correct: false
  structure_correct: true
  states_complete: false
  tokens_valid: false
  no_invented_styles: false

sources:
  react:
    path: packages/ui/src/components/Switch.tsx
    underlying_library: mantine
    exports: [Switch]
  storybook:
    path: apps/storybook/stories/Switch.stories.tsx
  tokens:
    primitives: packages/tokens/src/primitives.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json
    component: packages/tokens/src/components/switch.json

patterns_used_in: [settings-row, feature-flag]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: SWITCH

> **Status:** Draft. Switch vs Checkbox guidance needed in §1.

## 1. Purpose & Intent

Immediate-effect toggle for a single setting. Use when the change takes effect without a Save action. For form fields use Checkbox.

**Switch must:**
- be `<input type="checkbox" role="switch">`
- expose `aria-checked`
- animate the thumb position on state change (≤ 200ms)
