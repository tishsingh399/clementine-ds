# CommentThread

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/comment-thread/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/CommentThread.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/CommentThread.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/comment-thread.json)

## Overview

A list of comments plus a composer for adding more.

Status: `AI-Ready` · Enterprise layer. Token contract closed at 3 component-tier tokens.

## When to use

- Discussion on a record/request
- Review + approval notes

## When not to use

- Chat with an agent (use ConversationThread)
- Activity logs (use ActivityFeed)

## Anatomy

| Part | Purpose |
|---|---|
| `comment` | one comment |
| `composer` | add-comment input |

## Usage guidelines

### Do
- Attribute + timestamp each comment
- Support @mentions
- Disable submit on empty

### Don't
- Lose draft text
- Allow empty comments

## Accessibility

| Concern | Requirement |
|---|---|
| Structure | Author + time + body per comment |
| Composer | Labelled input + submit |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `comment-thread.author` | `{text.primary}` | `#1a1a18` |
| `comment-thread.body` | `{text.primary}` | `#1a1a18` |
| `comment-thread.meta` | `{text.tertiary}` | `#737370` |

## Library notes

```tsx
import { CommentThread } from '@clementine-ds/ui';

<CommentThread comments={[{ id:'1', author:'Jordan', body:'Approved', when:'1h' }]} onSubmit={add} />
```

## Related

- [Data-table pattern](../../patterns/data-table/index.md)
- [Trust, safety & governance](../../governance/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
