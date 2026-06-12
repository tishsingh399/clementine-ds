# Fieldset

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/fieldset/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Fieldset.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Fieldset.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/fieldset.json)

## Overview

Visually and semantically group related form controls under a legend.

Status: `AI-Ready`. Token contract closed at 4 component-tier tokens.

## When to use

- Grouping related fields (address, access details)
- Sections within a long form

## When not to use

- A single field
- Non-form content (use Card)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the fieldset |
| `legend` | the group title |
| `body` | grouped controls |

## Usage guidelines

### Do
- Give every fieldset a meaningful legend
- Use to chunk long forms into scannable groups

### Don't
- Nest fieldsets deeply
- Use as a generic container (that is Card)

## Accessibility

| Concern | Requirement |
|---|---|
| Semantics | Native <fieldset> + <legend> groups controls for AT |
| Legend | Describes the group; read with each control |

## Token contract

4 component-tier tokens, defined in `packages/tokens/src/components/fieldset.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `fieldset.bg` | `{surface.default}` | `#fafaf8` |
| `fieldset.border` | `{border.default}` | `#e5e5e0` |
| `fieldset.legend` | `{text.primary}` | `#1a1a18` |
| `fieldset.radius` | `{radius.md}` | `6px` |

## Library notes

React: wrapper over Mantine `Fieldset`.

```tsx
import { Fieldset } from '@clementine-ds/ui';

<Fieldset legend="Access details"><TextInput label="Name" /></Fieldset>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
