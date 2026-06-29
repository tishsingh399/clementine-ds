# DiffView

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/diff-view/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/DiffView.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ai/DiffView.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/diff-view.json)

## Overview

A proposed change shown as added/removed lines with accept/reject — pairs with an agent suggesting an edit.

Status: `AI-Ready` · Tray 4 (AI surface). Token contract closed at 4 component-tier tokens.

## When to use

- Agent-proposed code/text edits
- Review-before-apply flows

## When not to use

- Final committed content
- Non-diff output (use CodeBlock)

## Anatomy

| Part | Purpose |
|---|---|
| `line` | a diff line |
| `footer` | accept/reject controls |

## Usage guidelines

### Do
- Mark add/remove with sign + color (not color alone)
- Offer per-change accept/reject

### Don't
- Apply changes silently
- Use color as the only signal

## Accessibility

| Concern | Requirement |
|---|---|
| Non-color | +/- prefixes mark add/remove, not color alone |
| Controls | Accept/Reject are labelled buttons |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `diff.added-bg` | `{feedback.success-subtle}` | `#f0fdf4` |
| `diff.removed-bg` | `{feedback.error-subtle}` | `#fef2f2` |
| `diff.fg` | `{text.primary}` | `#1a1a18` |
| `diff.gutter` | `{border.default}` | `#e5e5e0` |

## Library notes

```tsx
import { DiffView } from '@clementine-ds/ui';

<DiffView lines={[{ type:'remove', text:'old' },{ type:'add', text:'new' }]} onAccept={ok} onReject={no} />
```

## Related

- [Behavior & state model](../../../behaviors/README.md)
- [Content & language](../../../content/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
