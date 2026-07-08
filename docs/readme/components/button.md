# Button

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/button/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Button.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Button.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/button.json)

## Overview

Primary action trigger. Use to start an action like submit, save, cancel, or navigate to a destructive step.

Status: `AI-Ready`. All five gates pass. Token contract is closed at 15 component-tier tokens.

## When to use

- Form actions (submit, cancel)
- Page-level actions (Create, Save, Publish)
- Destructive actions (Delete, Revoke), paired with a confirm step
- Modal footer actions

## When not to use

- Navigation to another page. Use a link.
- Toggling a single setting. Use Switch.
- A clickable icon with no label. Use IconButton.

## Anatomy

| Part | Purpose |
|---|---|
| `root` | The native `<button>` element. Owns interactive state, focus ring, padding, sizing. |
| `icon-leading` | Optional leading icon. Replaced by spinner in loading state. |
| `label` | The text content. |
| `icon-trailing` | Optional trailing icon. |
| `spinner` | Loading-state indicator that replaces `icon-leading`. |

## Content

Action verbs. One to three words. Sentence case.

**Try this:** Save changes, Revoke session, Delete user, Add member
**Not this:** Click here, OK, Yes (no context), Save (when more is happening)

For destructive actions, name the consequence: "Delete project" not "Delete," "Revoke 3 sessions" not "Confirm."

## Behaviors

### States

| State | Visual change | Tokens | Notes |
|---|---|---|---|
| default | Base fill | `button.bg.default` | |
| hover | One step darker | `button.bg.hover` | Pointer cursor |
| focus | 2px ring, 2px offset | `button.border.focus` | `:focus-visible` only |
| active | One step darker again | `button.bg.active` | Mouse-down state |
| disabled | 50% opacity, no pointer | `button.bg.disabled`, `button.fg.disabled` | `aria-disabled="true"` |
| loading | Spinner replaces leading icon | base tokens | `aria-busy="true"`, click handler suppressed |

### Interactions

| Trigger | Result |
|---|---|
| Click | Fires `onClick` |
| Enter / Space when focused | Fires `onClick` |
| Focus | Shows orange focus ring (`focus.ring`) |
| Disabled, click | Nothing fires, `aria-disabled` set |
| Loading, click | Nothing fires, `aria-busy` set, spinner visible |

## Variations

| Variant | Intent | When to use |
|---|---|---|
| filled (primary) | Default | Main action in a region. One per region. |
| filled (destructive) | Destructive | Irreversible. Always paired with confirm or undo. |
| outline | Secondary | Sits next to a filled primary. Lower visual weight. |
| subtle | Tertiary | Toolbar, dense UI. Lowest weight. |

| Size | Height | When to use |
|---|---|---|
| sm | 32px | Toolbar, dense table row |
| md | 40px | Default, form actions |
| lg | 48px | Marketing CTA, mobile primary action |

## Usage Guidelines

### Do

- Use a native `<button>` element
- Pair destructive actions with confirm or undo
- Set `aria-label` when there is no visible text
- One filled-primary per visual region
- Use `md` as the default size

### Don't

- Use `<div role="button">`. Mantine returns a `<button>`, keep it.
- Stack two filled-primary buttons. Use one filled, one outline.
- Communicate disabled state with color alone. Use opacity + `aria-disabled`.
- Inline a hex value. Use the component token.
- Add a new variant in code. Add it to the spec first.

## Accessibility

| Concern | Requirement |
|---|---|
| Keyboard | Enter and Space activate. Tab moves focus. |
| Focus | Orange ring (`focus.ring`) on `:focus-visible`. |
| Screen reader | Native `<button>` reads as "button" by default. `aria-label` when icon-only. |
| Hit area | Minimum 44 by 44 pixels (WCAG 2.5.5). |
| Loading | `aria-busy="true"` while the spinner is visible. |
| Disabled | `aria-disabled="true"` alongside the native `disabled` attribute. |

## Token contract

15 component-tier tokens. All defined in `packages/tokens/src/components/button.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `button.bg.default` | `action.primary` | `#2563eb` |
| `button.bg.hover` | `action.primary-hover` | `#1d4ed8` |
| `button.bg.active` | `action.primary-active` | `#1e40af` |
| `button.bg.disabled` | `surface.subtle` | `#f3f3f0` |
| `button.bg-destructive.default` | `action.destructive` | `#dc2626` |
| `button.bg-destructive.hover` | `action.destructive-hover` | `#b91c1c` |
| `button.bg-outline.default` | `surface.elevated` | `#ffffff` |
| `button.bg-outline.hover` | `surface.subtle` | `#f3f3f0` |
| `button.fg.on-filled` | `text.on-action` | `#ffffff` |
| `button.fg.on-outline` | `text.primary` | `#1a1a18` |
| `button.fg.disabled` | `text.tertiary` | `#737370` |
| `button.border.default` | `border.strong` | `#737370` |
| `button.border.hover` | `action.primary` | `#2563eb` |
| `button.border.focus` | `focus.ring` | `#f5631a` |
| `button.radius` | `radius.md` | `8px` |

## Library notes

React: wrapper over Mantine `Button`. Extends `MantineButtonProps` with an explicit `onClick` typing.

```tsx
import { Button } from '@clementine-ds/ui';

<Button variant="filled" color="blue" onClick={handleSubmit}>
  Save changes
</Button>
```

## Agent notes

What an AI agent must check before editing Button:

1. Every token referenced in code must exist in `token_contract` and in `tokens.json`
2. Do not bypass Mantine's prop API. Extend `MantineButtonProps`.
3. Storybook or painted-DOM evidence should map to `interaction_states`. Add story coverage for new non-pseudo states, and keep any intentional gap visible in the state-coverage ledger.
4. Adding a variant requires updating four things in the same commit: §4 of the spec, `button.json` (component tokens), `tokens.json` (spec contract), and a new Storybook story.
5. Dark mode resolves through `semantic-dark.json` with the same token names. Never hardcode a hex.

## Related

- [Badge](./badge.md)
- [TextInput](./text-input.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [agentic-specs](../architecture/agentic-specs.md)
