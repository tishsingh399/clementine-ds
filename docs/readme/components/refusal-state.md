# RefusalState

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/refusal-state/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/RefusalState.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ai/RefusalState.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/refusal-state.json)

## Overview

A clear, non-dead-end refusal — "I can't do X; here's why, try Y." Styled NEUTRALLY, not as an error.

Status: `AI-Ready` · Tray 4 (AI surface). Token contract closed at 4 component-tier tokens.

## When to use

- Out-of-scope / policy / safety declines
- Low-confidence "I won't guess"

## When not to use

- System errors (use Alert error)
- Blocked-by-policy hard stops (distinct state)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the card |
| `reason` | why |
| `suggestion` | what to try instead |

## Usage guidelines

### Do
- Give a clear reason + a forward path
- Style neutrally (not alarming red)
- Keep it short and honest

### Don't
- Dead-end the user
- Style a refusal as an error
- Be preachy

## Accessibility

| Concern | Requirement |
|---|---|
| Tone | Neutral surface, not error styling |
| Path | A reachable next step is offered |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `refusal.bg` | `{surface.subtle}` | `#f3f3f0` |
| `refusal.border` | `{border.default}` | `#e5e5e0` |
| `refusal.fg` | `{text.primary}` | `#1a1a18` |
| `refusal.suggestion` | `{text.link}` | `#2563eb` |

## Library notes

```tsx
import { RefusalState } from '@clementine-ds/ui';

<RefusalState reason="I can't revoke another user's access." suggestion="An admin can do this." />
```

## Related

- [Behavior & state model](../../../behaviors/README.md)
- [Content & language](../../../content/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
