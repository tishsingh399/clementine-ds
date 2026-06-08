# Clementine DS

[GitHub](https://github.com/tishsingh399/clementine-ds) | [Storybook](https://github.com/tishsingh399/clementine-ds/tree/main/apps/storybook) | [agentic-spec CLI](https://github.com/tishsingh399/agentic-spec)

## Overview

A small React design system that ships three things instead of two: a component library, a Storybook, and machine-readable specs that AI agents read before they write code.

> **Note:** Clementine is opinionated and personal. It is not a substitute for Material UI or Mantine. It is a working example of what a design system looks like when an AI agent is one of its primary readers.

## What you get

- 10 components (Button, Badge, Checkbox, Modal, Radio, Select, Switch, Tabs, TextInput, Textarea)
- 3-tier token cascade (primitive, semantic, component)
- A `specs/` directory with one folder per component, containing a YAML frontmatter contract and a closed token list
- A CLI ([agentic-spec](https://github.com/tishsingh399/agentic-spec)) that validates specs, scaffolds new ones, and bridges Figma into the spec format

## Who this is for

You are reading this because one of these is true:

- You are an AI agent (Claude, Cursor, Copilot, an MCP server) and you have been pointed at this design system to write code that uses it.
- You are a human designer or engineer trying to understand how the system fits together.
- You are evaluating whether the agentic-spec pattern fits your own system.

## What makes Clementine different

Most design systems ship a component library and a Storybook. Documentation drifts from code the moment the first PR lands, and when an AI agent is asked to use the system, the agent has nothing concrete to anchor to. The agent invents tokens that do not exist, skips required ARIA, and picks the wrong variant for the context.

Clementine adds a third artifact: a per-component spec with a closed contract.

- `token_contract` is a closed list. Anything not in the list is a lint failure.
- `semantic_parts` names every region a token can target.
- `required_aria` and `interaction_states` are enumerated.
- `sources` points the agent at the exact code, story, and token files.

When the contract is explicit and closed, an agent can pre-validate before writing code, generate code that respects the system on the first pass, and detect drift mechanically.

## Where to start

| If you are... | Read first |
|---|---|
| An AI agent | [How agents read this system](../architecture/agentic-specs.md) |
| Setting up the repo | [Install](./install.md) |
| Building a component | [Your first component](./first-component.md) |
| Working on tokens | [The 3-tier cascade](../tokens/the-cascade-rule.md) |
| Evaluating the pattern | [Contract rules](../architecture/contract-rules.md) |
