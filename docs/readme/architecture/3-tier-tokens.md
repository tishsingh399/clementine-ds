# The 3-tier token architecture

[Tokens package](https://github.com/tishsingh399/clementine-ds/tree/main/packages/tokens)

## Overview

Clementine organizes tokens into three tiers: primitive, semantic, component. Each tier references only the tier above it. Component colors never reference primitives directly. Dimensional tokens (radius, spacing, shadow, motion, typography) may — they have no semantic layer. Enforced by `scripts/lint-cascade-direction.mjs`.

This is not a new idea. Adobe Spectrum, IBM Carbon, Shopify Polaris, and BeyondTrust Shield all use some version of it. Clementine's version is small enough to read in one sitting.

## The three tiers

### Tier 1, primitives

Raw scales with no intent attached.

- File: `packages/tokens/src/primitives.json`
- Examples: `color.blue.6`, `radius.md`, `spacing.lg`, `typography.font-size.xl`

```json
{
  "color": {
    "blue": {
      "6": { "$value": "#2563eb", "$type": "color" }
    }
  },
  "radius": {
    "md": { "$value": "8px", "$type": "dimension" }
  }
}
```

Primitives reference nothing. They are literal hex values, pixel measurements, and number scales.

### Tier 2, semantic

Intent. The name says what the value is for, not what it looks like.

- Files: `packages/tokens/src/semantic-light.json`, `semantic-dark.json`
- Examples: `action.primary`, `surface.elevated`, `feedback.error`, `focus.ring`

```json
{
  "action": {
    "primary": { "$value": "{color.blue.6}", "$type": "color" }
  },
  "feedback": {
    "error": { "$value": "{color.red.6}", "$type": "color" }
  }
}
```

Semantic tokens reference primitives. They never reference each other, and never reference component tokens.

> **Note:** Dark mode lives in a separate file with the same names. Switching themes is a matter of resolving through `semantic-dark.json` instead of `semantic-light.json`. The semantic vocabulary is identical.

### Tier 3, component

Per-component bindings. The name says which component and which part.

- Files: `packages/tokens/src/components/<name>.json`
- Examples: `button.bg.default`, `badge.bg.success`, `text-input.border.focus`

```json
{
  "button": {
    "bg": {
      "default": { "$value": "{action.primary}", "$type": "color" },
      "hover":   { "$value": "{action.primary-hover}", "$type": "color" }
    }
  }
}
```

Component tokens reference semantic tokens. Colors: always semantic, never primitive. Dimensionals: primitive references allowed (no semantic layer exists).

## Why three tiers, not two

Two tiers (primitive + semantic) is enough for a small system. The pain shows up later:

- You want to retheme a single component without affecting the rest of the system. Without a component tier, you cannot.
- You upgrade a semantic token and have to audit every component that uses it. With a component tier, only the components whose token references it need review.
- An agent asks "what color should the button hover state be?" Without a component tier, the answer is "whichever semantic is currently bound to `bg-interactive-hover-primary`," which the agent has to derive. With a component tier, the answer is `button.bg.hover`, full stop.

The third tier costs you one extra file per component. The payoff is that the contract a spec references is unambiguous.

## The cascade rule

```
primitives.json         tier 1
    │
    │  semantic references primitive
    ▼
semantic-{light,dark}    tier 2
    │
    │  component references semantic
    ▼
components/<name>.json   tier 3
    │
    │  TSX references component
    ▼
packages/ui/src/...      tier 4 (the code)
```

The arrow goes one way. Skipping a tier is not allowed.

| You have | You must NOT |
|---|---|
| A button bg color | Bind it directly to `{color.blue.6}` from `button.json` |
| A new error message styling | Bind it to `text.error` if no `feedback.error-message` exists yet. Add the semantic first. |
| A one-off page heading color | Use an existing semantic. If none fits, propose a new one. Never inline a hex. |

## How this shows up in the spec

A component's `tokens.json` lists only component-tier entries. The `references` field on each entry shows the semantic it binds to. The `primitive` field shows the ultimately resolved value.

```json
{
  "name": "button.bg.default",
  "tier": "component",
  "role": "default-fill",
  "path": "button.bg.default",
  "references": "{action.primary}",
  "primitive": "{color.blue.6}",
  "light": "#2563eb"
}
```

An agent reading this knows three things at once: what token to bind in code (`button.bg.default`), what intent it carries (`action.primary`), and what color resolves on the page (`#2563eb`).

## Do / Don't

**Do:**
- Add a component token whenever a component needs a new value
- Keep semantic names intent-shaped, not appearance-shaped (`text.primary`, not `text.dark`)
- Use `references` and `primitive` fields when documenting component tokens

**Don't:**
- Reference a primitive from a component file
- Reference one semantic from another
- Hardcode a hex in TSX or CSS
- Add a component token that has no semantic intent (if it is truly one-off, the design probably needs review)

## Related

- [Primitives reference](../tokens/primitives.md)
- [Semantic reference](../tokens/semantic.md)
- [Component reference](../tokens/component.md)
- [How agents read this](./agentic-specs.md)
