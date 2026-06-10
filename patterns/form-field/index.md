---
pattern: form-field
ds_version: clementine-ds@HEAD (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Pattern
required_aria: [aria-required, aria-invalid, aria-describedby]

semantic_parts:
  label:         "The <label> for the input"
  control:       "One of TextInput, Textarea, Select, Checkbox, Radio, Switch"
  helper:        "Optional explanatory text below the control"
  error:         "Error message shown when validation fails"
  required-mark: "Asterisk or (required) text next to the label"

components_used:
  - text-input | textarea | select | checkbox | radio | switch
  - badge  # for "Required" or "Optional" markers in some variants

token_contract:
  # Form fields inherit from their child control's tokens.
  # The pattern itself owns layout (spacing, label color when secondary, error color).
  - text.primary
  - text.secondary
  - feedback.error
  - spacing.sm
  - spacing.md

interaction_states: [default, focused, filled, error, disabled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  storybook:
    path: apps/storybook/stories/patterns/FormField.stories.tsx
  tokens:
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

used_in: [login, signup, settings, profile-edit, password-reset]
---

# PATTERN: FORM-FIELD

> The atomic unit of every form in Clementine. Pairs a label, a control, optional helper text, and an error slot — with proper ARIA wiring and consistent spacing.

## 1. When to use

Every time you need a labelled form input. There is no scenario where Clementine puts a TextInput, Textarea, Select, Checkbox, or Radio in a form WITHOUT wrapping it in a FormField.

## 2. Structure

```
<FormField>
  ├─ <Label>             text.primary, with required-mark if needed
  ├─ <Control>           one of: TextInput | Textarea | Select | Checkbox | Radio | Switch
  ├─ <Helper>            text.secondary, optional
  └─ <Error>             feedback.error, only when aria-invalid="true"
</FormField>
```

Vertical stack. `spacing.sm` (8px) between Label and Control. `spacing.md` (16px) between Control and Helper/Error.

## 3. ARIA wiring (the part agents get wrong)

| Element | Attribute | Value |
|---|---|---|
| `<Label>` | `htmlFor` | id of the Control |
| `<Control>` | `id` | matches Label's `htmlFor` |
| `<Control>` | `aria-required` | `"true"` when required |
| `<Control>` | `aria-invalid` | `"true"` when error is shown |
| `<Control>` | `aria-describedby` | id of `<Helper>` AND/OR `<Error>` (space-separated) |
| `<Helper>` | `id` | referenced by `aria-describedby` |
| `<Error>` | `id` | referenced by `aria-describedby` |

The `aria-describedby` must include **both** Helper and Error ids (space-separated) when both are present. Many agents emit only one — the validator catches this.

## 4. Visual states

| State | What changes |
|---|---|
| default | Label `text.primary`, Helper `text.secondary` if present |
| focused | Control inherits its own focus styling |
| filled | Control inherits its own filled state |
| error | Error visible with `feedback.error`; Control's border becomes error color via its own token |
| disabled | All text fades to `text.tertiary`; Control's own disabled tokens apply |

## 5. Do / Don't

**Do**
- Always include a `<Label>`. Visible by default; `aria-label` is a last resort for icon-only contexts (which don't exist in forms).
- Mark required fields. Either `*` asterisk or "(required)" — be consistent within a form.
- Pair every required field with client-side validation. Server errors flow into the same Error slot.

**Don't**
- Skip `<Label>` and rely on `placeholder` text. Placeholders disappear on input and fail accessibility.
- Use color alone to indicate error. The Error slot's text + `aria-invalid="true"` are both required.
- Wrap multiple controls in one FormField. One field per FormField. Use a `Fieldset` (not yet specced) for grouped controls like Radio sets.

## 6. Agent notes

Before generating a form, the agent must:
1. Identify each input → wrap in FormField
2. Generate a stable `id` for each Control
3. Wire `htmlFor` ↔ `id` ↔ `aria-describedby` deterministically
4. Decide if Helper, Error, or both are needed up front (changes the `aria-describedby` value)
5. Reference only the 5 tokens in `token_contract` — never invent layout values

## 7. Related

- [Action Bar](../action-bar/index.md) — sits at the bottom of forms
- [Confirm Dialog](../confirm-dialog/index.md) — destructive submit confirmations
- [TextInput spec](../../specs/text-input/index.md)
- [Checkbox spec](../../specs/checkbox/index.md)
