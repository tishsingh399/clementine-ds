---
component: slider
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role, aria-valuenow, aria-valuemin, aria-valuemax]

semantic_parts:
  track: the rail
  filled: the filled portion
  thumb: the draggable handle
  mark: a tick
  label: value bubble

token_contract:
  - slider.track
  - slider.track-filled
  - slider.thumb
  - slider.thumb-border
  - slider.mark
  - slider.label

interaction_states: [default, focus, dragging, disabled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Slider.tsx
    underlying_library: mantine
    exports: [Slider, SliderProps]
  storybook:
    path: apps/storybook/stories/Slider.stories.tsx
  tokens:
    component: packages/tokens/src/components/slider.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [forms]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: SLIDER

> **Implementation:** [`packages/ui/src/components/Slider.tsx`](../../packages/ui/src/components/Slider.tsx) — wraps Mantine `Slider`.

Select a value from a continuous range by dragging (thresholds, volume, sensitivity).

| Token | Resolves through | Light |
|---|---|---|
| `slider.track` | `{surface.subtle}` | `#f3f3f0` |
| `slider.track-filled` | `{action.primary}` | `#2563eb` |
| `slider.thumb` | `{surface.elevated}` | `#ffffff` |
| `slider.thumb-border` | `{action.primary}` | `#2563eb` |
| `slider.mark` | `{border.default}` | `#e5e5e0` |
| `slider.label` | `{text.on-action}` | `#ffffff` |

**Do:** Show the current value (bubble or adjacent text); Support keyboard (arrows, Home/End); Add marks for meaningful stops.
**Don't:** Use when the exact value matters; Rely on position alone with no value readout.
