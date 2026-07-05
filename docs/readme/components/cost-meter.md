# CostMeter

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/cost-meter/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/CostMeter.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ai/CostMeter.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/cost-meter.json)

## Overview

Usage transparency for a run — tokens, estimated cost, and elapsed latency. Enterprise-critical (usage is billable + audited).

Status: `AI-Ready` · Tray 4 (AI surface). Token contract closed at 2 component-tier tokens.

## When to use

- Showing per-run cost/latency
- Enterprise usage transparency

## When not to use

- Hiding cost from billable users
- Marketing claims

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the meter |
| `label` | metric name |
| `value` | metric value |

## Usage guidelines

### Do
- Show tokens + cost + latency plainly
- Keep estimates honest/labeled

### Don't
- Hide cost where it is billed
- Imply false precision

## Accessibility

| Concern | Requirement |
|---|---|
| Pairs | Each value is associated with its label |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `cost-meter.label` | `{text.tertiary}` | `#737370` |
| `cost-meter.value` | `{text.secondary}` | `#6b6b66` |

## Library notes

```tsx
import { CostMeter } from '@clementine-ds/ui';

<CostMeter tokens='12.4k' cost='$0.03' latency='1.2s' />
```

## Related

- [Behavior & state model](../../../behaviors/README.md)
- [Content & language](../../../content/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
