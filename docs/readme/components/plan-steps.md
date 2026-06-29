# PlanSteps

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/plan-steps/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/PlanSteps.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ai/PlanSteps.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/plan-steps.json)

## Overview

An agent's task decomposition with live per-step status. Distinct from Stepper (a user-driven form flow).

Status: `AI-Ready` · Tray 4 (AI surface). Token contract closed at 5 component-tier tokens.

## When to use

- Multi-step agent tasks
- Showing live progress of a plan

## When not to use

- User-driven wizards (use Stepper)
- Chronological history (use Timeline)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the plan |
| `step` | a task |
| `marker` | status glyph |

## Usage guidelines

### Do
- Show status by glyph + text
- Update live as steps complete
- Surface errors on the failing step

### Don't
- Use color alone for status
- Hide which step is active

## Accessibility

| Concern | Requirement |
|---|---|
| Status | Glyph + label per step, not color alone |
| Live | Updates announced as steps change |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `plan.pending` | `{text.tertiary}` | `#a3a39e` |
| `plan.active` | `{action.primary}` | `#2563eb` |
| `plan.done` | `{feedback.success}` | `#16a34a` |
| `plan.error` | `{feedback.error}` | `#dc2626` |
| `plan.fg` | `{text.primary}` | `#1a1a18` |

## Library notes

```tsx
import { PlanSteps } from '@clementine-ds/ui';

<PlanSteps steps={[{ label:'Query sessions', status:'done' },{ label:'Summarize', status:'active' }]} />
```

## Related

- [Behavior & state model](../../../behaviors/README.md)
- [Content & language](../../../content/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
