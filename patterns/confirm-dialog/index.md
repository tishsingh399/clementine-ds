---
pattern: confirm-dialog
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Pattern
required_aria: [role, aria-modal, aria-labelledby, aria-describedby]

semantic_parts:
  modal:   "The blocking overlay + dialog (Modal component)"
  title:   "Short verb phrase naming the consequence"
  body:    "Explanation of what will happen + scope"
  actions: "ActionBar with Cancel + destructive (or primary) confirm"

components_used:
  - modal
  - button

patterns_used:
  - action-bar

token_contract:
  # All visual tokens come from Modal + Button.
  # The pattern owns copy guidelines and motion.
  - spacing.md
  - spacing.lg

interaction_states: [closed, opening, open, confirming, closing]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  storybook:
    path: apps/storybook/stories/patterns/ConfirmDialog.stories.tsx
  tokens:
    semantic_light: packages/tokens/src/semantic-light.json

used_in: [delete-user, revoke-session, discard-changes, leave-page, sign-out]
---

# PATTERN: CONFIRM-DIALOG

> The Modal + ActionBar combination that interrupts a user before an irreversible action. Forces a second decision. Used sparingly because it costs a click.

## 1. When to use

Required:
- The action is **irreversible** (delete, revoke, sign out, leave-without-saving)
- The action affects **other people** (revoke a team member's access)
- The action removes **substantial work** (discard 30 minutes of edits)

Not required:
- The action is reversible within the session (toggle, undo-able edit)
- The action is reversible within seconds via a Toast Undo (the modern pattern — prefer this)

## 2. Anatomy

```
<Modal>
  ├─ Title:    "Revoke session?"                            (verb + object + ?)
  ├─ Body:     "This will sign Maya out of all 3 devices.   (consequence + scope)
  │             They'll need to re-authenticate."
  └─ ActionBar:
       └─ [ Cancel (outline) ]   [ Revoke (filled destructive) ]
</Modal>
```

## 3. Copy rules

The hardest part of this pattern isn't the structure — it's the writing. Three rules:

### 3.1 Title is a question or a verb phrase, not a statement

| ✅ Good | ❌ Bad |
|---|---|
| `Revoke session?` | `Are you sure?` |
| `Delete project?` | `Delete confirmation` |
| `Discard changes?` | `Unsaved changes` |

### 3.2 Body names the consequence AND the scope

| ✅ Good | ❌ Bad |
|---|---|
| `This will sign Maya out of all 3 devices.` | `Are you sure you want to revoke?` |
| `Will permanently delete the project and all 47 files inside.` | `This cannot be undone.` |
| `Your unsaved edits (3 minutes of work) will be lost.` | `You have unsaved changes.` |

### 3.3 Confirm button names the consequence

| ✅ Good | ❌ Bad |
|---|---|
| `Revoke session` | `Confirm` |
| `Delete project` | `Yes` |
| `Discard changes` | `OK` |

The user should be able to read ONLY the confirm button text and know what will happen.

## 4. Required ARIA

Inherits from Modal:
- `role="dialog"` on the dialog container
- `aria-modal="true"`
- `aria-labelledby` points at the Title's id
- `aria-describedby` points at the Body's id

Plus from ActionBar:
- Cancel and Confirm both reachable via Tab
- Esc closes (treated as Cancel)
- Focus traps inside while open; restores to the trigger on close

## 5. Variants

### 5.1 Destructive (most common)

Filled-destructive confirm button. Cancel on the left.

### 5.2 Non-destructive primary

When the confirmation isn't about danger but about a one-way decision (e.g. "Submit application?"), use filled-primary instead of destructive.

### 5.3 With check-to-confirm

For very high-stakes actions (delete a workspace, transfer ownership), add a `Checkbox` requiring the user to type the resource name or check "I understand". Disable the confirm button until the box is satisfied.

## 6. Do / Don't

**Do**
- Default focus to **Cancel**. Enter should not confirm a destructive action without explicit intent.
- Add a Toast-Undo path on the OTHER side if technically possible (deleted item lives in trash for 30 days → softens the dialog to a one-shot warning)
- Name the consequence in the confirm button so screen reader users hear it

**Don't**
- Use ConfirmDialog as a router (`Are you sure you want to continue to settings?`) — that's friction, not safety
- Use destructive paint for non-destructive actions (no red Submit buttons)
- Hide the consequence in the body and put `Confirm` in the button. The button must name the act.

## 7. Agent notes

When generating a confirm flow:
1. Determine: is the action irreversible? If no, **don't generate a ConfirmDialog** — use Toast Undo instead.
2. Write copy in this order: confirm button → title → body. (The button is the most important; users skip the body.)
3. Pair with destructive variant when the action removes data.
4. Default focus to Cancel.

## 8. Related

- [Modal spec](../../specs/modal/index.md)
- [Button spec](../../specs/button/index.md)
- [Action Bar](../action-bar/index.md)
