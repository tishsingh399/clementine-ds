# SegmentedControl

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/segmented-control/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/SegmentedControl.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/SegmentedControl.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/segmented-control.json)

## Overview

Pick one of a small set of mutually-exclusive options — a compact, styled radio group.

Status: `AI-Ready`. Token contract closed at 5 component-tier tokens.

## When to use

- 2-5 mutually-exclusive views (Day/Week/Month)
- Toggling a display mode
- Inline filters with few options

## When not to use

- Many options (use Select)
- Multi-select (use Chips)
- A binary on/off (use Switch)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the track |
| `item` | a segment |
| `indicator` | the sliding active fill |

## Usage guidelines

### Do
- Keep to 2-5 short options
- Default to the most common choice
- Use full-width inside narrow containers

### Don't
- Overflow with long labels
- Use for more than ~5 options
- Hide the active segment behind color alone

## Accessibility

| Concern | Requirement |
|---|---|
| Role | radiogroup with aria-checked on the active segment |
| Keyboard | Arrow keys move; Space selects |
| Active | Fill + label weight, not color alone |

## Token contract

5 component-tier tokens, defined in `packages/tokens/src/components/segmented-control.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `segmented-control.bg` | `{surface.subtle}` | `#f3f3f0` |
| `segmented-control.bg-active` | `{surface.elevated}` | `#ffffff` |
| `segmented-control.fg` | `{text.secondary}` | `#6b6b66` |
| `segmented-control.fg-active` | `{text.primary}` | `#1a1a18` |
| `segmented-control.radius` | `{radius.md}` | `6px` |

## Library notes

React: wrapper over Mantine `SegmentedControl`.

```tsx
import { SegmentedControl } from '@clementine-ds/ui';

<SegmentedControl data={['Day','Week','Month']} defaultValue='Week' />
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
