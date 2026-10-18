# Timeline

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/timeline/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Timeline.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Timeline.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/timeline.json)

## Overview

Show a sequence of events over time — an access request lifecycle, an activity log, a process trail.

Status: `AI-Ready`. Token contract closed at 5 component-tier tokens.

## When to use

- Chronological events / history
- A process with completed + upcoming steps
- Audit trails

## When not to use

- Ordered form steps (use Stepper)
- Unordered lists

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the rail |
| `item` | a timeline event |
| `bullet` | the node marker |
| `line` | the connector |

## Usage guidelines

### Do
- Order newest- or oldest-first consistently
- Mark completed vs upcoming with bullet AND label
- Keep each item title scannable

### Don't
- Mix orderings
- Encode state by bullet color alone

## Accessibility

| Concern | Requirement |
|---|---|
| Structure | Ordered list semantics; each item has a title |
| State | Active/complete shown by marker + text, not color alone |

## Token contract

5 component-tier tokens, defined in `packages/tokens/src/components/timeline.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `timeline.line` | `{border.default}` | `#d5d3d0` |
| `timeline.bullet` | `{surface.subtle}` | `#f6f6f4` |
| `timeline.bullet-active` | `{action.primary}` | `#305eb7` |
| `timeline.fg-title` | `{text.primary}` | `#2a2926` |
| `timeline.fg-body` | `{text.secondary}` | `#65635e` |

## Library notes

React: wrapper over Mantine `Timeline`.

```tsx
import { Timeline } from '@clementine-ds/ui';

<Timeline active={1}><TimelineItem title="Requested" /><TimelineItem title="Approved" /></Timeline>
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
