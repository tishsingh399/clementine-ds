# AGENTS.md — Clementine DS

> **Companion docs:** [Notion · Clementine DS](https://www.notion.so/tinasingh/Clementine-DS-379e72c9cf36806f9a5ce8fdb927b93f) (Architecture / Tokens / Components / Operations) · [Figma file](https://www.figma.com/design/MBr4guR2Xtfa92JJXS6472/Tina-DS-file-ANT) · [agentic-spec CLI](https://github.com/tishsingh399/agentic-spec)

Clementine is a design system built for AI agents to read, extend, and operate on safely.

It ships three things instead of the usual two:

1. **Component library** — React + Mantine, in `packages/ui/`
2. **Storybook** — live sandbox, in `apps/storybook/`
3. **Machine-readable specs** — `specs/<component>/` with a closed token contract that AI agents (Claude, Cursor, MCP servers) load *before* writing code

And it organizes tokens in three tiers — the rule that makes the whole agentic story work.

## The 3-tier token cascade

```
┌─────────────────────────────────────────────────────────────────┐
│  PRIMITIVES   color.blue.6 = "#2563eb"      radius.md = "8px"   │   tier 1: raw values
│                                                                  │
│      ▲                                                           │
│      │ references                                                │
│                                                                  │
│  SEMANTIC     action.primary = "{color.blue.6}"                  │   tier 2: intent
│               focus.ring = "#ff8040"                             │
│                                                                  │
│      ▲                                                           │
│      │ references                                                │
│                                                                  │
│  COMPONENT    button.bg.default = "{action.primary}"             │   tier 3: per-component
│               button.border.focus = "{focus.ring}"               │   bindings
└─────────────────────────────────────────────────────────────────┘
```

**The cascade rule is one-way.** Each tier references only the tier above it. Components never reference primitives directly; semantics never reference components; primitives reference nothing.

| Tier | File | What it holds |
|---|---|---|
| Primitive | `packages/tokens/src/primitives.json` | Raw scales (`color.blue.6`, `radius.md`, `spacing.sm`) |
| Semantic | `packages/tokens/src/semantic-{light,dark}.json` | Intent (`action.primary`, `surface.elevated`, `feedback.error`) |
| Component | `packages/tokens/src/components/<name>.json` | Per-component bindings (`button.bg.default`, `badge.bg.success`) |

**Why this matters for agents:** when a spec says `token_contract: [button.bg.default]`, the validator can check three things mechanically:
1. Does `button.bg.default` exist in `packages/tokens/src/components/button.json`?
2. Does the semantic it references exist?
3. Does the primitive that resolves through?

If any tier breaks, drift is caught at the lint step — not at runtime.

## How an agent should read this repo

1. **Start with the spec, not the code.** `specs/<component>/index.md` is the source of truth. The YAML frontmatter declares the allowed tokens, required ARIA, interaction states, and the exact source file paths. The code under `packages/ui/src/components/` is an implementation of the spec — never the other way around.

2. **Verify, then edit.** Before changing a component, check the spec's `checks:` block. If `tokens_valid: false`, the lint will block you. If `states_complete: false`, the spec is telling you a state is missing in code; add it or update the spec — don't paper over the gap.

3. **Token contracts are closed.** Every value a component uses must appear as a component-tier token (`button.bg.default`, not `action.primary` and not `#2563eb`). If you need a value that isn't there, the workflow is: extend `packages/tokens/src/components/<name>.json` (and if needed, the semantic tier underneath) → add the entry to `specs/<name>/tokens.json` → bump `last_verified`. Never inline a hex. Never reference a primitive from a component file.

4. **Stay in the part model.** Each spec lists `semantic_parts:` (e.g. `root`, `label`, `icon-leading`). Every token must target a part. Tokens that don't belong to a declared part are dangling and will fail review.

5. **Respect the cascade rule.** If you're tempted to bind a component token directly to a primitive (`button.bg.default → {color.blue.6}`), stop. Find or create the semantic token first (`action.primary`) and bind through it. The whole 3-tier story falls apart at the first shortcut.

## Repo layout

```
clementine-ds/
├── packages/
│   ├── tokens/                       Style Dictionary source
│   │   └── src/
│   │       ├── primitives.json             tier 1 — raw scales
│   │       ├── semantic-light.json         tier 2 — intent (light)
│   │       ├── semantic-dark.json          tier 2 — intent (dark)
│   │       └── components/                 tier 3 — per-component
│   │           ├── button.json
│   │           ├── badge.json
│   │           └── text-input.json
│   └── ui/
│       └── src/components/           React components (Mantine-backed)
│
├── apps/
│   └── storybook/                    Live component sandbox
│
├── specs/                            ⭐ THE AGENTIC LAYER
│   └── <component>/
│       ├── index.md                  Frontmatter contract + human prose
│       └── tokens.json               Closed token list (component-tier only)
│
├── _templates/                       Spec scaffolding
│   ├── component.md.template
│   └── component/tokens.schema.json
│
├── docs/                             Hero image + reference docs
│   └── hero.html / hero.png
│
├── guidelines/                       Cross-cutting design principles
└── AGENTS.md                         ← you are here
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
