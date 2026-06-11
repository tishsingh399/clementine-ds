# Image

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/image/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Image.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Image.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/image.json)

## Overview

A responsive image with a fallback for load errors.

Status: `AI-Ready`. Token contract closed at 2 component-tier tokens.

## When to use

- Content imagery
- Thumbnails, previews

## When not to use

- Icons (use ThemeIcon/icon set)
- Decorative shapes

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the img |
| `fallback` | placeholder on load error |

## Usage guidelines

### Do
- Always set alt (empty alt="" only when decorative)
- Provide a fallback
- Set width/height to avoid layout shift

### Don't
- Omit alt
- Stretch/distort aspect ratio

## Accessibility

| Concern | Requirement |
|---|---|
| Alt | Meaningful alt, or alt="" if decorative |
| Layout | Reserve space to prevent shift |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `image.bg` | `{surface.subtle}` | `#f3f3f0` |
| `image.radius` | `{radius.md}` | `6px` |

## Library notes

```tsx
import { Image } from '@clementine-ds/ui';

<Image src="/preview.png" alt="Session recording preview" w={200} radius="md" />
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
