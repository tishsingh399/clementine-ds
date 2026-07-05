# Your first component

[GitHub](https://github.com/tishsingh399/clementine-ds/tree/main/specs)

## Overview

Walk through adding a new component to Clementine. This is the workflow an AI agent should follow as well as a human contributor.

## Six steps

### 1. Scaffold the spec

```bash
agentic-spec init tooltip --out ./specs --ds-version "clementine-ds@0.1.0"
```

This writes two files: `specs/tooltip/index.md` and `specs/tooltip/tokens.json`. Status is `Draft`.

### 2. Fill the contract

Edit `specs/tooltip/index.md`:

- `semantic_parts:` Name every internal region. `root`, `arrow`, `body` is a fine start.
- `required_aria:` What ARIA must this component expose? `role`, `aria-describedby`, anything else?
- `interaction_states:` Enumerate every state. `closed`, `opening`, `open`, `closing`.

> **Note:** Do not invent tokens yet. `token_contract` should stay empty until step 4.

### 3. Add component tokens

If the values your component needs already exist in semantic, you can skip this step. Otherwise, create `packages/tokens/src/components/tooltip.json`:

```json
{
  "tooltip": {
    "bg":     { "$value": "{surface.elevated}", "$type": "color" },
    "fg":     { "$value": "{text.primary}", "$type": "color" },
    "radius": { "$value": "{radius.sm}", "$type": "dimension" }
  }
}
```

Each entry references a semantic token. The cascade rule is one-way: components reference semantic, never primitives.

### 4. Reflect tokens in the spec

Update `specs/tooltip/tokens.json` to list every entry you added:

```json
{
  "tokens": [
    { "name": "tooltip.bg", "tier": "component", "role": "fill", "path": "tooltip.bg", "references": "{surface.elevated}", "primitive": "{color.white}", "light": "#ffffff", "status": "existing" }
  ]
}
```

And update `token_contract:` in the frontmatter:

```yaml
token_contract:
  - tooltip.bg
  - tooltip.fg
  - tooltip.radius
```

### 5. Implement against the spec

Build `packages/ui/src/components/Tooltip.tsx`. Reference the spec for ARIA, structure, and which tokens to bind.

Add a Storybook story per interaction state in `apps/storybook/stories/Tooltip.stories.tsx`.

### 6. Promote to AI-Ready

Flip each `checks:` entry in the spec frontmatter to `true` as the underlying gate passes. When all five are `true`, set `status: AI-Ready`.

```bash
agentic-spec validate specs/tooltip
# PASS tooltip (specs/tooltip)
```

If the validator complains about a `lying-check` or `ai-ready-gate`, the spec is claiming readiness it does not have. Fix the underlying gate, not the spec.

## What success looks like

After step 6:

- The spec passes `agentic-spec validate`
- The Storybook story exists for every state
- The TSX uses only tokens listed in `token_contract`
- An AI agent can be pointed at `specs/tooltip/index.md` and write a screen using Tooltip without inventing tokens

## Common mistakes

| Mistake | Fix |
|---|---|
| Binding a hex value directly in TSX | Add a token, reference the token |
| Component token references a primitive | Add a semantic in between |
| Status flipped to `AI-Ready` while a story is missing | The validator will catch this. Add the story. |
| Spec lists more states than stories cover | Add the story or drop the state |

## Related

- [The 3-tier cascade](../tokens/the-cascade-rule.md)
- [Agentic specs](../architecture/agentic-specs.md)
- [Contract rules](../architecture/contract-rules.md)
