# SessionList

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/session-list/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/SessionList.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ai/SessionList.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/session-list.json)

## Overview

Past conversations — searchable and resumable, with the active one marked.

Status: `AI-Ready` · Tray 4 (AI surface). Token contract closed at 3 component-tier tokens.

## When to use

- Conversation history sidebar
- Resuming past sessions

## When not to use

- Live message list (use ConversationThread)
- Generic navigation

## Anatomy

| Part | Purpose |
|---|---|
| `item` | a session row |
| `title` | conversation title |
| `meta` | timestamp |

## Usage guidelines

### Do
- Mark the active session (aria-current)
- Truncate long titles; show recency
- Make rows keyboard-activatable

### Don't
- Lose the active indicator
- Hide timestamps for long histories

## Accessibility

| Concern | Requirement |
|---|---|
| Active | aria-current=page on the open session |
| Rows | Each row is a focusable button |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `session-list.item-bg-hover` | `{surface.subtle}` | `#f3f3f0` |
| `session-list.fg` | `{text.primary}` | `#1a1a18` |
| `session-list.meta` | `{text.tertiary}` | `#737370` |

## Library notes

```tsx
import { SessionList } from '@clementine-ds/ui';

<SessionList sessions={[{ id:'1', title:'Access review', when:'2h' }]} activeId='1' onOpen={open} />
```

## Related

- [Behavior & state model](../../../behaviors/README.md)
- [Content & language](../../../content/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
