# RbacMatrix

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/rbac-matrix/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/RbacMatrix.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/RbacMatrix.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/rbac-matrix.json)

## Overview

A role x permission grid of checkboxes for least-privilege access management.

Status: `AI-Ready` · Enterprise layer. Token contract closed at 4 component-tier tokens.

## When to use

- Managing role permissions
- Least-privilege reviews

## When not to use

- A single role assignment (use RolePicker)
- Free-form policy (use a policy editor)

## Anatomy

| Part | Purpose |
|---|---|
| `header` | role columns |
| `row` | a permission |
| `cell` | a grant checkbox |

## Usage guidelines

### Do
- Label each cell (role can permission)
- Make least-privilege the default
- Log grant changes

### Don't
- Default to broad grants
- Leave cells unlabelled for AT

## Accessibility

| Concern | Requirement |
|---|---|
| Cells | Each checkbox labelled "Role can permission" |
| Headers | th scope for roles + permissions |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `rbac-matrix.header-bg` | `{surface.subtle}` | `#f3f3f0` |
| `rbac-matrix.border` | `{border.default}` | `#e5e5e0` |
| `rbac-matrix.granted` | `{action.primary}` | `#2563eb` |
| `rbac-matrix.fg` | `{text.primary}` | `#1a1a18` |

## Library notes

```tsx
import { RbacMatrix } from '@clementine-ds/ui';

<RbacMatrix roles={['Admin','Auditor']} permissions={['read','revoke']} grants={new Set(['Admin read'])} onToggle={t} />
```

## Related

- [Data-table pattern](../../patterns/data-table/index.md)
- [Trust, safety & governance](../../governance/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
