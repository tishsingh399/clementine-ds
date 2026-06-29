# PromptSuggestions

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/prompt-suggestions/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/PromptSuggestions.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ai/PromptSuggestions.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/prompt-suggestions.json)

## Overview

Clickable starter prompts shown above an empty Composer, tied to real capabilities.

Status: `AI-Ready` · Tray 4 (AI surface). Token contract closed at 4 component-tier tokens.

## When to use

- Empty/first-run conversation
- Onboarding an assistant
- Surfacing high-value tasks

## When not to use

- Mid-conversation (gets in the way)
- Suggesting things the agent cannot do

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the chip row |
| `chip` | one starter prompt |

## Usage guidelines

### Do
- Offer 3-4 concrete, verb-first prompts
- Tie each to a real, supported capability
- Get out of the way once a conversation starts

### Don't
- Suggest unsupported actions
- Show a wall of suggestions

## Accessibility

| Concern | Requirement |
|---|---|
| Buttons | Each chip is a real button, keyboard-activatable |
| Labels | Full prompt text is the accessible name |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `prompt-suggestions.bg` | `{surface.subtle}` | `#f3f3f0` |
| `prompt-suggestions.border` | `{border.default}` | `#e5e5e0` |
| `prompt-suggestions.fg` | `{text.primary}` | `#1a1a18` |
| `prompt-suggestions.radius` | `{radius.xl}` | `99px` |

## Library notes

```tsx
import { PromptSuggestions } from '@clementine-ds/ui';

<PromptSuggestions suggestions={['Show standing access','Summarize the audit log']} onSelect={send} />
```

## Related

- [Behavior & state model](../../../behaviors/README.md)
- [Content & language](../../../content/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
