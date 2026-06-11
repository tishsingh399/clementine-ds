---
component: maintenance-banner
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Enterprise
required_aria: [role]

semantic_parts:
  root: the banner
  icon: severity icon
  message: the message

token_contract:
  - maintenance-banner.info-bg
  - maintenance-banner.degraded-bg
  - maintenance-banner.down-bg
  - maintenance-banner.fg

interaction_states: [info, degraded, down]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/MaintenanceBanner.tsx
    underlying_library: custom
    exports: [MaintenanceBanner, MaintenanceBannerProps, MaintenanceSeverity]
  storybook:
    path: apps/storybook/stories/MaintenanceBanner.stories.tsx
  tokens:
    component: packages/tokens/src/components/maintenance-banner.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [data-table, faceted-search]
pages_used_in: [console, settings]
---

# AGENTIC DOCUMENTATION: MAINTENANCEBANNER

> **Implementation:** [`packages/ui/src/components/MaintenanceBanner.tsx`](../../packages/ui/src/components/MaintenanceBanner.tsx).

A full-width system banner for maintenance / degraded / down states. Severity by color + icon + text.

| Token | Resolves through | Light |
|---|---|---|
| `maintenance-banner.info-bg` | `{surface.subtle}` | `#f3f3f0` |
| `maintenance-banner.degraded-bg` | `{feedback.warning-subtle}` | `#fff7ed` |
| `maintenance-banner.down-bg` | `{feedback.error-subtle}` | `#fef2f2` |
| `maintenance-banner.fg` | `{text.primary}` | `#1a1a18` |

**Do:** Carry severity with icon + text, not color alone; State impact + ETA if known; Keep it dismissible only when safe.
**Don't:** Use color alone for severity; Leave a stale banner up after recovery.
