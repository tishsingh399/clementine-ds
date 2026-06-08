# The cascade rule

## Overview

One sentence: each tier references only the tier above it.

That is the whole rule.

## The cascade, in shape

```
primitives.json
    ▲
    │ semantic references primitive
semantic-{light,dark}.json
    ▲
    │ component references semantic
components/<name>.json
    ▲
    │ TSX references component
packages/ui/src/components/<Name>.tsx
```

The arrow points up. You can only reference the tier above you.

## What this looks like in practice

| You are editing | You can reference | You cannot reference |
|---|---|---|
| `primitives.json` | nothing | anything |
| `semantic-light.json` | primitives | semantics, components |
| `components/button.json` | semantics | primitives, other components |
| `Button.tsx` | component tokens | primitives, semantics, hex values |

## Why this rule exists

Three reasons.

### 1. Theming is a file swap

Switch `semantic-light.json` for `semantic-dark.json`. The component vocabulary does not change. The TSX does not change. Only the values resolve differently.

If components referenced primitives directly, switching themes would require rewriting every component's bindings.

### 2. Drift is mechanical

When the spec says `token_contract: [button.bg.default]`, the validator can check: does `button.bg.default` exist in `tokens.json`? Does its `references` field point at a valid semantic? Does that semantic exist?

Each check is one lookup. If everything is in one file or jumps across tiers, the lookup chain branches and drift becomes a manual audit.

### 3. The contract narrows the agent

When the agent reads `button.bg.default`, only one value can satisfy the contract. When the agent reads `action.primary`, the agent has to guess: is this a button bg? A link color? A focus ring? The narrower the name, the less the agent has to invent.

## Common temptations to break the rule

**"I just need one color in this component, why add a semantic?"**

If you bind a primitive directly in a component, the next person to edit the file has to figure out whether the value is intentional or accidental. The semantic carries that intent forward. Even if only one component uses it now, the next one will.

**"This semantic is a one-off, just put the primitive in the component file."**

If it is truly a one-off, it should be a component token whose `references` field points at a primitive ... which the rule forbids. So either it is not a one-off (it is an intent the system has not named yet) or it is a hardcoded value (which the spec contract forbids). Either way, the resolution is to name the intent.

**"I'm prototyping, I'll fix it later."**

Prototypes do not validate. The spec status is `Draft`. Set the value any way you want. Promote to `AI-Ready` only after the cascade is clean.

## What happens if you break it

Three failure modes:

- The validator flags a `bad-token-tier` finding if a component-tier entry references a primitive.
- A theme switch breaks the component because the primitive does not change with the theme.
- An agent reading the spec mis-classifies the binding because the tier markers do not match the reference.

The first one is caught at lint time. The other two are caught in production.

## Related

- [Primitives](./primitives.md)
- [Semantic tokens](./semantic.md)
- [Component tokens](./component.md)
- [How agents read this](../architecture/agentic-specs.md)
