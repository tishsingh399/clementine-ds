---
component: citation-chip
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: [aria-label]
model_baseline: claude-opus-4-8
prompt_version: cite@2026-06-10

semantic_parts:
  chip:    Superscript reference [n]
  tooltip: Source + snippet on hover/focus

token_contract:
  - citation.bg
  - citation.fg
  - citation.border
  - citation.radius

interaction_states: [default, hover, focus]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/CitationChip.tsx
    underlying_library: mantine
    exports: [CitationChip, CitationChipProps]
  storybook:
    path: apps/storybook/stories/ai/CitationChip.stories.tsx
  tokens:
    component: packages/tokens/src/components/citation-chip.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: CITATION CHIP

> **Implementation:** [`packages/ui/src/components/ai/CitationChip.tsx`](../../packages/ui/src/components/ai/CitationChip.tsx).

Inline provenance for an AI claim — a small superscript `[n]` that links to its source and reveals source + snippet on hover/focus. Accessible name is "Source N: <source>".

| Part | Token | Light |
|---|---|---|
| chip fill | `citation.bg` → `{surface.subtle}` | `#f3f3f0` |
| chip text | `citation.fg` → `{text.secondary}` | `#6b6b66` |
| chip border | `citation.border` → `{border.default}` | `#e5e5e0` |

**Do** attach a real source to every factual claim that has one. **Don't** fabricate citations or link to a source that doesn't support the claim.
