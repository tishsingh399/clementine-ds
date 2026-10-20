# Chip

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/chip/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Chip.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Chip.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/chip.json)

## Overview

A compact, toggleable selection — filter chips and multi-choice pickers. Distinct from Badge (read-only status).

Status: `AI-Ready`. Token contract closed at 7 component-tier tokens.

## When to use

- Filter sets ("Standing", "JIT")
- Multi-select tags
- Single-choice quick pickers

## When not to use

- Read-only status (use Badge)
- A primary action (use Button)
- One on/off setting (use Switch)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the toggle |
| `label` | chip text |
| `group` | ChipGroup wrapper (single/multi) |

## Usage guidelines

### Do
- Use ChipGroup for single/multi selection
- Keep labels to 1-2 words
- Show selected state with fill AND the checked affordance

### Don't
- Use chips for status (that is Badge)
- Rely on color alone for selected
- Overflow a row with 20 chips — group or filter

## Accessibility

| Concern | Requirement |
|---|---|
| Role | Renders as a checkbox/radio under the hood with aria-checked |
| Keyboard | Space toggles; arrow keys move within a group |
| Selected | Fill + checkmark, not color alone |

## Token contract

7 component-tier tokens, defined in `packages/tokens/src/components/chip.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `chip.bg` | `{surface.subtle}` | `#efeeec` |
| `chip.bg-checked` | `{action.primary}` | `#305eb7` |
| `chip.fg` | `{text.primary}` | `#2a2926` |
| `chip.fg-checked` | `{text.on-action}` | `#ffffff` |
| `chip.border` | `{border.default}` | `#d5d3d0` |
| `chip.border-checked` | `{action.primary}` | `#305eb7` |
| `chip.radius` | `{radius.xl}` | `99px` |

## Library notes

React: wrapper over Mantine `Chip`.

```tsx
import { Chip } from '@clementine-ds/ui';

<ChipGroup defaultValue="all"><Chip value="all">All</Chip><Chip value="jit">JIT</Chip></ChipGroup>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
