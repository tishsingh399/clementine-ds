# PermissionRequest

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/permission-request/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/ai/PermissionRequest.tsx) | [Storybook](https://github.com/tishsingh399/clementine-ds/blob/main/apps/storybook/stories/ai/PermissionRequest.stories.tsx) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/permission-request.json)

## Overview

A least-privilege access request — "Agent wants to do X (scope Y)" → Allow / Deny. Central to privileged-access contexts.

Status: `AI-Ready` · Tray 4 (AI surface). Token contract closed at 4 component-tier tokens.

## When to use

- Before an agent accesses a resource/tool
- Scoped, explicit permission grants

## When not to use

- Routine, already-granted actions
- Pure confirmations (use HITLGate)

## Anatomy

| Part | Purpose |
|---|---|
| `root` | the request card |
| `scope` | the requested scope |
| `actions` | allow/deny |

## Usage guidelines

### Do
- State the exact action + scope
- Default to least privilege; allow scoping down
- Log the decision

### Don't
- Request broad access by default
- Bundle unrelated permissions

## Accessibility

| Concern | Requirement |
|---|---|
| Group | role=group labelled "Permission request" |
| Scope | Requested scope shown as text |

## Token contract

| Token | Resolves through | Light value |
|---|---|---|
| `permission.bg` | `{feedback.warning-subtle}` | `#fff7ed` |
| `permission.border` | `{feedback.warning}` | `#f97316` |
| `permission.title` | `{text.primary}` | `#1a1a18` |
| `permission.scope-bg` | `{surface.subtle}` | `#f3f3f0` |

## Library notes

```tsx
import { PermissionRequest } from '@clementine-ds/ui';

<PermissionRequest action="Read your session list" scope="sessions:read" onAllow={ok} onDeny={no} />
```

## Related

- [Behavior & state model](../../../behaviors/README.md)
- [Content & language](../../../content/README.md)
- [AGENTS.md — agentic contract](../../../AGENTS.md)
