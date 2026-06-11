# Anchor

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/anchor/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Anchor.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Anchor.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/anchor.json)

## Overview

A text link for navigation. Distinct from Button (which performs an action).

Status: `AI-Ready`. Token contract closed at 2 component-tier tokens.

## When to use

- Navigating to another page or anchor
- Inline links within prose
- External references

## When not to use

- Performing an action (submit, delete) — use Button
- A primary call-to-action — use Button

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the native <a> element |
| `label` | link text |

## Usage guidelines

### Do
- Underline on hover/focus — never color alone (WCAG 1.4.1)
- Use descriptive link text ("access policy", not "click here")
- Add rel="noopener" on target="_blank"

### Don't
- Style a Button as a link or vice versa
- Use "here"/"link" as the text
- Convey state with color only

## Accessibility

| Concern | Requirement |
|---|---|
| Element | Native <a> with href |
| Distinction | Underline or non-color cue, not color alone |

## Token contract

2 component-tier tokens, defined in `packages/tokens/src/components/anchor.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `anchor.fg` | `{text.link}` | `#2563eb` |
| `anchor.fg-hover` | `{action.primary}` | `#2563eb` |

## Library notes

React: wrapper over Mantine `Anchor`.

```tsx
import { Anchor } from '@clementine-ds/ui';

<Anchor href="/policy">Read the access policy</Anchor>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
