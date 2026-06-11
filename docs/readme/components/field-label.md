# FieldLabel

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/field-label/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/FieldLabel.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/FieldLabel.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/field-label.json)

## Overview

A form field label with optional required or optional markers.

Status: `AI-Ready`. Token contract closed at 3 component-tier tokens.

## When to use

- Labelling any form control
- Marking required vs optional fields

## When not to use

- Section headings (use a heading)
- Helper copy (use HelperText)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the label element |
| `required` | the required asterisk (with SR text) |
| `optional` | the muted optional marker |

## Usage guidelines

### Do
- Associate via htmlFor and the control id
- Mark required with the asterisk AND screen-reader text

### Don’t
- Use color (red asterisk) as the only required cue
- Hide labels for sighted users

## Accessibility

| Concern | Requirement |
|---|---|
| Association | htmlFor links the label to its control |
| Required | asterisk shape + visually-hidden "(required)" text, not color alone |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `field-label.fg` | `{text.primary}` | `#1a1a18` |
| `field-label.required` | `{feedback.error}` | `#dc2626` |
| `field-label.optional` | `{text.secondary}` | `#6b6b66` |

## Library notes

```tsx
import { FieldLabel } from '@clementine-ds/ui';
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
