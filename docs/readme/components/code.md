# Code

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/code/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Code.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Code.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/code.json)

## Overview

Monospace formatting for code, commands, and literal values — inline or as a block.

Status: `AI-Ready`. Token contract closed at 3 component-tier tokens.

## When to use

- Inline commands/identifiers in prose
- Short code blocks
- Token names and literal values

## When not to use

- Long, scrollable code (use a code viewer/ArtifactFrame)
- Emphasis (use bold/Text)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | inline or block monospace |

## Usage guidelines

### Do
- Use inline for short literals, block for multi-line
- Keep blocks short; lift big output into an ArtifactFrame

### Don't
- Use for emphasis
- Put paragraphs of prose in Code

## Accessibility

| Concern | Requirement |
|---|---|
| Contrast | Monospace text meets 4.5:1 on the subtle fill |
| Semantics | Renders as <code> |

## Token contract

3 component-tier tokens, defined in `packages/tokens/src/components/code.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `code.bg` | `{surface.subtle}` | `#f3f3f0` |
| `code.fg` | `{text.primary}` | `#1a1a18` |
| `code.radius` | `{radius.sm}` | `4px` |

## Library notes

React: wrapper over Mantine `Code`.

```tsx
import { Code } from '@clementine-ds/ui';

Run <Code>pnpm install</Code>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
