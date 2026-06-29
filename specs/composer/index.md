---
component: composer
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: AI Surface
tray: 4
required_aria: [aria-label]
model_baseline: claude-opus-4-8
prompt_version: chat@2026-06-10

semantic_parts:
  root:     Bordered container
  textarea: Autosizing prompt input
  send:     Send action (becomes Stop while busy)

token_contract:
  - composer.bg
  - composer.border
  - composer.border-focus
  - composer.fg
  - composer.placeholder
  - composer.send-bg
  - composer.stop-bg
  - composer.radius

interaction_states: [idle, focus, typing, busy, disabled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/ai/Composer.tsx
    underlying_library: mantine
    exports: [Composer, ComposerProps]
  storybook:
    path: apps/storybook/stories/ai/Composer.stories.tsx
  tokens:
    component: packages/tokens/src/components/composer.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [chat, empty-state]
pages_used_in: [assistant]
---

# AGENTIC DOCUMENTATION: COMPOSER

> **Implementation:** [`packages/ui/src/components/ai/Composer.tsx`](../../packages/ui/src/components/ai/Composer.tsx).

The prompt input. Autosizing textarea + a Send affordance that becomes **Stop** while `busy`. Enter submits, Shift+Enter newlines. Always keep Stop reachable during generation (see [behaviors](../../behaviors/README.md)).

| Part | State | Token | Light |
|---|---|---|---|
| container | idle | `composer.bg` / `composer.border` | `#ffffff` / `#e5e5e0` |
| container | focus | `composer.border-focus` | `#ff8040` |
| send | idle | `composer.send-bg` → `{action.primary}` | `#2563eb` |
| stop | busy | `composer.stop-bg` → `{action.destructive}` | `#dc2626` |

**Do** disable Send on empty input; show "AI can make mistakes" disclosure below ([content](../../content/disclosure-copy.md)). **Don't** submit on Enter while busy.
