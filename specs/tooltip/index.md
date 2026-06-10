---
component: tooltip
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role, aria-describedby]

semantic_parts:
  trigger:  The element the user hovers/focuses (NOT part of the Tooltip component itself; lives in consumer code)
  bubble:   The floating container holding the tip text
  arrow:    Optional pointer arrow connecting bubble to trigger
  label:    Tip text content

token_contract:
  - tooltip.bg
  - tooltip.fg
  - tooltip.border
  - tooltip.radius
  - tooltip.shadow

interaction_states: [hidden, opening, open, closing]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Tooltip.tsx
    underlying_library: mantine
    exports: [Tooltip, TooltipProps]
  storybook:
    path: apps/storybook/stories/Tooltip.stories.tsx
  tokens:
    primitives: packages/tokens/src/primitives.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json
    component: packages/tokens/src/components/tooltip.json

patterns_used_in: [action-bar, page-header]
pages_used_in: []
---

# AGENTIC DOCUMENTATION: TOOLTIP

> **Implementation:** [`packages/ui/src/components/Tooltip.tsx`](../../packages/ui/src/components/Tooltip.tsx). Wraps Mantine `Tooltip` with the Clementine token contract.

## 1. Purpose & Intent

Short, supplementary text revealed on hover or keyboard focus. Names an icon-only button, explains a truncated label, surfaces a keyboard shortcut.

**Tooltip must:**
- expose `role="tooltip"` on the bubble
- be linked to the trigger via `aria-describedby` (NOT `aria-label` — see §3)
- open on both hover AND focus, not just hover
- close on Escape and on blur
- delay opening by 200ms to avoid flicker on mouse pass-through
- close immediately on mouse-out (no close delay)

## 2. Required Contract

### 2.1 Required ARIA

| Attribute | Where | Value |
|---|---|---|
| `role` | bubble | `"tooltip"` |
| `id` | bubble | unique, referenced by trigger's `aria-describedby` |
| `aria-describedby` | trigger | the bubble's id |

> **Critical:** `aria-describedby` (not `aria-label`). The tooltip *describes* the trigger; it doesn't *replace* the trigger's accessible name. An icon-only button needs `aria-label` for its name AND `aria-describedby` for the tooltip.

### 2.2 Required HTML structure

```html
<button aria-label="Save changes" aria-describedby="tip-save">
  <svg>…</svg>
</button>

<div id="tip-save" role="tooltip" class="tooltip">
  ⌘ + S
</div>
```

## 3. Content rules

Tooltip text is **supplementary**. The interface must work without it. Three rules:

| Rule | Example |
|---|---|
| Keep it short — ideally under 6 words | "⌘+S", "Recent items", not full sentences |
| Don't repeat the visible label | Visible "Save" → don't tooltip "Save". Tooltip "⌘+S". |
| Don't put interactive content inside | No links, no buttons, no inputs. Tooltips disappear; users can't reach those targets. |

## 4. Behavior

| Trigger | Behavior |
|---|---|
| Mouse hover | Open after 200ms delay; close immediately on mouse-out |
| Keyboard focus | Open immediately (no delay); close on blur |
| Escape | Close, restore nothing (focus stays on trigger) |
| Click | Does not affect tooltip — preserves the trigger's click behavior |
| Touch | Open on first tap (replacing click); subsequent tap activates trigger |

## 5. Variants & positions

Position relative to trigger: `top` | `bottom` | `left` | `right`. Auto-flip to opposite when there's no room.

| Variant | When |
|---|---|
| `default` | Most cases |
| `multiline` | Text longer than 40 chars (rare — usually means tooltip should be a popover) |
| `with-shortcut` | Visible kbd hint formatting (`⌘+S` styled as a key) |

## 6. Do / Don't

**Do**
- Use for icon-only buttons (Tooltip names the action; `aria-label` also names it for SR)
- Use for keyboard shortcut hints
- Use for truncated text (full text on hover)

**Don't**
- Put critical info in a tooltip — touch users and screen-reader users may not surface it
- Nest a tooltip inside another tooltip
- Open on click — that's a Popover, different component (not yet specced)
- Open without delay on hover — causes flicker

## 7. Agent notes

1. If the agent is generating an icon-only button, pair it with a Tooltip automatically. This is non-negotiable.
2. The trigger always keeps its own `aria-label`; the Tooltip adds `aria-describedby`.
3. Default position is `top`. Override only when there's a clear reason (toolbar at top → `bottom`).
4. Never use Tooltip text as the only carrier of meaning. If a user can't read the tooltip, can they still use the interface? If no, redesign — don't add a tooltip.
