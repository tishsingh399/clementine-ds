# ColorInput

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/color-input/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ColorInput.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ColorInput.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/color-input.json)

## Overview

Pick a color via a swatch preview plus an editable hex field.

Status: `AI-Ready`. Token contract closed at 5 component-tier tokens.

## When to use

- Brand/theme color selection
- Tagging by color (with a label too)

## When not to use

- Conveying status (use semantic tokens)
- Color as the only meaning

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the input |
| `swatch` | preview swatch |
| `field` | hex field |

## Usage guidelines

### Do
- Show the hex value as text
- Offer a defined swatch palette
- Validate hex input

### Don't
- Rely on the swatch alone
- Use color as the sole carrier of meaning

## Accessibility

| Concern | Requirement |
|---|---|
| Value | Hex shown as text, not swatch-only |
| Label | Field has a visible label |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `color-input.bg` | `{surface.elevated}` | `#ffffff` |
| `color-input.border` | `{border.strong}` | `#737370` |
| `color-input.border-focus` | `{focus.ring}` | `#f5631a` |
| `color-input.fg` | `{text.primary}` | `#1a1a18` |
| `color-input.radius` | `{radius.md}` | `6px` |

## Library notes

```tsx
import { ColorInput } from '@clementine-ds/ui';

<ColorInput label="Brand color" defaultValue="#2563eb" />
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
