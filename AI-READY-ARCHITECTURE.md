# Clementine — AI-Ready Architecture (the 9 trays)

> Clementine is organized as **9 trays**. Three are carried over from any mature design system, five-ish are **net-new for AI**, and one baseplate runs under all of them. This document maps each tray to where it lives in the repo, its status, and what's next.

Every *buildable* artifact in Clementine follows the same closed contract — **token → spec → component → story (→ Figma)** — so an AI agent can read the contract before writing code. The AI trays extend that contract; they don't replace it. See [AGENTS.md](./AGENTS.md) for the contract mechanics.

Not every AI tool consumes that contract the same way. Git-native agents can
usually inspect the repo directly; design-native tools such as Figma Make and
Claude Design may need a smaller interpretation packet or kit. See
[`docs/AI-TOOL-ADAPTERS.md`](./docs/AI-TOOL-ADAPTERS.md) for the testing plan.

**Legend:** ✅ in place · 🟡 partial · 🔲 net-new

---

## The 9 trays, mapped to this repo

| # | Tray | Lives in | Kind | Status |
|---|---|---|---|---|
| 1 | **Foundations** | `packages/tokens/` + `packages/ui/src/theme/` | Tokens | ✅ / 🟡 |
| 2 | **Components** | `packages/ui/` + `specs/` | React | ✅ 16, ongoing |
| 3 | **Patterns** | `patterns/` | Composition | 🟡 3 of ~8 |
| 4 | **AI surface components** | `packages/ui/src/components/ai/` + `specs/` | React | 🔲 net-new |
| 5 | **Behavior & state model** | `behaviors/` + `packages/ui/src/hooks/` | Specs + hooks | 🔲 net-new |
| 6 | **Content & language** | `content/` | Guidance docs | 🔲 net-new |
| 7 | **Trust, safety & governance** | `packages/ui/.../trust/` + `governance/` | React + policy | 🔲 net-new |
| 8 | **Feedback & evaluation loop** | `feedback/` + a thumbs component + telemetry hook | Loop (process + 1 component) | 🔲 net-new |
| 9 | **Kit governance** | repo-wide: CI, `specs/`, token pipeline, Storybook, Mintlify | Infra | 🟡 partial |

---

## Tray-by-tray

### 1 · Foundations — ✅ / 🟡
`packages/tokens/` holds the 3-tier cascade (primitives → semantic light+dark → component) and `motion` duration tokens. **Carried over.**
- ✅ Color, type, space, radius, shadow, motion-duration, light **and** dark.
- ✅ Status-color semantics already exist: `feedback.*` (error/success/warning) and `risk.*` (critical/high/medium/low).
- 🔲 **Net-new for AI:** *streaming motion* tokens (pulse / shimmer / caret-blink / "becoming") + a `prefers-reduced-motion` contract. Density + grid not yet formalized.

### 2 · Components — ✅ (16, ongoing)
`packages/ui/` + `specs/`. **Carried over.** Inputs, actions, containers, nav, data display.
- ✅ Button, TextInput, Textarea, Select, Checkbox, Switch, Radio, Badge, Tabs, Modal, **Alert, Tooltip, Accordion, Avatar, Card, Menu**.
- 🔲 Still missing from a "complete" set: Drawer, Combobox/Autocomplete, Pagination, Progress, Skeleton, Breadcrumbs, Table, Toast, DatePicker.

### 3 · Patterns — 🟡 (3 of ~8)
`patterns/`. **Carried over.** Compositions of components into recurring solutions.
- ✅ action-bar, confirm-dialog, form-field.
- 🔲 Tables, forms (validation + error summary), search, wizards/steppers, dashboards, empty-state.

### 4 · AI surface components — 🔲 net-new — *the differentiator*
New home: `packages/ui/src/components/ai/` with specs under `specs/`. The components that make this an *AI* design system:
- **Chat thread + Message** (user / assistant / system roles, with timestamps + status)
- **Composer** (prompt input: multiline, attachments, send/stop, slash-affordances)
- **Reasoning trace** (collapsible "thinking", streamed, dimmable)
- **Tool-call card** (name, args, status: pending/running/done/error, result)
- **Artifact frame** (generated doc/code/preview container with actions)
- **HITL gate** (human-in-the-loop approve/deny/edit before an action runs)
- **Citation / source chip** (inline provenance, links to source)
- **Streaming text** (token-by-token reveal honoring reduced-motion)

