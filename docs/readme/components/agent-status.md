# AgentStatus

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/agent-status/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/AgentStatus.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ai/AgentStatus.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/agent-status.json)

## Overview

The agent's current state — idle / thinking / calling tool / waiting on you / done / error / refused — shown with an indicator AND text.

Status: `AI-Ready` · Tray 4 (AI surface). Token contract closed at 5 component-tier tokens.

## When to use

- Surfacing what the agent is doing right now
- Header/footer status in a chat

## When not to use

- Per-step plan status (use PlanSteps)
- Final outcome only

## Anatomy

| Part | Purpose |
|---|---|
| `indicator` | dot or spinner |
| `label` | state text |

## Usage guidelines

### Do
- Pair the indicator with text
- Announce changes politely
- Distinguish waiting-on-you clearly

### Don't
- Use a bare color/spinner with no label
- Conflate error with refusal

## Accessibility

| Concern | Requirement |
|---|---|
| Live | role=status + aria-live |
| Non-color | Indicator + text, not color alone |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `agent-status.idle` | `{text.tertiary}` | `#6e6b65` |
| `agent-status.busy` | `{action.primary}` | `#305eb7` |
| `agent-status.waiting` | `{feedback.warning}` | `#855905` |
| `agent-status.done` | `{feedback.success}` | `#198044` |
| `agent-status.error` | `{feedback.error}` | `#c1332f` |

## Library notes

```tsx
import { AgentStatus } from '@clementine-ds/ui';

<AgentStatus state="thinking" />
```

## Related

- [Behavior & state model](../../../behaviors/README.md)
- [Content & language](../../../content/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
