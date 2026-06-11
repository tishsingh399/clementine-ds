# Slider

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/slider/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Slider.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Slider.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/slider.json)

## Overview

Select a value from a continuous range by dragging (thresholds, volume, sensitivity).

Status: `AI-Ready`. Token contract closed at 6 component-tier tokens.

## When to use

- A range where the exact number is secondary
- Threshold / sensitivity tuning

## When not to use

- Precise numeric entry (use NumberInput)
- A small discrete set (use SegmentedControl)

## Anatomy

| Part | Purpose |
|---|---|
| `track` | the rail |
| `filled` | the filled portion |
| `thumb` | the draggable handle |
| `mark` | a tick |
| `label` | value bubble |

## Usage guidelines

### Do
- Show the current value (bubble or adjacent text)
- Support keyboard (arrows, Home/End)
- Add marks for meaningful stops

### Don't
- Use when the exact value matters
- Rely on position alone with no value readout

## Accessibility

| Concern | Requirement |
|---|---|
| Role | slider with aria-valuenow/min/max + a label |
| Keyboard | Arrows step; Home/End jump to bounds |
| Readout | Current value is shown, not just the thumb position |

## Token contract

6 component-tier tokens, defined in `packages/tokens/src/components/slider.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `slider.track` | `{surface.subtle}` | `#f3f3f0` |
| `slider.track-filled` | `{action.primary}` | `#2563eb` |
| `slider.thumb` | `{surface.elevated}` | `#ffffff` |
| `slider.thumb-border` | `{action.primary}` | `#2563eb` |
| `slider.mark` | `{border.default}` | `#e5e5e0` |
| `slider.label` | `{text.on-action}` | `#ffffff` |

## Library notes

React: wrapper over Mantine `Slider`.

```tsx
import { Slider } from '@clementine-ds/ui';

<Slider defaultValue={40} marks={[{ value: 0 }, { value: 50 }, { value: 100 }]} />
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
