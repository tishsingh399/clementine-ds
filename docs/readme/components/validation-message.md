# ValidationMessage

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/validation-message/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ValidationMessage.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ValidationMessage.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/validation-message.json)

## Overview

Inline field validation feedback for error, warning, or success.

Status: `AI-Ready`. Token contract closed at 4 component-tier tokens.

## When to use

- Field-level validation under a control
- Inline success/warning on a field

## When not to use

- Page-level errors (use ErrorState / Alert)
- Persistent hints (use HelperText)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the inline row |
| `icon` | the status glyph (shape per status) |
| `text` | the high-contrast message |

## Usage guidelines

### Do
- Tie error messages to the field via aria-describedby
- Lead with the glyph and plain wording

### Don’t
- Signal validity by color alone
- Write vague messages like "invalid"

## Accessibility

| Concern | Requirement |
|---|---|
| Live region | role="alert" on error announces immediately |
| Non-color | glyph shape + wording convey status; text stays text.primary |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `validation-message.fg` | `{text.primary}` | `#1a1a18` |
| `validation-message.error` | `{feedback.error}` | `#dc2626` |
| `validation-message.warning` | `{feedback.warning}` | `#ea580c` |
| `validation-message.success` | `{feedback.success}` | `#16a34a` |

## Library notes

```tsx
import { ValidationMessage } from '@clementine-ds/ui';
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
