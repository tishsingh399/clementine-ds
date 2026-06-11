# ErrorState

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/error-state/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ErrorState.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ErrorState.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/error-state.json)

## Overview

A centered failure state with a cause and an optional retry.

Status: `AI-Ready`. Token contract closed at 5 component-tier tokens.

## When to use

- A request or action failed
- A view cannot load its data
- A recoverable error with a retry

## When not to use

- Empty data (use EmptyState)
- Field-level validation (use ValidationMessage)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the padded container on an error-subtle wash |
| `icon` | the error glyph |
| `title` | the headline |
| `description` | what went wrong |
| `action` | optional retry slot |

## Usage guidelines

### Do
- Say what failed in plain language
- Offer a retry or next step

### Don’t
- Expose raw stack traces
- Use color as the only error signal

## Accessibility

| Concern | Requirement |
|---|---|
| Live region | role="alert" announces the failure |
| Non-color | glyph + wording carry the error, not color alone |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `error-state.bg` | `{feedback.error-subtle}` | `#fef2f2` |
| `error-state.icon` | `{feedback.error}` | `#dc2626` |
| `error-state.title` | `{text.primary}` | `#1a1a18` |
| `error-state.description` | `{text.secondary}` | `#6b6b66` |
| `error-state.radius` | `{radius.lg}` | `8px` |

## Library notes

```tsx
import { ErrorState } from '@clementine-ds/ui';
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
