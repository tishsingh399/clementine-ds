# FileInput

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/file-input/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/FileInput.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/FileInput.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/file-input.json)

## Overview

A control to pick one or more files, showing the chosen file name(s).

Status: `AI-Ready`. Token contract closed at 6 component-tier tokens.

## When to use

- Single/multi file selection in a form
- Avatar / document upload

## When not to use

- Drag-and-drop zones (use a dropzone)
- Inline image paste

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the trigger |
| `value` | selected file name(s) |
| `label` | field label |

## Usage guidelines

### Do
- Show the selected file name; allow clearing
- State accepted types + size limits
- Validate type/size and surface errors

### Don't
- Hide what was selected
- Accept everything silently then fail on submit

## Accessibility

| Concern | Requirement |
|---|---|
| Trigger | Labelled button exposing the native file input |
| Value | Selected file name announced |
| Error | aria-invalid + message |

## Token contract

6 component-tier tokens, defined in `packages/tokens/src/components/file-input.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `file-input.bg` | `{surface.elevated}` | `#ffffff` |
| `file-input.border` | `{border.strong}` | `#737370` |
| `file-input.border-focus` | `{focus.ring}` | `#f5631a` |
| `file-input.fg` | `{text.primary}` | `#1a1a18` |
| `file-input.placeholder` | `{text.tertiary}` | `#737370` |
| `file-input.radius` | `{radius.md}` | `6px` |

## Library notes

React: wrapper over Mantine `FileInput`.

```tsx
import { FileInput } from '@clementine-ds/ui';

<FileInput label="Upload evidence" placeholder="Pick a file" />
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
