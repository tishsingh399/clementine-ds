---
component: code-block
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: [aria-label]
model_baseline: claude-opus-4-8

semantic_parts:
  root: the block
  header: filename/language + copy
  body: the code
  copy: copy button

token_contract:
  - code-block.bg
  - code-block.header-bg
  - code-block.border
  - code-block.fg
  - code-block.filename
  - code-block.radius

interaction_states: [default, copied]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/CodeBlock.tsx
    underlying_library: mantine
    exports: [CodeBlock, CodeBlockProps]
  storybook:
    path: apps/storybook/stories/ai/CodeBlock.stories.tsx
  tokens:
    component: packages/tokens/src/components/code-block.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: CODEBLOCK

> **Implementation:** [`packages/ui/src/components/ai/CodeBlock.tsx`](../../packages/ui/src/components/ai/CodeBlock.tsx).

A copyable code block for model-generated code, with a filename/language header. For large output, wrap in an ArtifactFrame.

| Token | Resolves through | Light |
|---|---|---|
| `code-block.bg` | `{surface.elevated}` | `#ffffff` |
| `code-block.header-bg` | `{surface.subtle}` | `#f3f3f0` |
| `code-block.border` | `{border.default}` | `#e5e5e0` |
| `code-block.fg` | `{text.primary}` | `#1a1a18` |
| `code-block.filename` | `{text.tertiary}` | `#737370` |
| `code-block.radius` | `{radius.md}` | `6px` |

**Do:** Always offer copy with clear feedback; Label the language/filename; Wrap big output in an ArtifactFrame.
**Don't:** Force horizontal scroll for one long line without wrap option; Drop the language label.
