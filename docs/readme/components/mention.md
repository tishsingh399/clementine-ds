# Mention

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/mention/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Mention.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Mention.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/mention.json)

## Overview

An inline @reference to a user or entity within text.

Status: `AI-Ready` · Enterprise layer. Token contract closed at 2 component-tier tokens.

## When to use

- Referencing people in comments/notes
- Linking entities inline

## When not to use

- Standalone user chips (use Pill/Avatar)
- Navigation links (use Anchor)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the inline reference |

## Usage guidelines

### Do
- Make it visually distinct + linkable
- Resolve to a real profile when possible

### Don't
- Style like plain text
- Mention unresolved/unknown users silently

## Accessibility

| Concern | Requirement |
|---|---|
| Distinction | Visually distinct; if linked, a real anchor |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `mention.bg` | `{surface.subtle}` | `#f3f3f0` |
| `mention.fg` | `{text.link}` | `#2563eb` |

## Library notes

```tsx
import { Mention } from '@clementine-ds/ui';

<Mention name="Tina Singh" href="/u/tina" />
```

## Related

- [Data-table pattern](../../patterns/data-table/index.md)
- [Trust, safety & governance](../../governance/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
