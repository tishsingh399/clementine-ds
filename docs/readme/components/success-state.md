# SuccessState

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/success-state/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/SuccessState.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/SuccessState.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/success-state.json)

## Overview

A centered confirmation state for a completed flow.

Status: `AI-Ready`. Token contract closed at 5 component-tier tokens.

## When to use

- A multi-step flow completed
- A submission succeeded
- A destructive action confirmed safely

## When not to use

- Transient confirmations (use a Toast)
- Inline field success (use ValidationMessage)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the padded container on a success-subtle wash |
| `icon` | the success glyph |
| `title` | the headline |
| `description` | confirmation detail |
| `action` | optional next-step slot |

## Usage guidelines

### Do
- Confirm what happened and what is next
- Keep it brief and positive

### Don’t
- Use as a permanent banner
- Rely on the green color alone

## Accessibility

| Concern | Requirement |
|---|---|
| Live region | role="status" announces success politely |
| Non-color | glyph + wording carry success, not color alone |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `success-state.bg` | `{feedback.success-subtle}` | `#f0fdf4` |
| `success-state.icon` | `{feedback.success}` | `#16a34a` |
| `success-state.title` | `{text.primary}` | `#1a1a18` |
| `success-state.description` | `{text.secondary}` | `#6b6b66` |
| `success-state.radius` | `{radius.lg}` | `8px` |

## Library notes

```tsx
import { SuccessState } from '@clementine-ds/ui';
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
