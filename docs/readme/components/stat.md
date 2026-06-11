# Stat

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/stat/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Stat.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Stat.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/stat.json)

## Overview

A KPI/metric tile: a label, a large value, and an optional trend delta.

Status: `AI-Ready`. Token contract closed at 4 component-tier tokens.

## When to use

- Dashboard KPIs
- Summary stats
- At-a-glance metrics

## When not to use

- Detailed data (use Table)
- Time series (use a chart)

## Anatomy

| Part | Purpose |
|---|---|
| `label` | metric name |
| `value` | the number |
| `delta` | trend change |

## Usage guidelines

### Do
- Pair the trend arrow with text + color
- Keep labels short
- Right-size the value type

### Don't
- Show a delta with color/arrow but no number
- Cram units ambiguously

## Accessibility

| Concern | Requirement |
|---|---|
| Trend | Arrow + sign + color, not color alone |
| Label | Value is associated with its label |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `stat.value` | `{text.primary}` | `#1a1a18` |
| `stat.label` | `{text.tertiary}` | `#a3a39e` |
| `stat.delta-up` | `{feedback.success}` | `#16a34a` |
| `stat.delta-down` | `{feedback.error}` | `#dc2626` |

## Library notes

```tsx
import { Stat } from '@clementine-ds/ui';

<Stat label="Active sessions" value="1,284" delta="+12%" trend="up" />
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
