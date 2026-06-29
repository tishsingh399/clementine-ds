# ConversationThread

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/conversation-thread/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/ConversationThread.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ai/ConversationThread.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/conversation-thread.json)

## Overview

The scrollable container for a conversation — holds Message turns with consistent spacing and an aria-live log region.

Status: `AI-Ready` · Tray 4 (AI surface). Token contract closed at 2 component-tier tokens.

## When to use

- Chat / assistant surfaces
- Any multi-turn exchange

## When not to use

- A single message
- Non-conversational lists

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the scroll container |
| `divider` | day/section divider |

## Usage guidelines

### Do
- Announce new turns politely (aria-live)
- Group with day dividers for long histories
- Keep newest in view

### Don't
- Steal focus on each new message
- Reflow the whole thread on append

## Accessibility

| Concern | Requirement |
|---|---|
| Live region | role=log + aria-live=polite |
| Scroll | Keyboard-scrollable; new content announced |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `thread.bg` | `{surface.default}` | `#fafaf8` |
| `thread.divider` | `{border.default}` | `#e5e5e0` |

## Library notes

```tsx
import { ConversationThread } from '@clementine-ds/ui';

<ConversationThread><Message role="user">…</Message><Message role="assistant">…</Message></ConversationThread>
```

## Related

- [Behavior & state model](../../../behaviors/README.md)
- [Content & language](../../../content/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
