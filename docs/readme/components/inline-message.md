# InlineMessage

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/inline-message/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/InlineMessage.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/InlineMessage.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/inline-message.json)

## Overview

A compact inline status line (icon + text) for info, success, warning, or error.

Status: `AI-Ready`. Token contract closed at 5 component-tier tokens.

## When to use

- A short status note next to content
- Lightweight inline feedback below a control
- Non-blocking hints

## When not to use

- Page-level alerts (use Alert / banner)
- Field validation (use ValidationMessage)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the inline row |
| `icon` | the status glyph (shape differs per status) |
| `text` | the high-contrast message |

## Usage guidelines

### Do
- Keep messages to one line where possible
- Let the glyph shape and wording carry the status

### Don’t
- Rely on the icon color alone (WCAG 1.4.1)
- Use for long-form content

## Accessibility

| Concern | Requirement |
|---|---|
| Non-color | glyph shape + wording convey status; color is supplementary |
| Contrast | message text stays at text.primary (16:1) |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `inline-message.fg` | `{text.primary}` | `#1a1a18` |
| `inline-message.info` | `{text.secondary}` | `#6b6b66` |
| `inline-message.success` | `{feedback.success}` | `#16a34a` |
| `inline-message.warning` | `{feedback.warning}` | `#ea580c` |
| `inline-message.error` | `{feedback.error}` | `#dc2626` |

## Library notes

```tsx
import { InlineMessage } from '@clementine-ds/ui';
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
