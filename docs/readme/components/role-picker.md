# RolePicker

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/role-picker/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/RolePicker.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/RolePicker.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/role-picker.json)

## Overview

Assign one or more roles to a user or group (a MultiSelect preset for RBAC).

Status: `AI-Ready` · Enterprise layer. Token contract closed at 2 component-tier tokens.

## When to use

- Assigning roles in user/group management
- Scoping access by role

## When not to use

- Free-form tags (use TagsInput)
- Permission matrices (use RbacMatrix)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the input |
| `pill` | an assigned role |

## Usage guidelines

### Do
- Offer search for long role lists
- Show assigned roles as removable pills
- Respect least-privilege defaults

### Don't
- Default to broad roles
- Allow assigning roles the assigner cannot grant

## Accessibility

| Concern | Requirement |
|---|---|
| Combobox | Multi-selectable; pills are reachable |
| Search | Type to filter roles |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `role-picker.pill-bg` | `{surface.subtle}` | `#f3f3f0` |
| `role-picker.fg` | `{text.primary}` | `#1a1a18` |

## Library notes

```tsx
import { RolePicker } from '@clementine-ds/ui';

<RolePicker roles={['Admin','Auditor','Viewer']} defaultValue={['Auditor']} />
```

## Related

- [Data-table pattern](../../patterns/data-table/index.md)
- [Trust, safety & governance](../../governance/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
