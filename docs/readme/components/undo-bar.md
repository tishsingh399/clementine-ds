# UndoBar

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/ai/undo-bar/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/UndoBar.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ai/UndoBar.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/undo-bar.json)

## Overview

A transient bar confirming an agent action and offering to reverse it — reversibility as a core safety affordance.

Status: `AI-Ready` · Tray 4 (AI surface). Token contract closed at 2 component-tier tokens.

## When to use

- Right after a reversible agent action
- Bulk operations with undo

## When not to use

- Truly irreversible actions (gate them up front)
- Persistent status (use Alert)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the bar |
| `message` | what happened |
| `action` | undo |

## Usage guidelines

### Do
- Name what happened + offer Undo
- Auto-dismiss after a grace period
- Make Undo keyboard-reachable

### Don't
- Offer Undo for irreversible actions
- Dismiss before the user can react

## Accessibility

| Concern | Requirement |
|---|---|
| Live | role=status + aria-live |
| Undo | Labelled, focusable action |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `undo.bg` | `{text.primary}` | `#1a1a18` |
| `undo.fg` | `{text.on-action}` | `#ffffff` |

## Library notes

```tsx
import { UndoBar } from '@clementine-ds/ui';

<UndoBar message="Revoked 3 sessions" onUndo={restore} />
```

## Related

- [Behavior & state model](../../../behaviors/README.md)
- [Content & language](../../../content/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
