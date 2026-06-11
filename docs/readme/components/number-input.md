# NumberInput

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/number-input/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/NumberInput.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/NumberInput.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/number-input.json)

## Overview

A numeric input with optional steppers, min/max, and formatting (seats, quotas, counts).

Status: `AI-Ready`. Token contract closed at 6 component-tier tokens.

## When to use

- Bounded numeric entry
- Quantity/seat counts
- Values with min/max/step

## When not to use

- Free text (use TextInput)
- A range you slide (use Slider)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the input |
| `stepper` | increment/decrement controls |
| `label` | field label |

## Usage guidelines

### Do
- Set min/max/step to constrain input
- Right-align numerals in tables
- Show units in the label or suffix

### Don't
- Use for non-numeric data
- Hide validation errors

## Accessibility

| Concern | Requirement |
|---|---|
| Role | spinbutton with aria-valuenow/min/max |
| Keyboard | Arrow keys step the value |
| Error | aria-invalid + a message, not color alone |

## Token contract

6 component-tier tokens, defined in `packages/tokens/src/components/number-input.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `number-input.bg` | `{surface.elevated}` | `#ffffff` |
| `number-input.border` | `{border.strong}` | `#d4d4cf` |
| `number-input.border-focus` | `{focus.ring}` | `#ff8040` |
| `number-input.fg` | `{text.primary}` | `#1a1a18` |
| `number-input.placeholder` | `{text.tertiary}` | `#a3a39e` |
| `number-input.radius` | `{radius.md}` | `6px` |

## Library notes

React: wrapper over Mantine `NumberInput`.

```tsx
import { NumberInput } from '@clementine-ds/ui';

<NumberInput label="Seats" placeholder="0" min={0} max={100} />
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
