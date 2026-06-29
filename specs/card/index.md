---
component: card
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: []

semantic_parts:
  root:    The surface container — owns border, radius, shadow, and padding
  section: Full-bleed region (CardSection) — media, headers, footers that ignore root padding
  title:   Optional heading inside the card
  body:    Supporting text / content

token_contract:
  - card.bg
  - card.bg-subtle
  - card.border
  - card.fg.title
  - card.fg.body
  - card.radius
  - card.shadow

interaction_states: [default, hover, focus]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Card.tsx
    underlying_library: mantine
    exports: [Card, CardSection, CardProps, CardSectionProps]
  storybook:
    path: apps/storybook/stories/Card.stories.tsx
  tokens:
    primitives: packages/tokens/src/primitives.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json
    component: packages/tokens/src/components/card.json

patterns_used_in: [data-display, empty-state, dashboard-tile]
pages_used_in: [dashboard, settings, list-view]
---

# AGENTIC DOCUMENTATION: CARD

> **Implementation:** [`packages/ui/src/components/Card.tsx`](../../packages/ui/src/components/Card.tsx) — re-exports Mantine `Card` + `Card.Section` with house defaults set in `clementine-theme` (bordered, radius `lg`, shadow `sm`, padding `lg`).

## 1. Purpose & Intent

A surface that groups related content into a single, scannable unit — a dashboard tile, a list row's detail, a settings block. The Card is **presentational by default**; it carries no interaction unless you make it one.

**Card must:**

- read as a single visual unit — one border, one radius, one shadow
- use `CardSection` for any region that should bleed to the edges (images, colored headers, footers)
- get its surface, border, and shadow from `card.*` tokens — never an inline hex
- become a real interactive element (`role`, keyboard focus, `:focus-visible` ring) only when the whole card is clickable

## 2. Required Contract

### 2.1 Conditional ARIA

A static Card needs **no** ARIA. A Card that is *entirely* clickable must expose interactive semantics on the root:

| Case | Requirement |
|---|---|
| Static container | none |
| Whole card is a link | render root as `<a href>` (Mantine `component="a"`) — do not wrap in a bare `onClick` div |
| Whole card is a button | `role="button"`, `tabIndex={0}`, key handler for Enter/Space, visible focus ring via `focus.ring` |
| Card *contains* actions | leave the root inert; the inner Button/Link own their own semantics |

### 2.2 Required HTML structure

```html
<div class="card">                 <!-- root: border + radius + shadow + padding -->
  <div class="card__section">…</div> <!-- optional full-bleed region -->
  <h4 class="card__title">…</h4>
  <p class="card__body">…</p>
</div>
```

### 2.3 Required token bindings

| Part | Token | Resolves (light) |
|---|---|---|
| root fill | `card.bg` → `{surface.elevated}` | `#ffffff` |
| nested/inset fill | `card.bg-subtle` → `{surface.subtle}` | `#f3f3f0` |
| border | `card.border` → `{border.default}` | `#e5e5e0` |
| title | `card.fg.title` → `{text.primary}` | `#1a1a18` |
| body | `card.fg.body` → `{text.secondary}` | `#6b6b66` |
| corners | `card.radius` → `{radius.lg}` | `8px` |
| elevation | `card.shadow` → `{shadow.sm}` | `0 1px 3px rgba(0,0,0,0.08)` |

## 3. Interaction States

| State | Applies when | Visual change | Token |
|---|---|---|---|
| default | always | base surface | `card.bg`, `card.shadow` |
| hover | interactive only | lift shadow one step | `{shadow.md}` |
| focus | interactive only | 2px ring, offset 2px | `focus.ring` |

## 4. Variants

Driven by Mantine props (defaults in theme): `withBorder` (on), `shadow` (`sm`), `radius` (`lg`), `padding` (`lg`). For an inset/nested card use `card.bg-subtle`.

## 5. Do / Don't

**Do:**
- Use `CardSection` for media so images touch the card edges
- Keep one primary action per card
- Make the *whole* card clickable only when there's a single obvious destination

**Don't:**
- Wrap a card in a bare `<div onClick>` — that's invisible to keyboards and AT
- Nest cards more than one level — flatten the hierarchy
- Inline a shadow or radius — extend `card.*` tokens instead

## 6. Agent Notes

1. Every value comes from `card.*` (component tier) → semantic → primitive. Never bind `card.*` straight to a primitive.
2. If asked for a clickable card, add `role`/`tabIndex`/key handling AND the focus ring — don't ship a mouse-only card.
3. `CardSection` ignores root padding by design; don't fight it with negative margins.
