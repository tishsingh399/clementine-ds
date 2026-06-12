# Notification

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/notification/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Notification.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Notification.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/notification.json)

## Overview

A self-contained status card for transient feedback — the visual a toast system renders. Distinct from Alert (inline, persistent).

Status: `AI-Ready`. Token contract closed at 6 component-tier tokens.

## When to use

- Toast / transient feedback
- Action confirmations ("Saved")
- Background-task completion

## When not to use

- Persistent inline context (use Alert)
- Blocking decisions (use Modal/HITLGate)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the card |
| `accent` | left status stripe |
| `title` | headline |
| `body` | message |
| `close` | dismiss button |

## Usage guidelines

### Do
- Announce via aria-live (polite for info, assertive for errors)
- Auto-dismiss info; let errors persist
- Pair color with an icon + text

### Don't
- Stack a wall of notifications
- Auto-dismiss errors the user must act on
- Carry critical-only info in a toast

## Accessibility

| Concern | Requirement |
|---|---|
| Live region | aria-live announces without stealing focus |
| Close | Dismiss button has an aria-label |
| Status | Icon + text, not color alone |

## Token contract

6 component-tier tokens, defined in `packages/tokens/src/components/notification.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `notification.bg` | `{surface.elevated}` | `#ffffff` |
| `notification.border` | `{border.default}` | `#e5e5e0` |
| `notification.fg-title` | `{text.primary}` | `#1a1a18` |
| `notification.fg-body` | `{text.secondary}` | `#6b6b66` |
| `notification.accent` | `{action.primary}` | `#2563eb` |
| `notification.radius` | `{radius.md}` | `6px` |

## Library notes

React: wrapper over Mantine `Notification`.

```tsx
import { Notification } from '@clementine-ds/ui';

<Notification title="Session revoked" color="green">User signed out of all devices.</Notification>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
