# LoadingState

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/loading-state/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/LoadingState.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/LoadingState.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/loading-state.json)

## Overview

A centered spinner with a label for a loading region.

Status: `AI-Ready`. Token contract closed at 3 component-tier tokens.

## When to use

- A region is fetching data
- A short, indeterminate wait
- Replacing content while it loads

## When not to use

- Skeletons fit better for content shape (use Skeleton)
- Determinate progress (use ProgressCircle / Progress)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the centered container |
| `spinner` | the animated indicator |
| `label` | the status text |

## Usage guidelines

### Do
- Give the spinner a text label
- Keep it centered in the region it replaces

### Don’t
- Block the whole screen for small loads
- Use color as the only cue

## Accessibility

| Concern | Requirement |
|---|---|
| Live region | role="status" + aria-live announces loading |
| Label | spinner is paired with visible text |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `loading-state.spinner` | `{action.primary}` | `#2563eb` |
| `loading-state.label` | `{text.secondary}` | `#6b6b66` |
| `loading-state.bg` | `{surface.default}` | `#fafaf8` |

## Library notes

```tsx
import { LoadingState } from '@clementine-ds/ui';
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
