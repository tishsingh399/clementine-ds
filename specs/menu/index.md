---
component: menu
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [aria-haspopup, aria-expanded, role]

semantic_parts:
  root:     The Menu controller — owns open state and positioning
  target:   The trigger element (button) that opens the dropdown
  dropdown: The floating surface — role="menu"
  item:     An action — role="menuitem"
  label:    A non-interactive group heading inside the dropdown
  divider:  A separator between item groups

token_contract:
  - menu.bg
  - menu.border
  - menu.shadow
  - menu.radius
  - menu.item.fg
  - menu.item.fg-danger
  - menu.item.bg-hover
  - menu.label
  - menu.divider

interaction_states: [closed, open, item-hover, item-focus, item-disabled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Menu.tsx
    underlying_library: mantine
    exports: [Menu, MenuTarget, MenuDropdown, MenuItem, MenuLabel, MenuDivider, MenuProps, MenuItemProps, MenuLabelProps, MenuDividerProps, MenuTargetProps, MenuDropdownProps]
  storybook:
    path: apps/storybook/stories/Menu.stories.tsx
  tokens:
    primitives: packages/tokens/src/primitives.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json
    component: packages/tokens/src/components/menu.json

patterns_used_in: [action-bar, row-actions, global-header]
pages_used_in: [dashboard, list-view, settings]
---

# AGENTIC DOCUMENTATION: MENU

> **Implementation:** [`packages/ui/src/components/Menu.tsx`](../../packages/ui/src/components/Menu.tsx) — re-exports Mantine `Menu` and its `Target` / `Dropdown` / `Item` / `Label` / `Divider` parts.

## 1. Purpose & Intent

A dropdown list of **actions** triggered by a control — row actions, an overflow "⋯" menu, an account menu. For *selecting a value*, use Select; Menu is for *doing things*.

**Menu must:**

- expose `aria-haspopup="menu"` and `aria-expanded` on the trigger
- render the dropdown as `role="menu"` and each action as `role="menuitem"`
- support roving focus: ↑/↓ move between items, Esc closes and returns focus to the trigger
- mark destructive actions with `color="red"` (maps to `menu.item.fg-danger`) AND clear wording
- close on selection, Escape, and outside click

## 2. Required Contract

### 2.1 Required ARIA (Mantine wires these — keep them)

| Attribute | Where | Value |
|---|---|---|
| `aria-haspopup` | target | `"menu"` |
| `aria-expanded` | target | `true` / `false` |
| `role="menu"` | dropdown | — |
| `role="menuitem"` | item | — |
| `aria-disabled` | item | when disabled |

### 2.2 Required structure

```html
<button aria-haspopup="menu" aria-expanded="false">Actions</button>
<div role="menu" class="menu__dropdown">
  <div class="menu__label">Session</div>
  <button role="menuitem">View details</button>
  <hr class="menu__divider" />
  <button role="menuitem" data-danger>Revoke access</button>
</div>
```

### 2.3 Required token bindings

| Part | State | Token | Resolves (light) |
|---|---|---|---|
| dropdown fill | default | `menu.bg` → `{surface.elevated}` | `#ffffff` |
| dropdown border | default | `menu.border` → `{border.default}` | `#e5e5e0` |
| dropdown elevation | default | `menu.shadow` → `{shadow.lg}` | `0 8px 24px rgba(0,0,0,0.16)` |
| corners | — | `menu.radius` → `{radius.md}` | `6px` |
| item text | default | `menu.item.fg` → `{text.primary}` | `#1a1a18` |
| destructive item | default | `menu.item.fg-danger` → `{feedback.error}` | `#dc2626` |
| item | hover/focus | `menu.item.bg-hover` → `{surface.subtle}` | `#f3f3f0` |
| group heading | default | `menu.label` → `{text.secondary}` | `#6b6b66` |
| separator | default | `menu.divider` → `{border.default}` | `#e5e5e0` |

## 3. Interaction States

| State | Visual change | Token |
|---|---|---|
| closed | dropdown hidden, trigger `aria-expanded="false"` | — |
| open | dropdown elevated over content | `menu.bg`, `menu.shadow` |
| item-hover | item fill shifts | `menu.item.bg-hover` |
| item-focus | same fill via keyboard roving focus | `menu.item.bg-hover` |
| item-disabled | dimmed, skipped by arrow keys | `{text.tertiary}` |

## 4. Variants

- **Destructive item:** `color="red"` → `menu.item.fg-danger`.
- **Grouped:** `MenuLabel` + `MenuDivider` to segment actions.
- **Position:** `bottom-start` (default), `bottom-end`, `top-start`, etc.

## 5. Do / Don't

**Do:**
- Use Menu for actions, Select for values
- Group with labels + dividers when there are 6+ items
- Put destructive actions last, visually separated, in danger color

**Don't:**
- Put form fields or inputs inside a menu — that's a Popover
- Rely on red alone for destructive — pair color with the verb ("Revoke", "Delete")
- Nest menus more than one level deep

## 6. Agent Notes

1. Keep Mantine's `role="menu"` / `role="menuitem"` wiring — don't paint menu roles onto plain divs.
2. Destructive item = `color="red"` (token `menu.item.fg-danger`) AND explicit wording.
3. Story names map to states; add `Opened` / position variants as needed. All paint is `menu.*` → semantic → primitive.
