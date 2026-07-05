# EmptyState

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/empty-state/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/EmptyState.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/EmptyState.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/empty-state.json)

## Overview

A centered placeholder for no-data or cleared-filter views, with an optional next action.

Status: `AI-Ready`. Token contract closed at 5 component-tier tokens.

## When to use

- First-run / no-data views
- Cleared search or filter results
- Empty lists, tables, or boards

## When not to use

- Failures (use ErrorState)
- In-progress loads (use LoadingState)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the padded, centered container |
| `icon` | a decorative glyph (aria-hidden) |
| `title` | the headline |
| `description` | supporting text |
| `action` | optional CTA slot |

## Usage guidelines

### Do
- Pair a short title with a clear next action
- Keep the icon muted and decorative

### Don’t
- Blame the user for empty data
- Use for error or loading conditions

## Accessibility

| Concern | Requirement |
|---|---|
| Decorative icon | icon is aria-hidden; meaning is in the text |
| Contrast | title 16:1, description 5.7:1 on the subtle surface |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `empty-state.bg` | `{surface.subtle}` | `#f3f3f0` |
| `empty-state.icon` | `{text.tertiary}` | `#737370` |
| `empty-state.title` | `{text.primary}` | `#1a1a18` |
| `empty-state.description` | `{text.secondary}` | `#6b6b66` |
| `empty-state.radius` | `{radius.lg}` | `8px` |

## Library notes

```tsx
import { EmptyState } from '@clementine-ds/ui';
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
