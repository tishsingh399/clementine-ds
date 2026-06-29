# AgentCard

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/agent-card/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/AgentCard.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ai/AgentCard.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/agent-card.json)

## Overview

A profile card for an agent — identity, what it does, capabilities, and owner. Used in rosters and pickers.

Status: `AI-Ready` · Tray 4 (AI surface). Token contract closed at 4 component-tier tokens.

## When to use

- Agent directories / rosters
- Choosing among agents
- Showing an agent's scope

## When not to use

- A model choice (use ModelSelector)
- Inline status (use AgentStatus)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the card |
| `name` | agent name |
| `capabilities` | capability badges |
| `owner` | owner line |

## Usage guidelines

### Do
- State capabilities + scope + owner
- Keep the description concrete

### Don't
- Overstate capabilities
- Hide limits/scope

## Accessibility

| Concern | Requirement |
|---|---|
| Structure | Name + meta + capability badges are readable in order |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `agent-card.bg` | `{surface.elevated}` | `#ffffff` |
| `agent-card.border` | `{border.default}` | `#e5e5e0` |
| `agent-card.name` | `{text.primary}` | `#1a1a18` |
| `agent-card.meta` | `{text.secondary}` | `#6b6b66` |

## Library notes

```tsx
import { AgentCard } from '@clementine-ds/ui';

<AgentCard name='Access Auditor' description='Reviews standing access' capabilities={['read','report']} owner='Security' />
```

## Related

- [Behavior & state model](../../../behaviors/README.md)
- [Content & language](../../../content/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
