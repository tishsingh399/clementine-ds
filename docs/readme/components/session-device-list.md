# SessionDeviceList

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/session-device-list/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/SessionDeviceList.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/SessionDeviceList.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/session-device-list.json)

## Overview

Active sessions/devices for a principal, each revocable — a privileged-access staple.

Status: `AI-Ready` · Enterprise layer. Token contract closed at 5 component-tier tokens.

## When to use

- Account security settings
- Privileged session management

## When not to use

- Audit history (use AuditLogViewer)
- Generic lists

## Anatomy

| Part | Purpose |
|---|---|
| `item` | a session/device |
| `current` | the current device badge |
| `revoke` | revoke action |

## Usage guidelines

### Do
- Mark the current device; protect it from revoke
- Show location + last-active
- Confirm revoke

### Don't
- Let users revoke their current session by accident
- Hide where/when a session was active

## Accessibility

| Concern | Requirement |
|---|---|
| Current | Current device clearly badged + non-revocable |
| Revoke | Labelled, confirmable action |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `session-device.bg` | `{surface.elevated}` | `#ffffff` |
| `session-device.border` | `{border.default}` | `#e5e5e0` |
| `session-device.fg` | `{text.primary}` | `#1a1a18` |
| `session-device.meta` | `{text.tertiary}` | `#737370` |
| `session-device.revoke` | `{feedback.error}` | `#dc2626` |

## Library notes

```tsx
import { SessionDeviceList } from '@clementine-ds/ui';

<SessionDeviceList sessions={[{ id:'1', device:'MacBook Pro', location:'NYC', lastActive:'now', current:true }]} onRevoke={revoke} />
```

## Related

- [Data-table pattern](../../patterns/data-table/index.md)
- [Trust, safety & governance](../../governance/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
