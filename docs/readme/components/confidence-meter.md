# ConfidenceMeter

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/confidence-meter/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/ConfidenceMeter.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ai/ConfidenceMeter.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/confidence-meter.json)

## Overview

Communicates how confident the model is in an answer, with filled bars AND a text label.

Status: `AI-Ready` · Tray 4 (AI surface). Token contract closed at 5 component-tier tokens.

## When to use

- Hedging uncertain answers
- RAG results with retrieval scores
- Flagging low-confidence output for review

## When not to use

- Implying false precision
- Faking confidence the model lacks

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the meter |
| `bar` | a confidence segment |
| `label` | the text level |

## Usage guidelines

### Do
- Pair the bars with a text label (never color alone)
- Map to a real confidence signal, not decoration
- Prompt verification on low confidence

### Don't
- Show confidence the model cannot actually measure
- Use color as the only cue

## Accessibility

| Concern | Requirement |
|---|---|
| Role | img with an accessible label ("Medium confidence") |
| Non-color | Bar count + text, not color alone |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `confidence.track` | `{surface.subtle}` | `#f3f3f0` |
| `confidence.high` | `{feedback.success}` | `#16a34a` |
| `confidence.medium` | `{feedback.warning}` | `#f97316` |
| `confidence.low` | `{feedback.error}` | `#dc2626` |
| `confidence.label` | `{text.secondary}` | `#6b6b66` |

## Library notes

```tsx
import { ConfidenceMeter } from '@clementine-ds/ui';

<ConfidenceMeter level="medium" />
```

## Related

- [Behavior & state model](../../../behaviors/README.md)
- [Content & language](../../../content/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
