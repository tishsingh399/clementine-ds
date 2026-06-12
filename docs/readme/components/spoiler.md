# Spoiler

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/spoiler/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Spoiler.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Spoiler.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/spoiler.json)

## Overview

Truncate long content to a max height with a show-more/less toggle.

Status: `AI-Ready`. Token contract closed at 1 component-tier tokens.

## When to use

- Long descriptions or logs that should default-collapse
- Comment bodies, JSON blobs

## When not to use

- Distinct sections (use Accordion)
- Short content that fits

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the content region |
| `control` | show more/less toggle |

## Usage guidelines

### Do
- Set a sensible max height; label the toggle clearly
- Keep the toggle keyboard-operable

### Don't
- Hide essential content behind it
- Use for navigation

## Accessibility

| Concern | Requirement |
|---|---|
| Toggle | Button with aria-expanded controlling the region |
| Keyboard | Enter/Space toggles |

## Token contract

1 component-tier tokens, defined in `packages/tokens/src/components/spoiler.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `spoiler.control` | `{text.link}` | `#2563eb` |

## Library notes

React: wrapper over Mantine `Spoiler`.

```tsx
import { Spoiler } from '@clementine-ds/ui';

<Spoiler maxHeight={48} showLabel="Show more" hideLabel="Hide">…</Spoiler>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
