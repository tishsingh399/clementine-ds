# Tabs

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/tabs/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Tabs.tsx)

Status: `Draft`. Arrow-key navigation needs verification.

## Overview

Switch between sibling views of related content within the same page region. For top-level navigation use a side nav. For primary actions use Buttons.

## Anatomy

| Part | Purpose |
|---|---|
| `list` | `<div role="tablist">` |
| `tab` | `<button role="tab">` |
| `indicator` | Active-tab underline or pill |
| `panel` | `<div role="tabpanel">` revealed by the active tab |

## States

`default`, `hover`, `focus`, `selected`, `disabled`

## Accessibility

- `role="tablist"` on the wrapper, `role="tab"` on each tab, `role="tabpanel"` on each panel
- Arrow keys move focus between tabs
- On tab change, update `aria-selected` and show only the active panel
- Focus order: Tab from tablist to active panel content

## Related

- [Button](./button.md)
