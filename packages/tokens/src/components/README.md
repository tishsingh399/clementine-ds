# Component tokens — tier 3

This directory holds the third tier of the Clementine token cascade.

```
primitives.json          tier 1 — raw scales (color.blue.6, radius.md, spacing.sm)
       │
       ▼
semantic-{light,dark}    tier 2 — intent (action.primary, surface.elevated)
       │
       ▼
components/<name>.json   tier 3 — per-component bindings (button.bg.default)
```

## The cascade rule

- **Primitives reference nothing.** They are literal hex / px / number values.
- **Semantic references primitives.** Never another semantic, never a component.
- **Components reference semantic.** Never primitives directly, never another component.

This is enforced by the spec validator (`agentic-spec validate`) when a component spec is checked: any token in `token_contract` that references a primitive directly is a `bad-token-tier` finding.

## Why component tokens

A component token is an explicit, named binding between an intent (semantic) and a single visible part of a component. They give you:

- **One place to retheme a single component** — change `button.bg.default` without touching `action.primary`, which would affect every primary action across the system.
- **A safer surface for design system upgrades** — bumping the underlying semantic token only needs review for components whose token explicitly references it.
- **A real contract for `agentic-spec`** — every spec's `token_contract` should reference component-tier names. The validator can then check 1:1 against this directory.

## Adding a new component token file

1. Create `<component>.json` in this directory, kebab-case name.
2. Reference only semantic tokens from `../semantic-light.json` (light values; dark resolves through the same names in `semantic-dark.json`).
3. Use the `$value` / `$type` shape — same as primitives + semantic — so Style Dictionary can transform it.
4. Reflect the file in that component's spec (`specs/<name>/tokens.json`) — every entry there should map to a key in this file.

## What's here

- [`button.json`](./button.json) — Button: bg (default/hover/active/disabled + destructive variants), fg (on-filled/on-outline/disabled), border, radius
- [`badge.json`](./badge.json) — Badge: bg per intent (neutral / success / error / warning / 4 risk tiers), fg, radius
- [`text-input.json`](./text-input.json) — TextInput: bg, fg (value/placeholder/disabled), border per state, focus ring, radius
- _Other 7 components: pending — same pattern, one file each._
