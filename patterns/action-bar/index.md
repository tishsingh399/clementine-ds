---
pattern: action-bar
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Pattern
required_aria: []

semantic_parts:
  root:      "Horizontal flex container holding one or more buttons"
  primary:   "The filled-primary button (one max)"
  secondary: "Outline buttons that sit next to primary"
  tertiary:  "Subtle or text-link buttons for low-emphasis actions"
  spacer:    "Optional flex spacer that pushes destructive to the opposite end"

components_used:
  - button

token_contract:
  - spacing.md
  - spacing.lg

interaction_states: [default]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  storybook:
    path: apps/storybook/stories/patterns/ActionBar.stories.tsx
  tokens:
    semantic_light: packages/tokens/src/semantic-light.json

used_in: [modal-footer, form-footer, page-header-actions, table-row-actions, settings-section]
---

# PATTERN: ACTION-BAR

> The row of buttons at the bottom of a form, the footer of a modal, the top-right of a page header. Same shape, three placements, one set of rules.

## 1. When to use

- Below a form (Submit + Cancel)
- Footer of a Modal (Confirm + Cancel)
- Top-right of a page header (Create + secondary actions)
- Beside a settings section (Save + Discard)

## 2. Composition rules

| Constraint | Why |
|---|---|
| **One primary button per ActionBar** | Visual hierarchy. Two primaries split user attention. |
| Primary always on the right (LTR) | Convention. Matches macOS / web defaults. |
| Destructive separated from primary by a spacer | Prevents fat-finger mis-taps. Destructive lives on the far left. |
| Maximum 3 buttons total | More than 3 means the UI has too many escape hatches. Move overflow into a Menu. |

## 3. Variants

### 3.1 Form footer

```
[ Cancel (outline) ]    [ Save changes (filled primary) ]
```

Cancel on the left, primary on the right. Gap = `spacing.md`.

### 3.2 Modal footer

```
[ Cancel (outline) ]    [ Delete (filled destructive) ]
```

Same shape as form footer. Destructive replaces primary when the action is irreversible.

### 3.3 Destructive separation

When a destructive action coexists with a non-destructive primary:

```
[ Delete (filled destructive) ]   [spacer]   [ Cancel (outline) ]    [ Save (filled primary) ]
```

Destructive far left. Spacer pushes confirm/cancel to the right.

### 3.4 Page header

```
[ Filter (subtle) ]   [ Export (outline) ]   [ + New item (filled primary) ]
```

Three-button max. Primary always last.

## 4. Spacing

- Between buttons: `spacing.md` (16px)
- Around the ActionBar (padding from parent): `spacing.lg` (24px) top/bottom

## 5. Do / Don't

**Do**
- Match button sizes within an ActionBar (all `md` or all `sm` — never mixed)
- Use `outline` for Cancel, NOT `subtle` — outline is the canonical secondary
- Show keyboard hints in a Tooltip on hover for primary actions (e.g. `⌘+Enter` for Submit)

**Don't**
- Stack ActionBar buttons vertically. Horizontal-only. If you need vertical, you have too many actions.
- Use icon-only buttons in ActionBars. Recruiter/user clarity wins over compactness.
- Right-align everything when there's only one button. A single button can be left-aligned, centered, or right-aligned per context.

## 6. Agent notes

When generating an ActionBar:
1. Count the buttons. >3 = restructure (move overflow into a Menu).
2. Identify the primary action. Exactly one. Last in the row (LTR).
3. If destructive coexists with primary, add a spacer between them.
4. Use Button's `intent="primary"`, `intent="destructive"`, `variant="outline"` — never custom paints.

## 7. Related

- [Button spec](../../specs/button/index.md)
- [Confirm Dialog](../confirm-dialog/index.md)
- [Form Field](../form-field/index.md)
