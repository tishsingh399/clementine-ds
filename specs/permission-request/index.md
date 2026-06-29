---
component: permission-request
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: [role, aria-label]
model_baseline: claude-opus-4-8

semantic_parts:
  root: the request card
  scope: the requested scope
  actions: allow/deny

token_contract:
  - permission-request.bg
  - permission-request.border
  - permission-request.title
  - permission-request.scope-bg

interaction_states: [pending, allowed, denied]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/PermissionRequest.tsx
    underlying_library: custom
    exports: [PermissionRequest, PermissionRequestProps]
  storybook:
    path: apps/storybook/stories/ai/PermissionRequest.stories.tsx
  tokens:
    component: packages/tokens/src/components/permission-request.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: PERMISSIONREQUEST

> **Implementation:** [`packages/ui/src/components/ai/PermissionRequest.tsx`](../../packages/ui/src/components/ai/PermissionRequest.tsx).

A least-privilege access request — "Agent wants to do X (scope Y)" → Allow / Deny. Central to privileged-access contexts.

| Token | Resolves through | Light |
|---|---|---|
| `permission-request.bg` | `{feedback.warning-subtle}` | `#fff7ed` |
| `permission-request.border` | `{feedback.warning}` | `#f97316` |
| `permission-request.title` | `{text.primary}` | `#1a1a18` |
| `permission-request.scope-bg` | `{surface.subtle}` | `#f3f3f0` |

**Do:** State the exact action + scope; Default to least privilege; allow scoping down; Log the decision.
**Don't:** Request broad access by default; Bundle unrelated permissions.
