# ProgressCircle

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/progress-circle/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ProgressCircle.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ProgressCircle.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/progress-circle.json)

## Overview

A circular determinate progress indicator with a center label.

Status: `AI-Ready`. Token contract closed at 3 component-tier tokens.

## When to use

- Determinate progress in a compact space
- Upload / processing percentage
- Dashboard gauges

## When not to use

- Indeterminate waits (use LoadingState)
- Linear contexts (use Progress)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the progressbar wrapper |
| `track` | the unfilled ring |
| `indicator` | the filled arc |
| `label` | the center percentage |

## Usage guidelines

### Do
- Show the numeric value in the center
- Set aria-valuenow for assistive tech

### Don’t
- Use for indeterminate states
- Convey the value by color alone

## Accessibility

| Concern | Requirement |
|---|---|
| Role | role="progressbar" with aria-valuenow/min/max |
| Non-color | percentage text states the value |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `progress-circle.track` | `{surface.subtle}` | `#f3f3f0` |
| `progress-circle.indicator` | `{action.primary}` | `#2563eb` |
| `progress-circle.label` | `{text.primary}` | `#1a1a18` |

## Library notes

```tsx
import { ProgressCircle } from '@clementine-ds/ui';
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
