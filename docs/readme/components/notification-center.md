# NotificationCenter

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/notification-center/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/NotificationCenter.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/NotificationCenter.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/notification-center.json)

## Overview

A panel of system/activity notifications, unread first, each markable.

Status: `AI-Ready` · Enterprise layer. Token contract closed at 6 component-tier tokens.

## When to use

- Bell/notification drawer
- Activity + system alerts in one place

## When not to use

- Transient feedback (use Notification/Toast)
- Inline page context (use Alert)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the panel |
| `item` | a notification |
| `unread` | unread marker |

## Usage guidelines

### Do
- Show unread distinctly (dot + weight)
- Group/sort by recency
- Let users mark read / clear

### Don't
- Rely on color alone for unread
- Lose notifications silently

## Accessibility

| Concern | Requirement |
|---|---|
| Unread | Marked by a dot + weight, not color alone |
| Items | Readable title + body + time |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `notification-center.bg` | `{surface.elevated}` | `#ffffff` |
| `notification-center.unread-bg` | `{surface.subtle}` | `#f3f3f0` |
| `notification-center.title` | `{text.primary}` | `#1a1a18` |
| `notification-center.body` | `{text.secondary}` | `#6b6b66` |
| `notification-center.dot` | `{action.primary}` | `#2563eb` |
| `notification-center.meta` | `{text.tertiary}` | `#737370` |

## Library notes

```tsx
import { NotificationCenter } from '@clementine-ds/ui';

<NotificationCenter notifications={[{ id:'1', title:'Session revoked', when:'2m', read:false }]} onMarkRead={mark} />
```

## Related

- [Data-table pattern](../../patterns/data-table/index.md)
- [Trust, safety & governance](../../governance/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
