# PinInput

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/pin-input/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/PinInput.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/PinInput.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/pin-input.json)

## Overview

A segmented input for short codes — OTP / MFA / verification PINs.

Status: `AI-Ready`. Token contract closed at 5 component-tier tokens.

## When to use

- One-time passcodes (MFA)
- Short verification codes

## When not to use

- Free-length text
- Passwords (use PasswordInput)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the group |
| `cell` | a single digit field |

## Usage guidelines

### Do
- Auto-advance between cells; allow paste of the full code
- Set inputmode/type for numeric codes
- Label the whole group

### Don't
- Block paste
- Use for long inputs

## Accessibility

| Concern | Requirement |
|---|---|
| Group | Each cell labelled; group has an accessible name |
| Paste | Pasting the full code distributes across cells |
| Keyboard | Backspace moves to the previous cell |

## Token contract

5 component-tier tokens, defined in `packages/tokens/src/components/pin-input.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `pin-input.bg` | `{surface.elevated}` | `#ffffff` |
| `pin-input.border` | `{border.strong}` | `#d4d4cf` |
| `pin-input.border-focus` | `{focus.ring}` | `#ff8040` |
| `pin-input.fg` | `{text.primary}` | `#1a1a18` |
| `pin-input.radius` | `{radius.md}` | `6px` |

## Library notes

React: wrapper over Mantine `PinInput`.

```tsx
import { PinInput } from '@clementine-ds/ui';

<PinInput length={6} oneTimeCode />
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
