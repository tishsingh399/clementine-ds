# DescriptionList

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/description-list/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/DescriptionList.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/DescriptionList.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/description-list.json)

## Overview

Term/detail pairs for record metadata and key-value summaries; renders semantic dl/dt/dd.

Status: `AI-Ready`. Token contract closed at 2 component-tier tokens.

## When to use

- Record detail panels
- Key-value summaries
- Settings read-outs

## When not to use

- Tabular rows (use Table)
- Bulleted content (use List)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the dl |
| `term` | dt |
| `detail` | dd |

## Usage guidelines

### Do
- Use real dl/dt/dd
- Keep terms short + consistent

### Don't
- Fake it with a two-column table when it is metadata
- Mix unrelated pairs

## Accessibility

| Concern | Requirement |
|---|---|
| Semantics | Native dl associates each term with its detail |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `description-list.term` | `{text.secondary}` | `#6b6b66` |
| `description-list.detail` | `{text.primary}` | `#1a1a18` |

## Library notes

```tsx
import { DescriptionList } from '@clementine-ds/ui';

<DescriptionList items={[{ term:'Owner', detail:'Tina Singh' }]} />
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
