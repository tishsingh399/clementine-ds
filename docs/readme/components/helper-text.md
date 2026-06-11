# HelperText

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/helper-text/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/HelperText.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/HelperText.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/helper-text.json)

## Overview

Supporting hint text shown beneath a form control.

Status: `AI-Ready`. Token contract closed at 1 component-tier token.

## When to use

- Explaining a field’s format or purpose
- Persistent guidance under an input

## When not to use

- Error messages (use ValidationMessage)
- Long-form docs

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the hint paragraph |

## Usage guidelines

### Do
- Keep it short and persistent
- Wire id to the control’s aria-describedby

### Don’t
- Use for validation errors
- Repeat the label verbatim

## Accessibility

| Concern | Requirement |
|---|---|
| Describedby | expose id and reference it from the control |
| Contrast | text.secondary is 5.7:1 on white |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `helper-text.fg` | `{text.secondary}` | `#6b6b66` |

## Library notes

```tsx
import { HelperText } from '@clementine-ds/ui';
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
