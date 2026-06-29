# ModelSelector

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/model-selector/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/ModelSelector.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ai/ModelSelector.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/model-selector.json)

## Overview

Pick the active model for a surface; the chosen model + prompt version should be logged with feedback.

Status: `AI-Ready` · Tray 4 (AI surface). Token contract closed at 5 component-tier tokens.

## When to use

- Letting users switch model tier (quality vs speed)
- Surfacing which model is active

## When not to use

- When the model is fixed by policy
- Hiding a security-relevant choice

## Anatomy

| Part | Purpose |
|---|---|
| `trigger` | the current-model control |
| `dropdown` | model options |

## Usage guidelines

### Do
- Show the active model clearly
- Record model + prompt version with telemetry (see registry)
- Default to the policy-approved model

### Don't
- Offer models the user is not entitled to
- Switch silently mid-task

## Accessibility

| Concern | Requirement |
|---|---|
| Combobox | aria-expanded; options are a listbox |
| Active | Selected model is announced |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `model-selector.bg` | `{surface.elevated}` | `#ffffff` |
| `model-selector.border` | `{border.default}` | `#e5e5e0` |
| `model-selector.fg` | `{text.primary}` | `#1a1a18` |
| `model-selector.icon` | `{text.secondary}` | `#6b6b66` |
| `model-selector.radius` | `{radius.md}` | `6px` |

## Library notes

```tsx
import { ModelSelector } from '@clementine-ds/ui';

<ModelSelector label='Model' models={['claude-opus-4-8','claude-haiku-4-5']} defaultValue='claude-opus-4-8' />
```

## Related

- [Behavior & state model](../../../behaviors/README.md)
- [Content & language](../../../content/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
