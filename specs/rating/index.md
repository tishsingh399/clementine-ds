---
component: rating
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role, aria-label]

semantic_parts:
  root: the symbol group
  symbol: one star/unit

token_contract:
  - rating.symbol-empty
  - rating.symbol-filled

interaction_states: [empty, hover, selected, readonly]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Rating.tsx
    underlying_library: mantine
    exports: [Rating, RatingProps]
  storybook:
    path: apps/storybook/stories/Rating.stories.tsx
  tokens:
    component: packages/tokens/src/components/rating.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [forms]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: RATING

> **Implementation:** [`packages/ui/src/components/Rating.tsx`](../../packages/ui/src/components/Rating.tsx) — wraps Mantine `Rating`.

Capture or display a star rating (feedback score, quality).

| Token | Resolves through | Light |
|---|---|---|
| `rating.symbol-empty` | `{border.strong}` | `#737370` |
| `rating.symbol-filled` | `{feedback.warning}` | `#ea580c` |

**Do:** Label what is being rated; support fractions for display; Allow keyboard selection; Use readOnly for display-only.
**Don't:** Use color alone to mean "good/bad"; Make a display-only rating look interactive.
