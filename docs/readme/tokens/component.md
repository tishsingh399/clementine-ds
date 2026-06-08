# Component tokens

[Source](https://github.com/tishsingh399/clementine-ds/tree/main/packages/tokens/src/components)

## Overview

Tier 3 of the cascade. Per-component bindings. One file per component in `packages/tokens/src/components/<name>.json`.

A component token is an explicit, named binding between an intent (semantic) and a single visible part of a component. It is what the spec's `token_contract` lists, and what the TSX should reference.

## Anatomy of a component token file

```json
{
  "button": {
    "bg": {
      "default": { "$value": "{action.primary}", "$type": "color" },
      "hover":   { "$value": "{action.primary-hover}", "$type": "color" },
      "active":  { "$value": "{action.primary-active}", "$type": "color" }
    },
    "fg": {
      "on-filled": { "$value": "{text.on-action}", "$type": "color" }
    },
    "border": {
      "focus": { "$value": "{focus.ring}", "$type": "color" }
    },
    "radius": { "$value": "{radius.md}", "$type": "dimension" }
  }
}
```

Naming convention: `<component>.<part>.<state>` or `<component>.<part>` when there is one state. Kebab-case for compound parts (`bg-destructive`, `fg-on-filled`).

## Currently shipped

| Component | File | Coverage |
|---|---|---|
| Button | `button.json` | Full: bg, fg, border, radius for all variants and states |
| Badge | `badge.json` | Full: bg per intent (neutral, success, error, warning, 4 risk tiers), fg, radius |
| TextInput | `text-input.json` | Full: bg, fg, border per state, focus ring, radius |
| Checkbox | n/a | Pending |
| Modal | n/a | Pending |
| Radio | n/a | Pending |
| Select | n/a | Pending |
| Switch | n/a | Pending |
| Tabs | n/a | Pending |
| Textarea | n/a | Pending |

> **Note:** A component without a file in this directory has not been migrated to the 3-tier model. The spec for that component references semantic tokens directly, which works but loses the per-component themability advantage.

## Why the indirection

A component token feels redundant on first read. "Why does `button.bg.default` exist when `action.primary` already does?"

Because:

- **Retheming.** You can change `button.bg.default` to point at a different semantic without touching every other component that uses `action.primary`. Splash Buttons in marketing while keeping primary actions blue elsewhere.
- **Drift detection.** When the TSX references `button.bg.default`, drift between the spec and code can be checked mechanically: does the TSX use this token? Yes or no. With semantics, the same value gets used across components and you cannot tell which usage is intentional.
- **Agent contract.** When an agent reads `token_contract: [button.bg.default]`, the name is unambiguous. With `action.primary`, the agent has to infer what the button is using it for.

## When to add a new component token

When the spec's `token_contract` lists a name that does not exist in any token file yet, and the value belongs to a component-level decision (not a system-level intent).

Examples:

- A new state for an existing component (`button.bg.loading`)
- A new variant (`badge.bg.brand`)
- A new part (`tabs.indicator.color`)

Not examples:

- A new intent across the system. That goes in semantic.
- A literal hex. That belongs in primitive, and only if no existing primitive fits.

## Validation

The `agentic-spec validate` command checks that every entry in `token_contract` has a matching entry in `tokens.json`, and that every `tokens.json` entry has the right tier, role, and path. It does not check whether the JSON in `packages/tokens/src/components/<name>.json` matches the spec's claims, because that file is produced from the build step. The spec's `tokens.json` is the contract.

## Related

- [Semantic tokens](./semantic.md)
- [Primitives](./primitives.md)
- [The cascade rule](./the-cascade-rule.md)
