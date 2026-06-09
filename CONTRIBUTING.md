# Contributing to Clementine DS

Clementine is small on purpose. Bigger ≠ better when the contract is what matters.

## Local setup

```bash
git clone https://github.com/tishsingh399/clementine-ds.git
cd clementine-ds
pnpm install
pnpm storybook        # http://localhost:6006
```

Node 18+. pnpm 9.x.

## The contract every PR must hold

Each PR is checked by [agentic-spec](https://github.com/tishsingh399/agentic-spec) in CI. The four mandatory gates:

| Gate | What it checks |
|---|---|
| Specs validate | Every `specs/<component>/` passes `agentic-spec validate` — token contract closed, parts named, dates sensible, no lying self-checks |
| Type-check | `pnpm --filter @clementine-ds/ui exec tsc --noEmit` is clean |
| Build | `pnpm build` succeeds across the workspace |
| CodeQL | No new high-severity findings |

You can run the equivalent locally before pushing:

```bash
npx -y github:tishsingh399/agentic-spec validate specs/*
pnpm --filter @clementine-ds/ui exec tsc --noEmit
pnpm build
```

## Adding a new component

See [AGENTS.md § Workflow](./AGENTS.md#workflow-adding-a-new-component). The six-step shape:

1. `agentic-spec init <name> --out ./specs --ds-version "clementine-ds@HEAD"`
2. Fill `semantic_parts` and `interaction_states` in the spec
3. Add `packages/tokens/src/components/<name>.json` referencing semantic tokens (never primitives directly)
4. Reflect the bindings in `specs/<name>/tokens.json`
5. Implement `packages/ui/src/components/<Name>.tsx`
6. Add a Storybook story per state

When all 5 `checks:` in the spec frontmatter are `true`, flip `status: AI-Ready`. CI will catch lying.

## Adding a new token

Three rules:

1. Add at the right tier. New raw value → `primitives.json`. New intent across the system → `semantic-{light,dark}.json`. New per-component binding → `components/<name>.json`.
2. Reference only the tier above. Components reference semantic. Semantic references primitive. Never skip a tier.
3. Update every affected spec's `tokens.json` in the same commit.

## Commit style

Conventional-ish. Short lede sentence + paragraph(s) explaining the *why*. Trailers like `Co-Authored-By:` are fine.

```
Migrate Modal to 3-tier tokens

The Modal spec was still referencing semantic tokens directly. Adds
packages/tokens/src/components/modal.json with 8 component tokens
covering bg / overlay / fg / border / ring / radius, and updates the
spec contract to use the new names.
```

No need for `feat:` / `fix:` prefixes — the *what* is in the title, the *why* is in the body.

## What stays out

- New components without a spec → spec must come first
- Hardcoded hex values in TSX → use a component token
- Component tokens that reference primitives directly → add a semantic in between
- Specs marked `AI-Ready` when checks aren't all `true` → the validator will fail

## Reviewing a PR

Read the spec diff before reading the code. If the spec changed, the code should match the new contract. If the code changed but the spec didn't, something is off — either the change is unrelated to the contract, or `last_verified` should bump.
