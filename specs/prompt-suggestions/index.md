---
component: prompt-suggestions
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: []
model_baseline: claude-opus-4-8

semantic_parts:
  root: the chip row
  chip: one starter prompt

token_contract:
  - prompt-suggestions.bg
  - prompt-suggestions.border
  - prompt-suggestions.fg
  - prompt-suggestions.radius

interaction_states: [default, hover, focus]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/PromptSuggestions.tsx
    underlying_library: mantine
    exports: [PromptSuggestions, PromptSuggestionsProps]
  storybook:
    path: apps/storybook/stories/ai/PromptSuggestions.stories.tsx
  tokens:
    component: packages/tokens/src/components/prompt-suggestions.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: PROMPTSUGGESTIONS

> **Implementation:** [`packages/ui/src/components/ai/PromptSuggestions.tsx`](../../packages/ui/src/components/ai/PromptSuggestions.tsx).

Clickable starter prompts shown above an empty Composer, tied to real capabilities.

| Token | Resolves through | Light |
|---|---|---|
| `prompt-suggestions.bg` | `{surface.subtle}` | `#f3f3f0` |
| `prompt-suggestions.border` | `{border.default}` | `#e5e5e0` |
| `prompt-suggestions.fg` | `{text.primary}` | `#1a1a18` |
| `prompt-suggestions.radius` | `{radius.xl}` | `99px` |

**Do:** Offer 3-4 concrete, verb-first prompts; Tie each to a real, supported capability; Get out of the way once a conversation starts.
**Don't:** Suggest unsupported actions; Show a wall of suggestions.
