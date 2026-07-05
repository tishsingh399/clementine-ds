# AuditLogViewer

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/audit-log-viewer/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/AuditLogViewer.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/AuditLogViewer.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/audit-log-viewer.json)

## Overview

A chronological, attributable record of actions — who did what to what, when.

Status: `AI-Ready` · Enterprise layer. Token contract closed at 5 component-tier tokens.

## When to use

- Compliance / audit surfaces
- Security event review

## When not to use

- Human-readable recent activity (use ActivityFeed)
- Live status

## Anatomy

| Part | Purpose |
|---|---|
| `header` | columns |
| `row` | an audit entry |
| `actor` | principal |
| `target` | object |

## Usage guidelines

### Do
- Attribute every entry to a principal
- Make it sortable/filterable + exportable
- Keep timestamps precise

### Don't
- Allow unattributable entries
- Mutate/hide log rows

## Accessibility

| Concern | Requirement |
|---|---|
| Table | th scope; sortable headers carry aria-sort |
| Precision | Exact timestamps shown |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `audit-log.header-bg` | `{surface.subtle}` | `#f3f3f0` |
| `audit-log.row-striped` | `{surface.default}` | `#fafaf8` |
| `audit-log.fg` | `{text.primary}` | `#1a1a18` |
| `audit-log.meta` | `{text.tertiary}` | `#737370` |
| `audit-log.border` | `{border.default}` | `#e5e5e0` |

## Library notes

```tsx
import { AuditLogViewer } from '@clementine-ds/ui';

<AuditLogViewer entries={[{ id:'1', actor:'tina', action:'revoke', target:'session s_91', when:'14:14:02' }]} />
```

## Related

- [Data-table pattern](../../patterns/data-table/index.md)
- [Trust, safety & governance](../../governance/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
