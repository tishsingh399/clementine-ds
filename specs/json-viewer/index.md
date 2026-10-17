---
component: json-viewer
ds_version: clementine-ds@0.1.0 (2026-10-17 verified)
status: AI-Ready
last_verified: 2026-10-17
verified_by: [contract, slots, freshness, token-lint, storybook-browser]

category: Component
required_aria: [role=group, aria-label]

semantic_parts:
  root:        monospace container, named by aria-label
  node:        an object or array — a native <details> disclosure
  key:         property name
  string:      string value (quoted)
  number:      number value
  literal:     true / false / null / undefined / [Circular]
  punctuation: braces, brackets, colons, item counts
  guide:       indent rule for an open node

slots: {}

token_contract:
  - json-viewer.key
  - json-viewer.string
  - json-viewer.number
  - json-viewer.literal
  - json-viewer.punctuation
  - json-viewer.guide

interaction_states: [default, expanded, collapsed]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/JsonViewer.tsx
    underlying_library: custom (Mantine primitives + tokens)
    exports: [JsonViewer, JsonViewerProps]
  storybook:
    path: apps/storybook/stories/JsonViewer.stories.tsx
  tokens:
    component: packages/tokens/src/components/json-viewer.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [payload-inspector, log-details]
pages_used_in: [trace-explorer, agent-chat, dashboard]
---

# AGENTIC DOCUMENTATION: JSONVIEWER

> **Implementation:** [`packages/ui/src/components/JsonViewer.tsx`](../../packages/ui/src/components/JsonViewer.tsx). Worked examples: [`trace-explorer.md`](../../docs/worked-examples/trace-explorer.md), [`agent-chat.md`](../../docs/worked-examples/agent-chat.md).

Read-only, collapsible JSON: tool-call arguments and results, span input/output, structured log fields.

## Contract
- **Takes no children** (`slots: {}`). Pass the parsed value as `data`. Don't `JSON.stringify` it first.
- `defaultExpandDepth` (default 2) controls how much starts open. Use 1 for big payloads.
- Circular references render as `[Circular]` instead of crashing. Shared references render normally.

## Not this component
- `CodeBlock`: source code or JSON the user should copy as text. It has a copy button and line numbers.
- `DiffView`: comparing two payloads.
- `DescriptionList`: a few flat fields a person reads, not a nested payload.

## Accessibility
Every object or array is a native `<details>`/`<summary>`, so it's keyboard-operable (Enter/Space) and announced as expandable with no script. Value types differ in syntax (quotes, keywords) as well as colour.

| Token | Resolves through | Light |
|---|---|---|
| `json-viewer.key` | `{text.primary}` | `#1a1a18` |
| `json-viewer.string` | `{text.success}` | `#15803d` |
| `json-viewer.number` | `{text.link}` | `#2563eb` |
| `json-viewer.literal` | `{text.warning}` | `#c2410c` |
| `json-viewer.punctuation` | `{text.secondary}` | `#6b6b66` |
| `json-viewer.guide` | `{border.default}` | `#e5e5e0` |

**Do:** Label it (`aria-label="Tool input"`); pair Input and Output viewers under clear headings.
**Don't:** Use it for editable JSON; render megabyte payloads without truncating upstream.
