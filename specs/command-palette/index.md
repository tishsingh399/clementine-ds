---
component: command-palette
ds_version: clementine-ds@0.1.0 (2026-10-17 verified)
status: AI-Ready
last_verified: 2026-10-17
verified_by: [contract, slots, freshness, token-lint, storybook-browser]

category: Component
required_aria: [role=combobox, aria-controls, aria-activedescendant, role=listbox, role=option, aria-selected]

semantic_parts:
  root:        the dialog (Clementine Modal) — owns focus trap, Esc, overlay
  input:       the search box; keeps focus while arrows move the highlight
  list:        the listbox of results
  group-label: heading above a group of commands
  item:        one command row
  shortcut:    keyboard hint at the end of a row (display only)
  empty:       message when nothing matches

slots:
  item: [ThemeIcon, Avatar]

token_contract:
  - command-palette.bg
  - command-palette.border
  - command-palette.item-fg
  - command-palette.item-bg-active
  - command-palette.group-label
  - command-palette.shortcut
  - command-palette.empty

interaction_states: [default, closed, open, empty, active-item]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/CommandPalette.tsx
    underlying_library: custom (Mantine primitives + tokens)
    exports: [CommandPalette, CommandPaletteProps, CommandItem, filterCommands]
  storybook:
    path: apps/storybook/stories/CommandPalette.stories.tsx
  tokens:
    component: packages/tokens/src/components/command-palette.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: [command-launcher, global-search]
pages_used_in: [issue-board, dashboard, doc-page, trace-explorer]
---

# AGENTIC DOCUMENTATION: COMMANDPALETTE

> **Implementation:** [`packages/ui/src/components/CommandPalette.tsx`](../../packages/ui/src/components/CommandPalette.tsx). Worked examples: [`docs/worked-examples/`](../../docs/worked-examples/README.md).

The ⌘K launcher found in issue trackers, dashboards, wikis and agent consoles: one search box over a grouped list of actions and destinations.

## Use it when
- The app has more actions than fit in visible chrome, or power users need keyboard-only navigation.
- You want one place for "go to", "create" and "change" commands.

## Don't use it for
- Searching records with rich results (thumbnails, snippets, pagination). Use `SearchField` + a results `Table`/`List` page.
- A single choice inside a form. Use `Select` or `Autocomplete`.

## Contract
- **Data, not children.** Pass `items: CommandItem[]`. Each item has `id`, `label`, optional `group`, `keywords`, `shortcut`, `leftSection`, and `onSelect`. Don't build rows yourself.
- `leftSection` takes only `ThemeIcon` or `Avatar` (see `slots`).
- `shortcut` is a hint. The palette doesn't bind it. Register global keys in the app.
- The app owns `opened`. Open on ⌘K/Ctrl+K and close in `onClose`. The palette resets its query when it closes.
- Groups appear in order of their first item. Arrow keys follow the grouped order on screen.

## Accessibility
The input is a `combobox` with `aria-activedescendant`, so focus never leaves it. `ArrowUp`/`ArrowDown` wrap around. `Enter` runs the command and closes the palette. `Esc` closes it (Modal). Mouse-down on a row doesn't steal focus.

| Token | Resolves through | Light |
|---|---|---|
| `command-palette.bg` | `{surface.elevated}` | `#ffffff` |
| `command-palette.border` | `{border.default}` | `#d5d3d0` |
| `command-palette.item-fg` | `{text.primary}` | `#2a2926` |
| `command-palette.item-bg-active` | `{action.selected-subtle}` | `#e5eeff` |
| `command-palette.group-label` | `{text.tertiary}` | `#6e6b65` |
| `command-palette.shortcut` | `{text.secondary}` | `#65635e` |
| `command-palette.empty` | `{text.secondary}` | `#65635e` |

**Do:** Write labels as verb + object ("Assign to me"); add `keywords` for synonyms; group by intent (Actions, Navigation, Settings).
**Don't:** Put destructive commands in without a confirm step in `onSelect`; show a shortcut the app doesn't handle.
