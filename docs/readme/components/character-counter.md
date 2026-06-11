# CharacterCounter

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/character-counter/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/CharacterCounter.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/CharacterCounter.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/character-counter.json)

## Overview

A live character count for text inputs, with an over-limit state.

Status: `AI-Ready`. Token contract closed at 2 component-tier tokens.

## When to use

- Inputs/textarea with a max length
- Showing remaining characters

## When not to use

- Inputs without a limit
- Word-level limits (write a custom counter)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the count text |
| `over` | the over-limit color |

## Usage guidelines

### Do
- Show current and max ("12 / 280")
- Bold near the limit; turn red when over

### Don’t
- Signal over-limit by color alone (bold + value also change)
- Hide the limit until exceeded

## Accessibility

| Concern | Requirement |
|---|---|
| Live region | aria-live="polite" announces the count |
| Non-color | the number and weight change, not just color |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `character-counter.fg` | `{text.secondary}` | `#6b6b66` |
| `character-counter.over` | `{feedback.error}` | `#dc2626` |

## Library notes

```tsx
import { CharacterCounter } from '@clementine-ds/ui';
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
