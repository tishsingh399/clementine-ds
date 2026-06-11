# MemoryPanel

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/ai/memory-panel/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/MemoryPanel.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ai/MemoryPanel.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/memory-panel.json)

## Overview

The persistent facts an agent holds about the user/context — viewable and deletable (user control over memory).

Status: `AI-Ready` · Tray 4 (AI surface). Token contract closed at 4 component-tier tokens.

## When to use

- Letting users see + manage agent memory
- Transparency about retained facts

## When not to use

- Transient conversation context (use Context inspector)
- Knowledge-base sources (use SourcesPanel)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the panel |
| `fact` | a remembered fact |
| `remove` | forget button |

## Usage guidelines

### Do
- Make every fact deletable
- Show what is remembered plainly
- Confirm destructive clears

### Don't
- Hide what the agent remembers
- Make memory un-editable

## Accessibility

| Concern | Requirement |
|---|---|
| Delete | Each forget control labelled with the fact |
| Structure | Facts are a readable list |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `memory.bg` | `{surface.elevated}` | `#ffffff` |
| `memory.border` | `{border.default}` | `#e5e5e0` |
| `memory.fg` | `{text.primary}` | `#1a1a18` |
| `memory.remove` | `{text.secondary}` | `#6b6b66` |

## Library notes

```tsx
import { MemoryPanel } from '@clementine-ds/ui';

<MemoryPanel facts={[{ id:'1', text:'Prefers concise answers' }]} onDelete={forget} />
```

## Related

- [Behavior & state model](../../../behaviors/README.md)
- [Content & language](../../../content/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
