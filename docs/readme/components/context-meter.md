# ContextMeter

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/context-meter/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/ContextMeter.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ai/ContextMeter.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/context-meter.json)

## Overview

Shows how much of the context window is consumed (used / total), warning as it nears the limit.

Status: `AI-Ready` · Tray 4 (AI surface). Token contract closed at 4 component-tier tokens.

## When to use

- Long conversations approaching context limits
- Showing remaining budget

## When not to use

- When context is effectively unlimited for the task

## Anatomy

| Part | Purpose |
|---|---|
| `track` | unfilled budget |
| `fill` | used budget |
| `label` | used / total |

## Usage guidelines

### Do
- Warn before the limit; show the numbers
- Use role=meter with aria values

### Don't
- Surprise the user at the hard limit
- Show the bar without the figures

## Accessibility

| Concern | Requirement |
|---|---|
| Role | meter with aria-valuenow/min/max + label |
| Non-color | Numbers shown, not bar-only |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `context-meter.track` | `{surface.subtle}` | `#f3f3f0` |
| `context-meter.fill` | `{action.primary}` | `#2563eb` |
| `context-meter.fill-warning` | `{feedback.warning}` | `#ea580c` |
| `context-meter.label` | `{text.tertiary}` | `#737370` |

## Library notes

```tsx
import { ContextMeter } from '@clementine-ds/ui';

<ContextMeter used={48000} total={200000} />
```

## Related

- [Behavior & state model](../../../behaviors/README.md)
- [Content & language](../../../content/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
