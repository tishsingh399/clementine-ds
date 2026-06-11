# PasswordInput

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/password-input/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/PasswordInput.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/PasswordInput.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/password-input.json)

## Overview

A masked text input with a visibility toggle, for passwords and secrets.

Status: `AI-Ready`. Token contract closed at 6 component-tier tokens.

## When to use

- Password / secret entry
- API keys and tokens (with care)

## When not to use

- Non-secret text (use TextInput)
- Displaying a stored secret

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the input |
| `toggle` | show/hide visibility button |
| `label` | field label |

## Usage guidelines

### Do
- Offer a show/hide toggle
- Pair with clear strength/criteria text
- Never log or echo the value

### Don't
- Disable paste
- Show the secret by default

## Accessibility

| Concern | Requirement |
|---|---|
| Toggle | Visibility button has an aria-label and aria-pressed |
| Input | type=password; revealed as type=text on toggle |
| Error | aria-invalid + message |

## Token contract

6 component-tier tokens, defined in `packages/tokens/src/components/password-input.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `password-input.bg` | `{surface.elevated}` | `#ffffff` |
| `password-input.border` | `{border.strong}` | `#d4d4cf` |
| `password-input.border-focus` | `{focus.ring}` | `#ff8040` |
| `password-input.fg` | `{text.primary}` | `#1a1a18` |
| `password-input.placeholder` | `{text.tertiary}` | `#a3a39e` |
| `password-input.radius` | `{radius.md}` | `6px` |

## Library notes

React: wrapper over Mantine `PasswordInput`.

```tsx
import { PasswordInput } from '@clementine-ds/ui';

<PasswordInput label="Password" placeholder="Your password" />
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
