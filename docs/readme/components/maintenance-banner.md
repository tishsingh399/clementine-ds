# MaintenanceBanner

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/maintenance-banner/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/MaintenanceBanner.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/MaintenanceBanner.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/maintenance-banner.json)

## Overview

A full-width system banner for maintenance / degraded / down states. Severity by color + icon + text.

Status: `AI-Ready` · Enterprise layer. Token contract closed at 4 component-tier tokens.

## When to use

- Planned maintenance windows
- Degraded-service / outage notices

## When not to use

- Per-record errors (use Alert)
- Transient feedback (use Notification)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the banner |
| `icon` | severity icon |
| `message` | the message |

## Usage guidelines

### Do
- Carry severity with icon + text, not color alone
- State impact + ETA if known
- Keep it dismissible only when safe

### Don't
- Use color alone for severity
- Leave a stale banner up after recovery

## Accessibility

| Concern | Requirement |
|---|---|
| Role | role=status announces the banner |
| Non-color | Icon + text carry severity, not color alone |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `maintenance-banner.info-bg` | `{surface.subtle}` | `#f3f3f0` |
| `maintenance-banner.degraded-bg` | `{feedback.warning-subtle}` | `#fff7ed` |
| `maintenance-banner.down-bg` | `{feedback.error-subtle}` | `#fef2f2` |
| `maintenance-banner.fg` | `{text.primary}` | `#1a1a18` |

## Library notes

```tsx
import { MaintenanceBanner } from '@clementine-ds/ui';

<MaintenanceBanner severity="degraded" message="Audit export is delayed — investigating." />
```

## Related

- [Data-table pattern](../../patterns/data-table/index.md)
- [Trust, safety & governance](../../governance/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
