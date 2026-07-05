# StatusDot

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/status-dot/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/StatusDot.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/StatusDot.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/status-dot.json)

## Overview

A small colored dot plus a text label for presence or health state.

Status: `AI-Ready`. Token contract closed at 5 component-tier tokens.

## When to use

- Presence (online/away/busy)
- Service/resource health
- Connection state

## When not to use

- Counts/numbers (use Indicator/Badge)
- Long status text

## Anatomy

| Part | Purpose |
|---|---|
| `dot` | the colored dot |
| `label` | the text status |

## Usage guidelines

### Do
- Always pair the dot with a text label
- Keep the color set consistent across the app

### Don't
- Use the dot color as the only signal (WCAG 1.4.1)
- Invent new status colors

## Accessibility

| Concern | Requirement |
|---|---|
| Non-color | Status is dot + label, never color alone |
| Contrast | Dot meets 3:1 on its backdrop |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `status-dot.online` | `{feedback.success}` | `#16a34a` |
| `status-dot.offline` | `{text.tertiary}` | `#737370` |
| `status-dot.busy` | `{feedback.error}` | `#dc2626` |
| `status-dot.away` | `{feedback.warning}` | `#ea580c` |
| `status-dot.label` | `{text.primary}` | `#1a1a18` |

## Library notes

```tsx
import { StatusDot } from '@clementine-ds/ui';

<StatusDot status="online" />
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
