# Clementine DS — Handoff & Runbook

A step-by-step runbook for the tasks that have to run on a local machine. Follow it
top-to-bottom; every step has a **success check**. An AI coding agent (Claude Code,
Cursor) can execute this directly — commands are copy-pasteable and ordered.

> **Read first:** [`AGENTS.md`](./AGENTS.md) is the contract. Every component has a
> machine-readable spec in [`specs/<name>/`](./specs) — treat it as the source of truth
> before changing or adding anything. [`AI-READY-ARCHITECTURE.md`](./AI-READY-ARCHITECTURE.md)
> is the 9-tray map.

---

## Current state — already done ✅

| Layer | State |
|---|---|
| Components | **104**, each shipping token + spec + Storybook story + guidance doc + implementation |
| Patterns | **22** composed flows in [`patterns/`](./patterns) |
| Tokens | 87 primitives · 32 semantic (light + dark) · **535** component tokens |
| Figma variables | **535** component variables, cascade-aliased, **1:1 with the code** |
| Figma render | All **104** drawn as real, token-bound nodes — 94 as Components across 6 category pages, the 10 core on the Cover page |
| Typecheck | `@clementine-ds/ui` and `observatory` both pass `tsc --noEmit` (verified) |

**Not yet verified on the origin machine** (toolchain quirk there — re-confirm here):
a full `pnpm build` and a Storybook boot. Step 1 covers this.

---

## Step 1 — Get it local, verify, push to GitHub

**Why:** the project needs to live on your machine and go up to GitHub.

```bash
# 1a. Recreate the repo WITH full history from the bundle (preferred — keeps every commit)
git clone /path/to/clementine-ds-ai-trays.bundle clementine-ds
cd clementine-ds
# (Alternative: unzip clementine-ds-ai-trays.zip — but that's a flat snapshot, no history)

# 1b. Point it at GitHub and confirm the author identity is the personal one
git remote set-url origin https://github.com/tishsingh399/clementine-ds.git
git config user.email        # should NOT be a work email; set it if needed:
# git config user.email "you@personal-email.com"

# 1c. Install and verify the build
pnpm install                 # pnpm 9.15.0
pnpm --filter @clementine-ds/ui build   # = tsc --noEmit  → expect: no errors
pnpm build                   # turbo build of all packages → expect: all green
pnpm storybook               # opens http://localhost:6006 → eyeball a few components
```

**Success check:** `pnpm build` finishes with no errors and Storybook lists the components.
> If Storybook/Vite fails with an `esbuild` / "multiple copies" error, run `pnpm install`
> once more to relink the local store, then retry.

```bash
# 1d. Push
git push -u origin main      # if GitHub rejects (histories diverged), inspect before forcing
```

**Success check:** GitHub shows the latest commit and CI goes green.

---

## Step 2 — Verify & commit the `observatory` dashboard

**Why:** `apps/observatory` (a spec-health dashboard) has uncommitted local changes. They
typecheck clean but were never built end-to-end. Confirm, then commit as its own commit.

```bash
pnpm --filter observatory build   # runs spec scan + vite build → expect: success
```

**Success check:** the build completes and `apps/observatory/dist` is produced.

```bash
git add apps/observatory
git commit -m "observatory: dashboard refresh"
git push
```

If the build fails or the redesign isn't wanted: `git checkout -- apps/observatory` to discard.

---

## Step 3 — Build the dependency-gated components (optional)

**Why:** these need third-party packages installed first; they can't be built without them.

```bash
pnpm --filter @clementine-ds/ui add \
  @mantine/dates @mantine/notifications @mantine/charts @mantine/carousel
```

Then hand the agent this list and point it at the existing specs as the pattern:

- **DatePicker / DateInput / Calendar** → `@mantine/dates`
- **Toast / notifications system** → `@mantine/notifications`
- **Chart / Sparkline / dashboard viz** → `@mantine/charts`
- **Carousel** → `@mantine/carousel`
- **Virtualized data grid, Kanban, Gantt, FilterBuilder** → custom (no single dep)

> Each new component must keep parity: add `packages/tokens/src/components/<name>.json`,
> `specs/<name>/`, a Storybook story, a `docs/readme/components/<name>.md`, and the export
> in `packages/ui/src/index.ts`. Follow any existing component (e.g. `Slider`) as the shape.

---

## Step 4 — Publish Figma Code Connect (optional)

**Why:** links Figma components to the React code so designers see real props/snippets.

```bash
export FIGMA_ACCESS_TOKEN=your_personal_figma_token   # do not commit this
npx figma connect publish
```

Config is [`figma.config.json`](./figma.config.json); mapping files are `*.figma.tsx` under
`packages/ui/src/`.

> Mappings currently exist for the original component set only. The 41 newest components
> (foundation finishers, AI long-tail, enterprise) need `*.figma.tsx` mappings written first —
> ask the agent to generate them against their Figma node IDs before publishing.

---

## Reference — Figma file structure

File: `Clementine DS` (`kPBBglpMr7MVjejDjc19hy`)

- **Cover page (`Clementine DS`):** token cascade board, the 10 core components showcase, the Button spec board
- **Category pages** (94 components, grouped): Actions & Inputs · Containers & Navigation · Display & Feedback · AI Surfaces · Enterprise · Trust & Feedback
- **3 variable collections:** Primitives · Semantic (light/dark modes) · Components — every paint on every component is bound to a Components-tier variable.

---

## Order of operations (TL;DR for an agent)

1. `git clone` the bundle → set GitHub remote → `pnpm install` → `pnpm build` → `pnpm storybook` (verify) → `git push`.
2. `pnpm --filter observatory build` → if green, commit + push.
3. (Optional) `pnpm add` the Mantine packages above → build the gated components, keeping 5-artifact parity.
4. (Optional) set `FIGMA_ACCESS_TOKEN` → write mappings for the newest 41 → `npx figma connect publish`.
