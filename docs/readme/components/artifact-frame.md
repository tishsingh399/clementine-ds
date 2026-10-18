# ArtifactFrame

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/artifact-frame/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/ArtifactFrame.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/artifact-frame.json)

## Overview

A titled container for a substantial generated output (document, code, preview) lifted out of the chat stream.

Status: `AI-Ready`. Token contract closed at 6 component-tier tokens. Full contract, parts, ARIA, and interaction states are in the [spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/artifact-frame/index.md).

## Token contract

6 component-tier tokens, defined in `packages/tokens/src/components/artifact-frame.json`.

| Token | Resolves through | Light value |
|---|---|---|
| `artifact.bg` | `{surface.elevated}` | `#ffffff` |
| `artifact.header-bg` | `{surface.subtle}` | `#f6f6f4` |
| `artifact.border` | `{border.default}` | `#d5d3d0` |
| `artifact.title` | `{text.primary}` | `#2a2926` |
| `artifact.kind` | `{text.tertiary}` | `#6e6b65` |
| `artifact.radius` | `{radius.md}` | `6px` |

## Library notes

```tsx
import { ArtifactFrame } from '@clementine-ds/ui';
```

## Related

- [Spec — full anatomy, ARIA, states](https://github.com/tishsingh399/clementine-ds/blob/main/specs/artifact-frame/index.md)
- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
