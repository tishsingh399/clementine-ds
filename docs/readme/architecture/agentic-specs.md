# How agents read Clementine

[AGENTS.md](https://github.com/tishsingh399/clementine-ds/blob/main/AGENTS.md) | [specs/](https://github.com/tishsingh399/clementine-ds/tree/main/specs)

## Overview

This page is the contract between Clementine and any AI agent (Claude, Cursor, Copilot, an MCP server) that has been pointed at this design system.

If you are not an agent, you can still read this. It explains how the spec system works.

## The reading order

When you are asked to write code that uses Clementine:

1. **Open the spec first.** `specs/<component>/index.md`. The YAML frontmatter is the contract. The prose below is the human explanation.
2. **Check `status`.** If it is `Draft`, the spec is incomplete. Ask before writing code against it.
3. **Read `token_contract`.** This is a closed list. Anything outside it is not allowed.
4. **Read `required_aria` and `interaction_states`.** Both are enumerated. Implement all of them or do not implement the component.
5. **Open the code.** `sources.code.path` points at the TSX. The code is an implementation of the spec, not the source of truth.

## What you must NOT do

Bind a hex value directly. Invent a token. Skip an interaction state because it seemed obvious. Drop an ARIA attribute because the visual works without it. Change the spec to match code you already wrote.

## What you SHOULD do

Pre-validate before writing. If you want to use `color.indigo.500` for a button, check the contract. Not in the list? Do not write it. Propose adding it to the underlying semantic or component file, in a separate change.

## The spec frontmatter, field by field

```yaml
---
component: button
ds_version: clementine-ds@0.1.0 (2026-06-08 verified)
status: AI-Ready | In progress | Draft
last_verified: 2026-06-08
category: Component | Pattern | Page
required_aria: [aria-label, aria-disabled, aria-busy]
semantic_parts:
  root: The native <button> element
  label: Text content
token_contract:
  - button.bg.default
  - button.fg.on-filled
  # closed list, every entry must exist in tokens.json
interaction_states: [default, hover, focus, active, disabled, loading]
checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true
sources:
  code:
    path: packages/ui/src/components/Button.tsx
    framework: react
    underlying_library: mantine
  storybook:
    path: apps/storybook/stories/Button.stories.tsx
  tokens:
    component: packages/tokens/src/components/button.json
---
```

| Field | What it means for you |
|---|---|
| `status` | Trust `AI-Ready`. Question `In progress`. Refuse `Draft`. |
| `required_aria` | Implement every attribute. Missing one is a contract violation. |
| `semantic_parts` | Every token must target one of these regions. Tokens that do not are dangling. |
| `token_contract` | Closed list. Treat as the complete vocabulary you can use. |
| `interaction_states` | Every state must be implemented, and a Storybook file must exist for the component (enforced). One story per state is the convention; per-state enforcement is a known gap. |
| `checks` | The component's self-reported gate status. `tokens_valid: true` means the validator passed. |
| `sources.code.path` | Open this file to see the actual implementation. |
| `sources.tokens.component` | Open this file to see the value bindings. |

## The validator

A separate CLI ([agentic-spec](https://github.com/tishsingh399/agentic-spec)) validates specs. Before you make changes, run it:

```bash
agentic-spec validate specs/button
```

If it fails, the spec is not in the state it claims to be in. Do not write code against a failing spec.

## How to extend without breaking the contract

If you need a value that is not in the contract, the workflow is:

1. Add a new entry to `packages/tokens/src/components/<name>.json`. Reference an existing semantic token.
2. If no fitting semantic exists, add one to `semantic-light.json` and `semantic-dark.json`. Reference an existing primitive.
3. Add the new entry to `specs/<name>/tokens.json`.
4. Add the new entry name to `token_contract` in the spec frontmatter.
5. Bump `last_verified` to today.
6. Re-run the validator.
7. Now you can use the new value in code.

This is slower than inlining a hex. It is also the only way the spec stays a contract.

## Why this exists

Pattern recognition tells an AI agent that buttons are usually blue, focus rings are usually 2px, errors are usually red. The agent guesses. Sometimes it guesses right. Often it does not.

Clementine replaces the guess with a lookup. The spec tells the agent which token to bind. The token tells the resolver which semantic to use. The semantic tells the resolver which primitive to use. The primitive resolves to a value.

If any step is missing, the validator says so before the code ships.

## Related

- [Contract rules](./contract-rules.md)
- [The 3-tier cascade](./3-tier-tokens.md)
- [Your first component](../getting-started/first-component.md)
