---
component: alert
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [role, aria-live]

semantic_parts:
  root:    Container with intent-specific bg + border
  icon:    Lead icon matching the intent
  title:   Optional short heading
  body:    Required descriptive text
  close:   Optional close button (only for dismissible variant)
  actions: Optional inline ActionBar for primary + dismiss

token_contract:
  - alert.bg.info
  - alert.bg.success
  - alert.bg.warning
  - alert.bg.error
  - alert.border.info
  - alert.border.success
  - alert.border.warning
  - alert.border.error
  - alert.fg.title
  - alert.fg.body
  - alert.icon.info
  - alert.icon.success
  - alert.icon.warning
  - alert.icon.error
  - alert.radius

interaction_states: [visible, dismissing]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Alert.tsx
    underlying_library: mantine
    exports: [Alert, AlertProps]
  storybook:
    path: apps/storybook/stories/Alert.stories.tsx
  tokens:
    primitives: packages/tokens/src/primitives.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json
    component: packages/tokens/src/components/alert.json

patterns_used_in: [form-field, page-header]
pages_used_in: [login, signup, settings, billing]
---

# AGENTIC DOCUMENTATION: ALERT

> **Implementation:** [`packages/ui/src/components/Alert.tsx`](../../packages/ui/src/components/Alert.tsx). Wraps Mantine `Alert` with explicit intent-based variants bound to component tokens.

## 1. Purpose & Intent

Inline status message. Calls attention to something the user needs to know without interrupting their flow. Four intents: info, success, warning, error.

**Alert must:**
- expose `role="alert"` for error and warning; `role="status"` for info and success
- expose `aria-live="polite"` (or `assertive` for error)
- be readable without color (icon + text together carry the meaning)
- support keyboard dismissal when the dismiss button is present

## 2. Required Contract

### 2.1 Required ARIA

| Attribute | Value | Notes |
|---|---|---|
| `role` | `alert` (error, warning) or `status` (info, success) | Determines screen reader urgency |
| `aria-live` | `assertive` (error) or `polite` (others) | Matches role intensity |
| `aria-label` on dismiss button | `"Dismiss alert"` or similar | Required when dismiss button is icon-only |

### 2.2 Required HTML Structure

```html
<div role="status" aria-live="polite" class="alert" data-intent="success">
  <svg class="alert__icon">…</svg>
  <div class="alert__content">
    <p class="alert__title">Saved</p>
    <p class="alert__body">Your changes have been applied.</p>
  </div>
  <button class="alert__close" aria-label="Dismiss alert">×</button>
</div>
```

Title is optional; body is required.

## 3. Intent variants

| Intent | When | Icon | Tokens |
|---|---|---|---|
| `info` | Neutral notice, FYI | ℹ️ info | `alert.{bg,border,icon}.info` |
| `success` | Action completed | ✓ check | `alert.{bg,border,icon}.success` |
| `warning` | Caution, soft recoverable issue | ⚠ triangle | `alert.{bg,border,icon}.warning` |
| `error` | Hard failure, user must act | ✕ circle | `alert.{bg,border,icon}.error` |

## 4. Variants

| Variant | Dismissible | Use when |
|---|---|---|
| `inline` | No | Status on a form, sits in normal flow |
| `dismissible` | Yes (close button) | Top-of-page banner, can be dismissed by user |
| `with-actions` | Optional | Has inline action like "Retry" or "View details" |

## 5. Do / Don't

**Do**
- Pair icon + text so meaning isn't carried by color alone
- Use `error` intent only for hard failures the user must address
- Default to `info` when in doubt — escalating intent is cheap, downgrading is awkward

**Don't**
- Use Alert for toasts. Toasts (not yet specced) are transient; Alerts persist.
- Stack 4+ Alerts vertically. Group them or summarize.
- Use Alert for form-field errors. Inline error text under the field is correct; the FormField pattern handles this.

## 6. Agent notes

1. Pick the intent from the surrounding context. "Successfully saved" → success. "Could not connect" → error.
2. Use `with-actions` only when there's a clear next step. "Retry" yes; "OK" no.
3. Never invent new intent colors. Four is the surface area.
4. Dismissible Alerts must restore focus to a sensible neighbor on close.
