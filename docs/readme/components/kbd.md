# Kbd

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/kbd/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Kbd.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Kbd.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/kbd.json)

## Overview

Renders a keyboard key or shortcut (⌘, Ctrl, Enter) as a key cap.

Status: `AI-Ready`. Token contract closed at 4 component-tier tokens.

## When to use

- Keyboard shortcut hints
- Menu/Tooltip shortcut affordances
- Docs describing key combos

## When not to use

- Code or commands (use Code)
- Long text

## Anatomy

| Part | Purpose |
|---|---|
| `root` | a single key cap |

## Usage guidelines

### Do
- One key per Kbd; join combos with a "+"
- Match the platform (⌘ on mac, Ctrl on win)

### Don't
- Put whole phrases in a Kbd
- Use for non-keyboard content

## Accessibility

| Concern | Requirement |
|---|---|
| Semantics | Renders as <kbd> |
| Combos | Separate keys are individually readable |

## Token contract

4 component-tier tokens, defined in `packages/tokens/src/components/kbd.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `kbd.bg` | `{surface.subtle}` | `#f3f3f0` |
| `kbd.fg` | `{text.primary}` | `#1a1a18` |
| `kbd.border` | `{border.strong}` | `#737370` |
| `kbd.radius` | `{radius.sm}` | `4px` |

## Library notes

React: wrapper over Mantine `Kbd`.

```tsx
import { Kbd } from '@clementine-ds/ui';

<Kbd>⌘</Kbd> + <Kbd>K</Kbd>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
