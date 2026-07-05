# ActivityFeed

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/activity-feed/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ActivityFeed.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ActivityFeed.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/activity-feed.json)

## Overview

A chronological stream of who-did-what-when (audit-adjacent, human-readable).

Status: `AI-Ready` · Enterprise layer. Token contract closed at 3 component-tier tokens.

## When to use

- Recent activity panels
- Record history
- Audit-adjacent feeds

## When not to use

- Formal audit logs (use AuditLogViewer)
- Process steps (use Timeline)

## Anatomy

| Part | Purpose |
|---|---|
| `item` | an activity |
| `actor` | who |
| `action` | what |
| `meta` | when |

## Usage guidelines

### Do
- Attribute each item to an actor + time
- Order consistently (newest first)

### Don't
- Drop attribution
- Mix orderings

## Accessibility

| Concern | Requirement |
|---|---|
| Structure | Each item reads actor + action + time |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `activity-feed.actor` | `{text.primary}` | `#1a1a18` |
| `activity-feed.action` | `{text.primary}` | `#1a1a18` |
| `activity-feed.meta` | `{text.tertiary}` | `#737370` |

## Library notes

```tsx
import { ActivityFeed } from '@clementine-ds/ui';

<ActivityFeed items={[{ id:'1', actor:'Tina', action:'revoked 3 sessions', when:'2m ago' }]} />
```

## Related

- [Data-table pattern](../../patterns/data-table/index.md)
- [Trust, safety & governance](../../governance/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
