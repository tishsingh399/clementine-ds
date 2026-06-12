---
component: segmented-control
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role, aria-checked]

semantic_parts:
  root: the track
  item: a segment
  indicator: the sliding active fill

token_contract:
  - segmented-control.bg
  - segmented-control.bg-active
  - segmented-control.fg
  - segmented-control.fg-active
  - segmented-control.radius

interaction_states: [default, active, disabled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/SegmentedControl.tsx
    underlying_library: mantine
    exports: [SegmentedControl, SegmentedControlProps]
  storybook:
    path: apps/storybook/stories/SegmentedControl.stories.tsx
  tokens:
    component: packages/tokens/src/components/segmented-control.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: SEGMENTEDCONTROL

> **Implementation:** [`packages/ui/src/components/SegmentedControl.tsx`](../../packages/ui/src/components/SegmentedControl.tsx) — wraps Mantine `SegmentedControl`.

Pick one of a small set of mutually-exclusive options — a compact, styled radio group.

| Token | Resolves through | Light |
|---|---|---|
| `segmented-control.bg` | `{surface.subtle}` | `#f3f3f0` |
| `segmented-control.bg-active` | `{surface.elevated}` | `#ffffff` |
| `segmented-control.fg` | `{text.secondary}` | `#6b6b66` |
| `segmented-control.fg-active` | `{text.primary}` | `#1a1a18` |
| `segmented-control.radius` | `{radius.md}` | `6px` |

**Do:** Keep to 2-5 short options; Default to the most common choice; Use full-width inside narrow containers.
**Don't:** Overflow with long labels; Use for more than ~5 options; Hide the active segment behind color alone.
