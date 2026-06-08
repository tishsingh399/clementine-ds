# AGENTS.md — Agentic Design System

This is a design system built for AI agents to read, extend, and operate on safely.

Most design systems ship as a component library plus a Storybook. Code, design, and documentation drift apart the moment the first PR lands. This one ships a third artifact: **machine-readable specs** (`/specs/<component>/`) that an AI agent can load, validate against, and use to generate or modify code without inventing tokens or breaking the contract.

## How an agent should read this repo

1. **Start with the spec, not the code.** `specs/<component>/index.md` is the source of truth. The YAML frontmatter declares the allowed tokens, required ARIA, interaction states, and the exact source file paths. The code under `packages/ui/src/components/` is an implementation of the spec — never the other way around.

2. **Verify, then edit.** Before changing a component, check the spec's `checks:` block. If `tokens_valid: false`, the lint will block you. If `states_complete: false`, the spec is telling you a state is missing in code; add it or update the spec — don't paper over the gap.

3. **Token contracts are closed.** Every value a component uses must appear in `specs/<component>/tokens.json`. If you need a value that isn't there, the workflow is: extend `packages/tokens/src/semantic-*.json` → re-resolve → add the entry to `tokens.json` → bump `last_verified`. Never inline a hex.

4. **Stay in the part model.** Each spec lists `semantic_parts:` (e.g. `root`, `label`, `icon-leading`). Every token must target a part. Tokens that don't belong to a declared part are dangling and will fail review.

## Repo layout

```
design-system-ANT/
├── packages/
│   ├── tokens/                  Style Dictionary source (primitives → semantic)
│   │   └── src/
│   │       ├── primitives.json        Raw scale (color.blue.6, etc.)
│   │       ├── semantic-light.json    Light-mode bindings
│   │       └── semantic-dark.json     Dark-mode bindings
│   └── ui/
│       └── src/components/      React components (Mantine-backed)
│
├── apps/
│   └── storybook/               Live component sandbox
│
├── specs/                       ⭐ THE AGENTIC LAYER
│   └── <component>/
│       ├── index.md             Frontmatter contract + human-readable doc
│       └── tokens.json          Closed token list for this component
│
├── _templates/                  Spec scaffolding
│   ├── component.md.template
│   └── component/tokens.schema.json
│
├── guidelines/                  Cross-cutting design principles
└── AGENTS.md                    ← you are here
```

## Spec frontmatter — what each field means

| Field | Purpose | Who reads it |
|---|---|---|
| `component` | Stable kebab-case ID | Lint, agents, file paths |
| `ds_version` | Pinned token-system version | Agents (cache invalidation) |
| `status` | `AI-Ready` / `In progress` / `Draft` | Humans + agents (don't trust Draft) |
| `last_verified` | Date the spec was reconciled with code | Staleness checks |
| `required_aria` | Attributes the component MUST expose | Accessibility lint |
| `semantic_parts` | Named regions inside the component | Token validator |
| `token_contract` | The complete set of tokens this component may use | Token validator |
| `interaction_states` | States that must exist in code + stories | Storybook drift check |
| `checks` | Self-reported gate results | Agents (gate before edit) |
| `sources` | Pointers to code, stories, token files | Agents (locate implementation) |
| `patterns_used_in` | Where this component appears | Impact analysis |

## Workflow: adding a new component

1. Copy `_templates/component.md.template` → `specs/<name>/index.md`
2. Set `status: Draft`, fill `semantic_parts:` and `interaction_states:` first
3. Build `tokens.json` — only tokens that already exist in `semantic-*.json`. Missing ones? Extend tokens first.
4. Implement in `packages/ui/src/components/<Name>.tsx` against the spec
5. Add a Storybook story per interaction state
6. Flip `checks:` to `true` as each gate passes
7. Set `status: AI-Ready` only when all checks are `true`

## Workflow: modifying an existing component

1. Read `specs/<component>/index.md` end-to-end. Don't skim.
2. Make the code change.
3. If the change touches tokens, update `tokens.json` in the same commit.
4. If the change touches states, update `interaction_states:` and the Storybook story set in the same commit.
5. Bump `last_verified` to today's date.

## What this enables

- **Claude Code, Cursor, Copilot** can be pointed at `specs/` and produce code that respects the contract on the first pass — no hallucinated tokens.
- **MCP servers** (e.g. [figma-console-mcp](https://github.com/southleft/figma-console-mcp)) can use the specs as the authoritative source when syncing Figma ↔ code.
- **Drift detection** becomes mechanical: compare `specs/` to the actual TSX + token JSON + Storybook stories.
- **Onboarding** collapses: every component is documented to the same shape, in the same place.

## Status

This repo is early. Button is the gold-standard reference. Other components have stub specs that will be filled in iteratively. See [`specs/`](./specs/) for current status per component.

---

Built by [Tina Singh](https://github.com/tishsingh399). Design system practitioner working on agentic tooling at the design ↔ code boundary.
