# Loader

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/loader/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Loader.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Loader.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/loader.json)

## Overview

An indeterminate spinner for work of unknown duration. For known progress, use Progress; for content placeholders, use Skeleton.

Status: `AI-Ready`. Token contract closed at 1 component-tier tokens.

## When to use

- A short, unknown-duration wait
- Inside a button while submitting
- First paint before a spinner-appropriate fetch

## When not to use

- Known progress (use Progress)
- Content-shaped loading (use Skeleton)
- Waits over ~10s with no context

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the animated indicator |

## Usage guidelines

### Do
- Pair with aria-busy on the region and a text label
- Respect prefers-reduced-motion
- Keep it brief; escalate to Skeleton/Progress for longer waits

### Don't
- Use as the only signal for a long operation
- Animate when reduced motion is requested

## Accessibility

| Concern | Requirement |
|---|---|
| Role | status/progressbar with an accessible label |
| Reduced motion | Honor prefers-reduced-motion |

## Token contract

1 component-tier tokens, defined in `packages/tokens/src/components/loader.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `loader.color` | `{action.primary}` | `#2563eb` |

## Library notes

React: wrapper over Mantine `Loader`.

```tsx
import { Loader } from '@clementine-ds/ui';

<Loader type="oval" size="sm" />
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
