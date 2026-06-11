# MultiSelect

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/multi-select/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/MultiSelect.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/MultiSelect.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/multi-select.json)

## Overview

Pick several values from a list; selections show as removable pills.

Status: `AI-Ready`. Token contract closed at 9 component-tier tokens.

## When to use

- Choosing multiple from a known set (roles, tags)
- Filters with several active values

## When not to use

- Single choice (use Select)
- Free-text tags (use TagsInput)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the input |
| `pill` | a selected value chip |
| `popover` | the option list |
| `option` | a selectable option |

## Usage guidelines

### Do
- Make pills removable; support search for long lists
- Show a clear empty/no-results state
- Cap or scroll very long lists

### Don't
- Use for single selection
- Hide selected count behind color

## Accessibility

| Concern | Requirement |
|---|---|
| Combobox | aria-expanded + aria-multiselectable; activedescendant tracks highlight |
| Pills | Each removable pill is keyboard-reachable |
| Keyboard | Type to filter, Enter selects, Backspace removes last |

## Token contract

9 component-tier tokens, defined in `packages/tokens/src/components/multi-select.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `multi-select.bg` | `{surface.elevated}` | `#ffffff` |
| `multi-select.border` | `{border.strong}` | `#d4d4cf` |
| `multi-select.border-focus` | `{focus.ring}` | `#ff8040` |
| `multi-select.fg` | `{text.primary}` | `#1a1a18` |
| `multi-select.placeholder` | `{text.tertiary}` | `#a3a39e` |
| `multi-select.pill-bg` | `{surface.subtle}` | `#f3f3f0` |
| `multi-select.pill-fg` | `{text.primary}` | `#1a1a18` |
| `multi-select.option-bg-hover` | `{surface.subtle}` | `#f3f3f0` |
| `multi-select.radius` | `{radius.md}` | `6px` |

## Library notes

React: wrapper over Mantine `MultiSelect`.

```tsx
import { MultiSelect } from '@clementine-ds/ui';

<MultiSelect label='Roles' data={['Admin','Auditor','Viewer']} defaultValue={['Auditor']} />
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
