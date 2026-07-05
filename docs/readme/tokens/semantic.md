# Semantic tokens

[Light source](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/semantic-light.json) | [Dark source](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/semantic-dark.json)

## Overview

Tier 2 of the cascade. Tokens with intent. The name says what the value is for, not what it looks like.

> **Note:** Light and dark share the same vocabulary. The names are identical. Only the bindings to primitives change. Theme switching is a file swap, not a vocabulary swap.

## Categories

### Action

User-initiated actions. Buttons, links, interactive icons.

| Token | Light | Dark | Role |
|---|---|---|---|
| `action.primary` | `{color.blue.6}` | `{color.blue.5}` | Primary action fill |
| `action.primary-hover` | `{color.blue.7}` | `{color.blue.6}` | Hover state |
| `action.primary-active` | `{color.blue.8}` | `{color.blue.7}` | Mouse-down state |
| `action.destructive` | `{color.red.6}` | `{color.red.5}` | Irreversible action |
| `action.destructive-hover` | `{color.red.7}` | `{color.red.6}` | Hover state |

### Surface

Backgrounds. Page, card, overlay, subtle fill.

| Token | Light | Dark | Role |
|---|---|---|---|
| `surface.default` | `{color.gray.0}` | `{color.gray.9}` | Page background |
| `surface.elevated` | `{color.white}` | `{color.gray.8}` | Card, modal, popover |
| `surface.subtle` | `{color.gray.1}` | `{color.gray.8}` | Hover wash, subtle fill |
| `surface.overlay` | `rgba(0,0,0,0.4)` | `rgba(0,0,0,0.6)` | Modal backdrop |

### Text

Foreground for prose, labels, controls.

| Token | Light | Dark | Role |
|---|---|---|---|
| `text.primary` | `{color.gray.9}` | `{color.gray.0}` | Default text color |
| `text.secondary` | `{color.gray.6}` | `{color.gray.3}` | Subdued, helper text |
| `text.tertiary` | `{color.gray.4}` | `{color.gray.5}` | Placeholder, disabled |
| `text.on-action` | `{color.white}` | `{color.white}` | Text on filled action |
| `text.link` | `{color.blue.6}` | `{color.blue.4}` | Inline link |

### Border

| Token | Light | Dark | Role |
|---|---|---|---|
| `border.default` | `{color.gray.2}` | `{color.gray.7}` | Subtle divider |
| `border.strong` | `{color.gray.3}` | `{color.gray.6}` | Input, control border |
| `border.focus` | `{color.blue.6}` | `{color.blue.4}` | Focus border |

### Focus

The one literal. Clementine uses an orange focus ring across themes for instant visibility.

| Token | Light | Dark | Role |
|---|---|---|---|
| `focus.ring` | `#f5631a` | `#f5631a` | Focus ring color |

### Feedback

Inline status colors.

| Token | Light | Dark | Role |
|---|---|---|---|
| `feedback.error` | `{color.red.6}` | `{color.red.4}` | Error border, text |
| `feedback.error-subtle` | `{color.red.0}` | `{color.red.9}` | Error background |
| `feedback.success` | `{color.green.6}` | `{color.green.4}` | Success |
| `feedback.success-subtle` | `{color.green.0}` | `{color.green.9}` | Success background |
| `feedback.warning` | `{color.orange.5}` | `{color.orange.4}` | Warning |
| `feedback.warning-subtle` | `{color.orange.0}` | `{color.orange.9}` | Warning background |

### Risk

Four severity tiers, used wherever a UI ranks risk or impact. Each has a strong and a subtle variant.

| Token | Light | Role |
|---|---|---|
| `risk.critical` | `{color.red.9}` | Critical severity |
| `risk.critical-subtle` | `{color.red.0}` | Critical background |
| `risk.high` | `{color.orange.7}` | High severity |
| `risk.high-subtle` | `{color.orange.0}` | High background |
| `risk.medium` | `{color.orange.5}` | Medium severity |
| `risk.medium-subtle` | `{color.orange.1}` | Medium background |
| `risk.low` | `{color.green.6}` | Low severity |
| `risk.low-subtle` | `{color.green.0}` | Low background |

## Rules

| You can | You cannot |
|---|---|
| Reference any primitive in a semantic value | Reference another semantic |
| Add a new semantic when intent is genuinely missing | Add a semantic for a one-off appearance |
| Use any semantic in a component token's `$value` | Use a primitive in a component token's `$value` |

## When to add a new semantic

Three signals:

1. A new intent emerges (you find yourself binding the same primitive in three different component files for the same reason). Promote it to a semantic.
2. Theme switching requires it (the value needs to differ between light and dark with the same vocabulary).
3. Accessibility requires it (a state that needs its own color across the system).

A signal that you should NOT add one:

- A single component needs a unique color. That belongs in a component token, not a semantic.

## Related

- [Primitives](./primitives.md)
- [Component tokens](./component.md)
- [The cascade rule](./the-cascade-rule.md)
