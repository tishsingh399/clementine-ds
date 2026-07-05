# Stepper

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/stepper/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Stepper.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Stepper.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/stepper.json)

## Overview

Ordered progress through a multi-step flow (wizard, onboarding, guided setup).

Status: `AI-Ready`. Token contract closed at 7 component-tier tokens.

## When to use

- A long task split into ordered steps
- Onboarding / setup wizards
- Multi-stage forms

## When not to use

- Independent sections (use Accordion/Tabs)
- A 2-field form

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the step row |
| `step` | a single step |
| `completed` | completed-state content |
| `separator` | connector between steps |

## Usage guidelines

### Do
- Show total + current position; mark active with aria-current="step"
- Validate per step; preserve data on Back
- Gate the final commit behind a Review step

### Don't
- Hide the finish line
- Lose entered data when going Back
- Signal the active step by color alone

## Accessibility

| Concern | Requirement |
|---|---|
| Current | Active step carries aria-current="step" |
| Keyboard | Steps and controls are focusable in order |
| State | Icon + label, not color alone |

## Token contract

7 component-tier tokens, defined in `packages/tokens/src/components/stepper.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `stepper.bg-completed` | `{action.primary}` | `#2563eb` |
| `stepper.bg-active` | `{action.primary}` | `#2563eb` |
| `stepper.bg-pending` | `{surface.subtle}` | `#f3f3f0` |
| `stepper.fg-active` | `{text.primary}` | `#1a1a18` |
| `stepper.fg-pending` | `{text.tertiary}` | `#737370` |
| `stepper.separator` | `{border.default}` | `#e5e5e0` |
| `stepper.border-focus` | `{focus.ring}` | `#f5631a` |

## Library notes

React: wrapper over Mantine `Stepper`.

```tsx
import { Stepper } from '@clementine-ds/ui';

<Stepper active={1}><StepperStep label="Scope" /><StepperStep label="Review" /></Stepper>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
