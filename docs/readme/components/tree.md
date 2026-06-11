# Tree

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/tree/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Tree.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Tree.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/tree.json)

## Overview

A hierarchical, expandable node list — file trees, org/permission hierarchies, nested resources.

Status: `AI-Ready`. Token contract closed at 4 component-tier tokens.

## When to use

- Nested hierarchies
- Resource/permission trees
- File browsers

## When not to use

- Flat lists (use List)
- Ordered steps (use Stepper)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the tree |
| `node` | a node |
| `chevron` | expand toggle |
| `guide` | indent guide |

## Usage guidelines

### Do
- Support keyboard nav (arrows expand/collapse/move)
- Show selection + expansion clearly

### Don't
- Hide deep nodes with no affordance
- Rely on indentation alone

## Accessibility

| Concern | Requirement |
|---|---|
| Roles | role=tree/treeitem with aria-expanded + aria-selected |
| Keyboard | Arrows navigate + expand/collapse |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `tree.fg` | `{text.primary}` | `#1a1a18` |
| `tree.bg-selected` | `{surface.subtle}` | `#f3f3f0` |
| `tree.guide` | `{border.default}` | `#e5e5e0` |
| `tree.chevron` | `{text.secondary}` | `#6b6b66` |

## Library notes

```tsx
import { Tree } from '@clementine-ds/ui';

<Tree data={[{ value:'access', label:'Access', children:[{ value:'standing', label:'Standing' }] }]} />
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
