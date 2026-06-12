---
component: artifact-frame
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: []
model_baseline: claude-opus-4-8
prompt_version: artifact@2026-06-10

semantic_parts:
  root:    Bordered frame
  header:  Title + kind badge + actions
  body:    The artifact content

token_contract:
  - artifact.bg
  - artifact.header-bg
  - artifact.border
  - artifact.title
  - artifact.kind
  - artifact.radius

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/ArtifactFrame.tsx
    underlying_library: mantine
    exports: [ArtifactFrame, ArtifactFrameProps]
  storybook:
    path: apps/storybook/stories/ai/ArtifactFrame.stories.tsx
  tokens:
    component: packages/tokens/src/components/artifact-frame.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: ARTIFACT FRAME

> **Implementation:** [`packages/ui/src/components/ai/ArtifactFrame.tsx`](../../../packages/ui/src/components/ai/ArtifactFrame.tsx).

A titled container for a substantial generated output (document, code file, rendered preview) lifted out of the chat stream. Header carries the title, a kind badge, and actions (copy / download / open).

| Part | Token | Light |
|---|---|---|
| body fill | `artifact.bg` → `{surface.elevated}` | `#ffffff` |
| header fill | `artifact.header-bg` → `{surface.subtle}` | `#f3f3f0` |
| border | `artifact.border` → `{border.default}` | `#e5e5e0` |
| title | `artifact.title` → `{text.primary}` | `#1a1a18` |

**Do** lift large/reusable outputs into a frame with clear actions. **Don't** bury a 200-line code block inline in a chat bubble.
