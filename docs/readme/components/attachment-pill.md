# AttachmentPill

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/attachment-pill/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/AttachmentPill.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ai/AttachmentPill.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/attachment-pill.json)

## Overview

A file attached to a prompt, shown as a removable pill in the Composer.

Status: `AI-Ready` · Tray 4 (AI surface). Token contract closed at 5 component-tier tokens.

## When to use

- Files added to a prompt
- Showing uploaded context
- Removable attachments

## When not to use

- A standalone file list (use a table/list)
- Download links

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the pill |
| `name` | file name |
| `meta` | file size |
| `remove` | remove button |

## Usage guidelines

### Do
- Truncate long names with an ellipsis; show size
- Make remove keyboard-reachable + labelled
- Show type/size errors before send

### Don't
- Hide that a file is attached
- Make remove unreachable by keyboard

## Accessibility

| Concern | Requirement |
|---|---|
| Remove | Button labelled "Remove <name>" |
| Name | Truncated visually but full name available |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `attachment.bg` | `{surface.subtle}` | `#f3f3f0` |
| `attachment.border` | `{border.default}` | `#e5e5e0` |
| `attachment.fg` | `{text.primary}` | `#1a1a18` |
| `attachment.meta` | `{text.secondary}` | `#6b6b66` |
| `attachment.radius` | `{radius.md}` | `6px` |

## Library notes

```tsx
import { AttachmentPill } from '@clementine-ds/ui';

<AttachmentPill name='access-review-q3.pdf' size='240 KB' onRemove={remove} />
```

## Related

- [Behavior & state model](../../../behaviors/README.md)
- [Content & language](../../../content/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
