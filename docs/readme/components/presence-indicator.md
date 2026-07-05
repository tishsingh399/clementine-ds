# PresenceIndicator

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/presence-indicator/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/PresenceIndicator.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/PresenceIndicator.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/presence-indicator.json)

## Overview

Who is here, as a stack of avatars each with a presence dot.

Status: `AI-Ready` · Enterprise layer. Token contract closed at 5 component-tier tokens.

## When to use

- Live collaboration surfaces
- Showing who is viewing/active

## When not to use

- Static membership lists
- Single-user contexts

## Anatomy

| Part | Purpose |
|---|---|
| `avatar` | a member |
| `dot` | presence dot |

## Usage guidelines

### Do
- Pair dot with the person name (tooltip)
- Cap the stack with a +N

### Don't
- Convey presence by color alone
- Show stale presence as live

## Accessibility

| Concern | Requirement |
|---|---|
| Name | Each avatar has an accessible name + status |
| Non-color | Status is dot + label, not color alone |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `presence.online` | `{feedback.success}` | `#16a34a` |
| `presence.away` | `{feedback.warning}` | `#ea580c` |
| `presence.busy` | `{feedback.error}` | `#dc2626` |
| `presence.offline` | `{text.tertiary}` | `#737370` |
| `presence.ring` | `{surface.default}` | `#fafaf8` |

## Library notes

```tsx
import { PresenceIndicator } from '@clementine-ds/ui';

<PresenceIndicator users={[{ name:'Tina Singh', status:'online' }]} />
```

## Related

- [Data-table pattern](../../patterns/data-table/index.md)
- [Trust, safety & governance](../../governance/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
