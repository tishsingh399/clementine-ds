# Rating

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/rating/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Rating.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/Rating.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/rating.json)

## Overview

Capture or display a star rating (feedback score, quality).

Status: `AI-Ready`. Token contract closed at 2 component-tier tokens.

## When to use

- Collecting a 1-5 satisfaction score
- Displaying an average rating (readOnly)

## When not to use

- Binary feedback (use FeedbackControl)
- Precise numeric input

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the symbol group |
| `symbol` | one star/unit |

## Usage guidelines

### Do
- Label what is being rated; support fractions for display
- Allow keyboard selection
- Use readOnly for display-only

### Don't
- Use color alone to mean "good/bad"
- Make a display-only rating look interactive

## Accessibility

| Concern | Requirement |
|---|---|
| Role | radiogroup (interactive) or img (readOnly) with an accessible label |
| Keyboard | Arrows set the value |
| Value | Announced as "n out of m" |

## Token contract

2 component-tier tokens, defined in `packages/tokens/src/components/rating.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `rating.symbol-empty` | `{border.strong}` | `#d4d4cf` |
| `rating.symbol-filled` | `{feedback.warning}` | `#f97316` |

## Library notes

React: wrapper over Mantine `Rating`.

```tsx
import { Rating } from '@clementine-ds/ui';

<Rating defaultValue={3} />
```

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
