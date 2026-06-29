---
component: avatar
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [alt]

semantic_parts:
  root:           The circular container — owns size, radius, background
  image:          The user/entity photo when a src is provided
  placeholder:    Initials or fallback icon when no image
  group:          AvatarGroup wrapper that overlaps members
  group-overflow: The "+N" truncation chip at the end of a group

token_contract:
  - avatar.bg
  - avatar.fg
  - avatar.border
  - avatar.ring
  - avatar.radius

interaction_states: [default, focus]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Avatar.tsx
    underlying_library: mantine
    exports: [Avatar, AvatarGroup, AvatarProps, AvatarGroupProps]
  storybook:
    path: apps/storybook/stories/Avatar.stories.tsx
  tokens:
    primitives: packages/tokens/src/primitives.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json
    component: packages/tokens/src/components/avatar.json

patterns_used_in: [data-display, global-header, comment-thread]
pages_used_in: [dashboard, list-view, profile]
---

# AGENTIC DOCUMENTATION: AVATAR

> **Implementation:** [`packages/ui/src/components/Avatar.tsx`](../../packages/ui/src/components/Avatar.tsx) — re-exports Mantine `Avatar` + `Avatar.Group`.

## 1. Purpose & Intent

A compact, recognizable stand-in for a person or entity — a photo, initials, or a fallback icon. Used in headers, tables, comment threads, and presence stacks.

**Avatar must:**

- always carry a text alternative — `alt` for image avatars, an accessible `name` (initials) otherwise
- degrade gracefully: image → initials → neutral placeholder, never a broken-image icon
- stay circular by default (`avatar.radius` = full); square only for brand/asset logos
- never encode meaning in color alone — color is decorative, the name/initials carry identity

## 2. Required Contract

### 2.1 Required ARIA

| Case | Requirement |
|---|---|
| Image avatar | `alt` describing the person ("Tina Singh") — not "avatar" or "" |
| Initials avatar | `name` prop (Mantine derives initials + an accessible label) |
| Decorative only (name shown adjacent) | `alt=""` so AT skips the duplicate |
| Interactive (links to profile) | the wrapping link/button owns `aria-label` + focus |

### 2.2 Required structure

```html
<span class="avatar" role="img" aria-label="Tina Singh">
  <img src="…" alt="Tina Singh" />   <!-- or -->
  <span class="avatar__placeholder">TS</span>
</span>
```

### 2.3 Required token bindings

| Part | Token | Resolves (light) |
|---|---|---|
| placeholder fill | `avatar.bg` → `{surface.subtle}` | `#f3f3f0` |
| initials / icon | `avatar.fg` → `{text.secondary}` | `#6b6b66` |
| ring between stacked members | `avatar.border` → `{border.default}` | `#e5e5e0` |
| focus ring (interactive) | `avatar.ring` → `{focus.ring}` | `#ff8040` |
| corners | `avatar.radius` → `{radius.xl}` | `99px` (full) |

## 3. Interaction States

| State | Applies when | Visual change | Token |
|---|---|---|---|
| default | always | base | `avatar.bg`, `avatar.fg` |
| focus | interactive only | ring on `:focus-visible` | `avatar.ring` |

## 4. Variants

- **Sizes:** `xs`–`xl` via Mantine `size`.
- **Group:** `AvatarGroup` overlaps members and separates them with `avatar.border`; cap visible members and render the rest as a `+N` placeholder.

## 5. Do / Don't

**Do:**
- Provide a meaningful `alt` / `name` every time
- Use `AvatarGroup` with a `+N` overflow rather than 12 raw avatars
- Pair with a visible name in dense UIs — the avatar supplements, doesn't replace

**Don't:**
- Use `alt="avatar"` or `alt="user photo"` — describe the person
- Convey status with avatar color alone — add a badge or label
- Stretch non-square images — let the component crop to the circle

## 6. Agent Notes

1. If you generate an interactive avatar (links to a profile), the wrapper owns focus + `aria-label`; the avatar itself stays `role="img"`.
2. Initials come from `name`; don't hand-slice strings.
3. All paint is `avatar.*` → semantic → primitive. No inline hex.
