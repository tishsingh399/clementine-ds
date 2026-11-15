---
pattern: settings-save
ds_version: clementine-ds@HEAD (2026-11-14 drafted)
status: Draft
last_verified: 2026-11-14

category: Pattern
required_aria: [aria-live, aria-describedby]

semantic_parts:
  section:   "A settings group: heading, short description, and the fields it owns"
  fields:    "Form fields inside the group (form-field pattern)"
  save_bar:  "ActionBar that appears when the group has unsaved changes: Discard + Save"
  status:    "Live region announcing unsaved, saving, saved, or error"
  danger:    "Separate group at the end of the page for destructive actions"

components_used:
  - button
  - toast
  - inline-message
  - modal

patterns_used:
  - form-field
  - action-bar
  - confirm-dialog

token_contract:
  # All visual tokens come from the composed components.
  # The pattern owns layout, state rules and copy.
  - spacing.md
  - spacing.lg
  - surface.subtle

interaction_states: [clean, dirty, saving, saved, error]

checks:
  aria_correct: false
  structure_correct: false
  states_complete: false
  tokens_valid: false
  no_invented_styles: false

sources:
  storybook:
    path: apps/storybook/stories/patterns/SettingsSave.stories.tsx  # not built yet
  tokens:
    semantic_light: packages/tokens/src/semantic-light.json

used_in: [account-settings, workspace-settings, agent-settings, notification-preferences]
---

# PATTERN: SETTINGS-SAVE

> How a settings page groups fields, tells people they have unsaved changes, saves, and keeps destructive actions apart. Shared components alone don't stop two settings pages from saving in two different ways. This pattern does.

## 1. When to use

- Any page where people change preferences and confirm them: account, workspace, agent, notification settings.

Not for:
- A single toggle that takes effect immediately (no save step; confirm with a Toast).
- Multi-step setup. Use [Wizard](../wizard/index.md).

## 2. Save model: pick one per page

| Model | Use when | Save control |
|---|---|---|
| **Instant** | Every field is reversible and cheap (toggles, theme) | None. Each change saves; failures roll back and show `toast.error`. |
| **Per section** (default) | Fields in a group depend on each other, or saving costs something | One save bar per section, shown only while that section has changes |

**Never mix models within one section.** A toggle that saves instantly next to a text field that waits for Save leaves people unsure what was kept.

## 3. Anatomy (per section)

```
Section: "Notifications"
  ├─ Description: "Choose what Clementine emails you about."
  ├─ Fields (form-field pattern)
  └─ Save bar (only while dirty), surface.subtle background
       ├─ Status: "Unsaved changes"                (aria-live="polite")
       └─ ActionBar: [ Discard (outline) ]  [ Save changes (filled primary) ]

Danger zone (last section on the page)
  └─ [ Delete workspace (outline destructive) ] → confirm-dialog
```

## 4. States

| State | What people see | Save | Discard |
|---|---|---|---|
| `clean` | No save bar | hidden | hidden |
| `dirty` | Save bar with "Unsaved changes" | enabled | enabled |
| `saving` | Save shows loading, label "Saving…" | disabled | disabled |
| `saved` | Save bar hides; `toast.success('Settings saved')` | hidden | hidden |
| `error` | Save bar stays; InlineMessage names the failure and the field | enabled | enabled |

Rules:
- **Dirty means different from the saved value**, not "touched". Typing a value and deleting it back returns to `clean`.
- **Keep edits on error.** A failed save never clears what the person typed.
- **Field errors go on the field** (form-field pattern); the save bar's InlineMessage only summarises and links to the first one.

## 5. Leaving with unsaved changes

- In-app navigation away from a dirty section opens [Confirm Dialog](../confirm-dialog/index.md): title `Discard changes?`, confirm `Discard changes`, default focus on Cancel.
- Browser close or reload uses the native `beforeunload` prompt. Don't build a custom one; browsers ignore custom text.
- Discard inside the page needs no dialog when the section has three or fewer changed fields; the person can see what they lose.

## 6. Destructive actions

- Live in a **separate last section**, never in a save bar.
- Each one is its own button that opens a confirm dialog. They are never "saved" with other settings.
- Use confirm-dialog variant 5.3 (type to confirm) for deleting a workspace or transferring ownership.

## 7. Accessibility

- Status text sits in an `aria-live="polite"` region so "Unsaved changes", "Saving" and "Saved" are announced.
- The save bar must not cover the last field. If it is sticky, reserve its height at the bottom of the scroll area.
- Save is reachable by Tab from the last field in its section. `⌘/Ctrl+S` may trigger Save for the focused section; document it in a Tooltip.
- An error moves focus to the first invalid field, which uses `aria-describedby` for its message.

## 8. Do / Don't

**Do**
- Name the button `Save changes`, not `Submit` or `Apply`.
- Take every color from tokens. The save bar background is `surface.subtle`.
- Use Button `intent` and `variant`. Never restyle a Button with inline colors.

**Don't**
- Show a disabled Save button on a clean page. Hide the bar instead.
- Put one global Save at the top of a long page with many sections.
- Hard-code colors or override Button styles. This is the exact failure in the SaveBar demo: hex background, an invented hover token as the Button fill, a raw orange border. `clementine/no-button-paint-override` now blocks inline paint on Button.

## 9. Agent notes

When building a settings screen:
1. Pick the save model (section 2) and write it in a comment at the top of the component.
2. Group fields into sections with a heading and one-line description each.
3. Track `saved` vs `current` values per section; derive `dirty` by comparing them.
4. Build the save bar from the [Action Bar](../action-bar/index.md) pattern. Discard is `variant="outline"`, Save is `intent="primary"`.
5. Put destructive actions in a final danger section, each wired to a confirm dialog.
6. Before finishing, check that no `style={{}}` sets a color and no Button receives a `style` prop.

## 10. Before this can be AI-Ready

- [ ] Storybook story covering all five states
- [ ] Figma frame and spec (a draft is in progress on the Clementine Figma file)
- [x] Lint rule: `clementine/no-button-paint-override` (no inline paint on Button)
- [ ] Flip the `checks` above once verified

## 11. Related

- [Action Bar](../action-bar/index.md)
- [Confirm Dialog](../confirm-dialog/index.md)
- [Form Field](../form-field/index.md)
- [Toast spec](../../specs/toast/index.md)
- [InlineMessage spec](../../specs/inline-message/index.md)
- Source: Matt Rothenberg, "You Don't Have a Design System" (mattrothenberg.com/notes/you-dont-have-a-design-system)
