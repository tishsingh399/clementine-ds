# Breadcrumbs

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/breadcrumbs/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Breadcrumbs.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Breadcrumbs.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/breadcrumbs.json)

## Overview

A hierarchical trail showing where the current page sits, with one-click jumps to ancestors.

Status: `AI-Ready`. Token contract closed at 3 component-tier tokens.

## When to use

- Deep hierarchies (3+ levels)
- Detail pages reachable from a list
- Settings sub-pages

## When not to use

- Flat apps with 1-2 levels
- As primary navigation (use a nav/sidebar)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | nav landmark |
| `item` | a breadcrumb link |
| `current` | the current page (aria-current) |
| `separator` | visual divider |

## Usage guidelines

### Do
- Mark the last item as current (not a link)
- Keep labels short — match the page titles
- Truncate the middle with an ellipsis on small screens

### Don't
- Link the current page to itself
- Use it as the only way back
- Rely on the separator glyph alone for structure

## Accessibility

| Concern | Requirement |
|---|---|
| Landmark | Renders inside a nav with an aria-label |
| Current | Last item carries aria-current="page" |
| Keyboard | Each ancestor is a focusable link |

## Token contract

3 component-tier tokens, defined in `packages/tokens/src/components/breadcrumbs.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `breadcrumbs.fg` | `{text.secondary}` | `#6b6b66` |
| `breadcrumbs.fg-current` | `{text.primary}` | `#1a1a18` |
| `breadcrumbs.separator` | `{text.tertiary}` | `#737370` |

## Library notes

React: wrapper over Mantine `Breadcrumbs`.

```tsx
import { Breadcrumbs } from '@clementine-ds/ui';

<Breadcrumbs><Anchor href="/">Home</Anchor><span>Current</span></Breadcrumbs>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
