# MessageActions

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/message-actions/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/MessageActions.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ai/MessageActions.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/message-actions.json)

## Overview

The action row on a Message — copy, edit, regenerate, branch. Only handlers you pass render.

Status: `AI-Ready` · Tray 4 (AI surface). Token contract closed at 2 component-tier tokens.

## When to use

- Per-message actions in chat
- Hover/focus affordances on a turn

## When not to use

- Page-level actions (use a toolbar)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the action row |
| `action` | one icon action |

## Usage guidelines

### Do
- Label every icon; pair with Tooltip
- Show on hover/focus, keep keyboard-reachable

### Don't
- Hide critical actions behind hover only
- Ship unlabeled icons

## Accessibility

| Concern | Requirement |
|---|---|
| Names | Each action has an aria-label |
| Keyboard | Reachable without hover |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `message-actions.fg` | `{text.secondary}` | `#6b6b66` |
| `message-actions.fg-hover` | `{text.primary}` | `#1a1a18` |

## Library notes

```tsx
import { MessageActions } from '@clementine-ds/ui';

<MessageActions onCopy={copy} onRegenerate={regen} />
```

## Related

- [Behavior & state model](../../../behaviors/README.md)
- [Content & language](../../../content/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
