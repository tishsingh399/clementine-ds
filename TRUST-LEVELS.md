# Trust levels for agents

> A trust model for AI agents working against Clementine: autonomy scales with demonstrated competence, enforced by the spec contract and the validator.

When an AI agent operates against Clementine, it earns trust like a new hire earns autonomy. Each action carries a risk × confidence cost, and the agent only gets to take actions that fit its current level.

## The five levels

| Level | Name | Can do | Cannot do | When to use |
|---|---|---|---|---|
| **0** | Suggester | Propose changes via comments / chat output only | Touch any file in the repo | Brand new agent, untested model, or scoping work |
| **1** | Intern | Open Draft PRs that touch ONLY `specs/`, `patterns/`, `docs/readme/` | Touch code, tokens, or merge anything | Spec authoring, doc updates, exploratory work |
| **2** | Junior | Open Ready PRs that touch tokens, specs, docs. Run `agentic-spec validate`. | Touch TSX or merge | Token migrations, spec promotion, refactors below code level |
| **3** | Mid | Open Ready PRs that touch any file. Merge dependency bumps when CI passes. | Merge anything else, force-push, edit settings | Most daily work for trusted agents |
| **4** | Senior | All of the above, plus self-merge PRs when ALL conditions hold: CI green, single-file change, no public API modification | Force-push to main, edit GitHub settings, change `.github/workflows/` without review, touch `LICENSE` | Mature agents handling well-scoped fix-up work |
| **5** | Lead | Everything except destructive ops (force-push, delete branches, edit security workflows) | Anything destructive | Reserved. No agent currently operates here. |

## How the level is set

In `.claude/settings.local.json` or `.claude/settings.json`, the agent's permissions effectively pin a trust level. As of 2026-06-10 the local settings in this repo grant the agent **Level 3**:

- `Bash(git add:*)`, `Bash(git commit:*)`, `Bash(git push:*)` — unrestricted
- `Bash(gh repo:*)`, `Bash(gh pr:*)` — full PR lifecycle
- `Bash(npm install:*)`, `Bash(pnpm add:*)` — can install deps
- NOT permitted: `git push --force`, `git reset --hard`, `git rebase`, anything touching `.gitconfig`

## The risk × confidence matrix

Every action an agent could take sits somewhere on this 2-axis grid:

```
                LOW CONFIDENCE                     HIGH CONFIDENCE
              ┌────────────────────────────────┬────────────────────────────────┐
HIGH RISK     │ NEVER auto-execute.            │ Open Ready PR.                 │
              │ Suggest in comments only.      │ Wait for human review.         │
              │ (e.g. "rewrite the token       │ (e.g. "bump Modal radius from  │
              │  cascade to 4 tiers")          │  8px to 12px after Figma update")
              ├────────────────────────────────┼────────────────────────────────┤
LOW  RISK     │ Open Draft PR.                 │ Auto-merge when CI passes.     │
              │ Tag a maintainer for review.   │ (e.g. "rename helper variable  │
              │ (e.g. "convert all .md links   │  to match convention",         │
              │  to absolute URLs")            │  "fix typo in spec prose")     │
              └────────────────────────────────┴────────────────────────────────┘
```

## Risk classification

| Risk | What's at stake | Examples |
|---|---|---|
| **Low** | Reversible, no semantics change | Typo fix, comment cleanup, lint auto-fix, dep patch bump |
| **Medium** | Affects DX or a single component | Storybook story addition, new variant, prose rewrite in a spec |
| **High** | Affects the contract or multiple components | Token rename, new semantic, spec frontmatter change to `AI-Ready`, anything in `.github/workflows/` |
| **Critical** | Affects shipped surface area or security | Public API change, license edit, secret rotation, branch protection edit |

## Confidence classification

| Confidence | What it means | Source |
|---|---|---|
| **Low** | Agent inferring intent; no explicit spec match | Pattern recognition without contract validation |
| **Medium** | Spec exists but `status: Draft` or `In progress` | Reading a stub spec |
| **High** | Spec is `AI-Ready` AND `agentic-spec validate` passes locally | The contract is closed and confirmed |

## What the validator already enforces (whether the agent likes it or not)

These rules from `agentic-spec validate` act as the floor regardless of trust level:

- `ai-ready-gate` — agent cannot set `status: AI-Ready` while any check is false
- `lying-check` — agent cannot set `checks.tokens_valid: true` if the contract has unresolved errors
- `identity-mismatch` — agent cannot rename a component without updating both `index.md` and `tokens.json`
- `bad-token-tier` — agent cannot bind a component token to a primitive (must go through semantic)

These are pre-commit hooks of trust. Even a Level 5 agent cannot bypass them without human override.

## Practical example

A typical workflow for a Level 3 agent handed "add a Tooltip component":

1. **Plan** (level-agnostic): Propose the work in chat, get human OK.
2. **Spec authoring** (Level 1+): `agentic-spec init tooltip` → fill `semantic_parts`, `required_aria`, `interaction_states`. Open Draft PR.
3. **Token authoring** (Level 2+): Create `packages/tokens/src/components/tooltip.json` referencing semantic. Update spec's `tokens.json`.
4. **Code authoring** (Level 3+): Implement `packages/ui/src/components/Tooltip.tsx`. Add Storybook stories. Open Ready PR.
5. **Validation** (any level can run): `agentic-spec validate specs/tooltip` must PASS.
6. **Merge** (Level 4+): Self-merge if CI green AND single-component change. Otherwise wait for human review.

## Why this matters for Clementine specifically

The core principle — agents operate with autonomy proportional to demonstrated competence — fits Clementine's spec-driven model exactly. The spec IS the contract that pins what an agent is allowed to do. The validator IS the enforcer. The trust levels are the dial.

## Related

- [AGENTS.md](./AGENTS.md) — how agents read the system
- [CONTRIBUTING.md](./CONTRIBUTING.md) — the four CI gates every PR must hold
- [docs/readme/architecture/contract-rules.md](./docs/readme/architecture/contract-rules.md) — the 14 validator rules
