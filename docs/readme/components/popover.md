# Popover

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/popover/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Popover.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Popover.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/popover.json)

## Overview

A floating panel anchored to a trigger, for rich content a Tooltip cannot hold (mini-forms, details, pickers).

Status: `AI-Ready`. Token contract closed at 4 component-tier tokens.

## When to use

- Supplementary detail on demand
- A small form/picker tied to a control
- Disclosure that needs focusable content

## When not to use

- Plain hint text (use Tooltip)
- A list of actions (use Menu)
- A blocking decision (use Modal)

## Anatomy

| Part | Purpose |
|---|---|
| `target` | the trigger |
| `dropdown` | the floating panel |
| `root` | the controller |

## Usage guidelines

### Do
- Move focus into the dropdown; close on Escape + outside click
- Anchor near the trigger; flip when space is tight
- Keep content scoped — escalate big content to a Modal/Drawer

### Don't
- Put critical-only info inside (it is dismissible)
- Nest popovers
- Trap the user with no close path

## Accessibility

| Concern | Requirement |
|---|---|
| Trigger | aria-haspopup + aria-expanded |
| Focus | Moves into the dropdown; Escape closes and restores |
| Dismiss | Outside click + Escape |

## Token contract

4 component-tier tokens, defined in `packages/tokens/src/components/popover.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `popover.bg` | `{surface.elevated}` | `#ffffff` |
| `popover.border` | `{border.default}` | `#e5e5e0` |
| `popover.shadow` | `{shadow.lg}` | `0 8px 24px rgba(0,0,0,0.16)` |
| `popover.radius` | `{radius.md}` | `6px` |

## Library notes

React: wrapper over Mantine `Popover`.

```tsx
import { Popover } from '@clementine-ds/ui';

<Popover><PopoverTarget><Button>Details</Button></PopoverTarget><PopoverDropdown>…</PopoverDropdown></Popover>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
