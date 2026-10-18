# SearchField

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/search-field/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/SearchField.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/SearchField.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/search-field.json)

## Overview

A TextInput preset for search: type=search, a leading search affordance, and a clearable value.

Status: `AI-Ready`. Token contract closed at 7 component-tier tokens.

## When to use

- Filtering a list/table
- Global or scoped search
- Typeahead entry points

## When not to use

- Free-form text (use TextInput)
- Selecting from a fixed set (use Select)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the input |
| `icon` | search affordance |
| `clear` | clear button |

## Usage guidelines

### Do
- Debounce queries; pair with typeahead/faceted results
- Offer a clear control
- Announce result counts

### Don't
- Search on every keystroke without debounce
- Hide what was searched

## Accessibility

| Concern | Requirement |
|---|---|
| Role | type=search; labelled |
| Clear | Clear control is reachable + labelled |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `search-field.bg` | `{surface.elevated}` | `#ffffff` |
| `search-field.border` | `{border.strong}` | `#83807a` |
| `search-field.border-focus` | `{focus.ring}` | `#e86800` |
| `search-field.fg` | `{text.primary}` | `#2a2926` |
| `search-field.placeholder` | `{text.tertiary}` | `#6e6b65` |
| `search-field.icon` | `{text.secondary}` | `#65635e` |
| `search-field.radius` | `{radius.md}` | `6px` |

## Library notes

```tsx
import { SearchField } from '@clementine-ds/ui';

<SearchField placeholder="Search sessions" />
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
