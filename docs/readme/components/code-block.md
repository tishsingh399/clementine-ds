# CodeBlock

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/ai/code-block/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/CodeBlock.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ai/CodeBlock.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/code-block.json)

## Overview

A copyable code block for model-generated code, with a filename/language header. For large output, wrap in an ArtifactFrame.

Status: `AI-Ready` · Tray 4 (AI surface). Token contract closed at 6 component-tier tokens.

## When to use

- Short model-generated code/commands
- Snippets the user will copy

## When not to use

- Inline code (use Code)
- Large/reusable output (use ArtifactFrame)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the block |
| `header` | filename/language + copy |
| `body` | the code |
| `copy` | copy button |

## Usage guidelines

### Do
- Always offer copy with clear feedback
- Label the language/filename
- Wrap big output in an ArtifactFrame

### Don't
- Force horizontal scroll for one long line without wrap option
- Drop the language label

## Accessibility

| Concern | Requirement |
|---|---|
| Copy | Button has an aria-label and announces "Copied" |
| Contrast | Monospace meets 4.5:1 on the surface |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `code-block.bg` | `{surface.elevated}` | `#ffffff` |
| `code-block.header-bg` | `{surface.subtle}` | `#f3f3f0` |
| `code-block.border` | `{border.default}` | `#e5e5e0` |
| `code-block.fg` | `{text.primary}` | `#1a1a18` |
| `code-block.filename` | `{text.tertiary}` | `#a3a39e` |
| `code-block.radius` | `{radius.md}` | `6px` |

## Library notes

```tsx
import { CodeBlock } from '@clementine-ds/ui';

<CodeBlock filename='revoke.ts' code={'await revokeSessions(ids);'} />
```

## Related

- [Behavior & state model](../../../behaviors/README.md)
- [Content & language](../../../content/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