### 5 · Behavior & state model — 🔲 net-new — *the connective tissue*
New home: `behaviors/` (interaction specs) + `packages/ui/src/hooks/` (state utilities). Mostly specs + a few hooks, **not** new visuals.
- States: streaming / "becoming", interrupt, retry, refusal, tool-waiting, latency choreography.
- Likely hooks: `useStreaming`, `useInterruptible`, `useRetry`. Each AI component above references these states in its spec's `interaction_states`.

### 6 · Content & language — 🔲 net-new — *highest leverage, most neglected*
New home: `content/`. **Docs, not components.**
- AI voice & tone, disclosure copy ("AI-generated", "may be wrong"), error/refusal microcopy, prompt-scaffolding templates.
- Becomes the source the AI components quote — e.g. the refusal state's copy is defined here, not hardcoded.

### 7 · Trust, safety & governance — 🔲 net-new
Split: **components** in `packages/ui/.../trust/` + **policy** in `governance/`.
- Components: disclosure badge, citation/provenance chip (shared with Tray 4), least-privilege permission scope UI, audit-trail view.
- Policy: guardrails, what gets disclosed when, retention.

### 8 · Feedback & evaluation loop — 🔲 net-new — *a loop, not a part*
`feedback/` (process doc) + a small **FeedbackControl** (thumbs) component + a telemetry hook.
- thumbs → telemetry → eval sets → prompt/model iteration → ship → repeat. The repo holds the component + the hook + the documented loop; the eval sets live with the model.

### 9 · Kit governance — 🟡 partial
Repo-wide. **Carried over, now harder.**
- ✅ CI, CodeQL, Dependabot, `specs/` + `agentic-spec` validator, style-dictionary token pipeline, live Storybook, Mintlify docs, MIT, semver.
- 🔲 **Net-new for AI:** Figma **Code Connect** (map Figma components ↔ code), and a **model/prompt registry** (which model + prompt version a surface was built/verified against — extends `ds_version` in each spec).

---

## What "all components" actually means

Only **trays 2, 4, and parts of 7** are React components. Trays **5, 6, 8** are mostly *system artifacts* — hooks, specs, copy, and process. Treating them as "components to draw" is the classic trap; treating them as governed contracts is what makes the system AI-*ready* rather than just AI-*themed*.

## Build roadmap (waves)

| Wave | Scope | Status |
|---|---|---|
| 1 | 6 sophisticated components (Alert, Tooltip, Accordion, Avatar, Card, Menu) + drift fix + dark toggle | ✅ done |
| 2 | Foundations+ (streaming-motion tokens) + core components (Drawer, Autocomplete, Pagination, Progress, Skeleton) | ✅ done |
| 3 | **Tray 4 — AI surfaces** (Message, Composer, Reasoning trace, Tool-call card, HITL gate, Citation, Streaming text, Artifact) | ✅ done |
| 4 | **Tray 5 — behavior/state** hooks (`useStreaming`/`useInterruptible`/`useRetry`) + interaction specs (`behaviors/`) | ✅ done |
| 5 | **Tray 6 — content/language** (`content/`) + **Tray 7 — trust** (DisclosureBadge) + **Tray 8 — feedback** (FeedbackControl + eval loop) | ✅ done |
| 6 | **Tray 9 — model/prompt registry** ✅ · **Figma sync** — the full component-token set (now <!-- COUNTS:component-tokens -->628<!-- /COUNTS --> variables, cascade-aliased) + all 21 new components rendered as real, variable-bound components ✅ · **Code Connect** (Figma ↔ code) | 🟡 variables + components done; Code Connect pending |

Patterns (Tray 3): action-bar, confirm-dialog, form-field, **data-table, empty-state, wizard** ✅ — search, dashboard remain.
