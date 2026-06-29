# AgentPicker

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/agent-picker/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/AgentPicker.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ai/AgentPicker.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/agent-picker.json)

## Overview

Choose or route between agents. Distinct from ModelSelector (which picks a model).

Status: `AI-Ready` · Tray 4 (AI surface). Token contract closed at 4 component-tier tokens.

## When to use

- Multiple specialized agents
- Routing a task to the right agent

## When not to use

- Picking a model tier (use ModelSelector)
- When the agent is fixed

## Anatomy

| Part | Purpose |
|---|---|
| `trigger` | current agent |
| `dropdown` | agent options |

## Usage guidelines

### Do
- Show the active agent clearly
- Pair with AgentCard detail on selection

### Don't
- Offer agents the user can't use
- Switch agents silently mid-task

## Accessibility

| Concern | Requirement |
|---|---|
| Combobox | aria-expanded; options are a listbox |
| Active | Selected agent announced |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `agent-picker.bg` | `{surface.elevated}` | `#ffffff` |
| `agent-picker.border` | `{border.default}` | `#e5e5e0` |
| `agent-picker.fg` | `{text.primary}` | `#1a1a18` |
| `agent-picker.icon` | `{text.secondary}` | `#6b6b66` |

## Library notes

```tsx
import { AgentPicker } from '@clementine-ds/ui';

<AgentPicker agents={['Access Auditor','Policy Drafter']} defaultValue='Access Auditor' />
```

## Related

- [Behavior & state model](../../../behaviors/README.md)
- [Content & language](../../../content/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
