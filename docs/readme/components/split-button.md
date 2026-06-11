# SplitButton

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/split-button/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/SplitButton.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/SplitButton.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/split-button.json)

## Overview

A primary action joined to a dropdown of related actions (Save / Save as…).

Status: `AI-Ready`. Token contract closed at 4 component-tier tokens.

## When to use

- A default action with close variants
- Save/Export with options

## When not to use

- Unrelated actions (use separate buttons)
- Many equal actions (use a Menu)

## Anatomy

| Part | Purpose |
|---|---|
| `primary` | main action button |
| `trigger` | dropdown toggle |
| `menu` | secondary actions |

## Usage guidelines

### Do
- Make the primary action the most common one
- Label the dropdown trigger

### Don't
- Hide the primary action behind the menu
- Put unrelated items in the menu

## Accessibility

| Concern | Requirement |
|---|---|
| Trigger | Dropdown toggle has aria-haspopup + aria-expanded + a label |
| Primary | Main button keeps its own accessible name |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `split-button.bg` | `{action.primary}` | `#2563eb` |
| `split-button.fg` | `{text.on-action}` | `#ffffff` |
| `split-button.divider` | `{border.default}` | `#e5e5e0` |
| `split-button.radius` | `{radius.md}` | `6px` |

## Library notes

```tsx
import { SplitButton } from '@clementine-ds/ui';

<SplitButton onClick={save} menu={<MenuItem>Save as…</MenuItem>}>Save</SplitButton>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
