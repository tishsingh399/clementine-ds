# TagsInput

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/tags-input/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/TagsInput.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/TagsInput.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/tags-input.json)

## Overview

Free-text entry of multiple values as pills (labels, keywords) — optionally with suggestions.

Status: `AI-Ready`. Token contract closed at 8 component-tier tokens.

## When to use

- Arbitrary tags/labels
- Email or keyword lists
- Inputs where values are not a fixed set

## When not to use

- A fixed option set (use MultiSelect)
- Single value (use TextInput)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the input |
| `pill` | an entered tag |
| `label` | field label |

## Usage guidelines

### Do
- Confirm a tag on Enter/comma; make pills removable
- De-duplicate; optionally validate each tag
- Offer suggestions when a known set exists

### Don't
- Allow invalid/duplicate tags silently
- Lose typed text on blur without adding

## Accessibility

| Concern | Requirement |
|---|---|
| Input | Combobox semantics; pills are reachable |
| Keyboard | Enter/comma adds, Backspace removes last |
| Error | aria-invalid + message |

## Token contract

8 component-tier tokens, defined in `packages/tokens/src/components/tags-input.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `tags-input.bg` | `{surface.elevated}` | `#ffffff` |
| `tags-input.border` | `{border.strong}` | `#737370` |
| `tags-input.border-focus` | `{focus.ring}` | `#f5631a` |
| `tags-input.fg` | `{text.primary}` | `#1a1a18` |
| `tags-input.placeholder` | `{text.tertiary}` | `#737370` |
| `tags-input.pill-bg` | `{surface.subtle}` | `#f3f3f0` |
| `tags-input.pill-fg` | `{text.primary}` | `#1a1a18` |
| `tags-input.radius` | `{radius.md}` | `6px` |

## Library notes

React: wrapper over Mantine `TagsInput`.

```tsx
import { TagsInput } from '@clementine-ds/ui';

<TagsInput label='Labels' defaultValue={['prod','read-only']} />
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
